#!/usr/bin/env node
/**
 * One-command Supabase setup for RetroLog.
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/setup-supabase.mjs
 *
 * Or interactively (will prompt for token):
 *   node scripts/setup-supabase.mjs
 *
 * What it does:
 *   1. Creates a new Supabase project "retrolog" in sa-east-1
 *   2. Waits for the project to become ACTIVE
 *   3. Applies the profiles table schema + RLS policies
 *   4. Creates the "avatars" storage bucket with public read access
 *   5. Writes .env.local with the project URL and anon key
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { createInterface } from 'readline'

const API = 'https://api.supabase.com/v1'
const ORG_ID = 'krfempgcoirggmbqdooi'
const REGION = 'sa-east-1'
const PROJECT_NAME = 'retrolog'
const DB_PASSWORD = crypto.randomUUID().replace(/-/g, '') + 'Aa1!'

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()) }))
}

async function api(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`API ${opts.method || 'GET'} ${path} → ${res.status}: ${text}`)
  }
  return text ? JSON.parse(text) : null
}

let TOKEN = process.env.SUPABASE_ACCESS_TOKEN
if (!TOKEN) {
  console.log('\n🔑 You need a Supabase access token.')
  console.log('   Get one at: https://supabase.com/dashboard/account/tokens\n')
  TOKEN = await ask('Paste your access token: ')
}
if (!TOKEN) { console.error('No token provided. Exiting.'); process.exit(1) }

console.log('\n📋 Checking for existing projects...')
const projects = await api('/projects')
const existing = projects.find(p => p.name === PROJECT_NAME && p.organization_id === ORG_ID)

let project
if (existing) {
  console.log(`✅ Found existing project "${PROJECT_NAME}" (ref: ${existing.id})`)
  project = existing
} else {
  console.log(`🚀 Creating project "${PROJECT_NAME}" in ${REGION}...`)
  project = await api('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: PROJECT_NAME,
      organization_id: ORG_ID,
      region: REGION,
      db_pass: DB_PASSWORD,
      plan: 'free',
    }),
  })
  console.log(`   Project ref: ${project.id}`)
}

const projectRef = project.id

if (project.status !== 'ACTIVE_HEALTHY') {
  console.log('⏳ Waiting for project to become active...')
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 5000))
    const status = await api(`/projects/${projectRef}`)
    process.stdout.write(`   Status: ${status.status}\r`)
    if (status.status === 'ACTIVE_HEALTHY') {
      console.log('\n✅ Project is active!')
      break
    }
    if (i === 59) {
      console.log('\n⚠️  Project still not active after 5 minutes. Continue anyway...')
    }
  }
}

console.log('\n📊 Applying database schema...')
const schema = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf-8')
await api(`/projects/${projectRef}/database/query`, {
  method: 'POST',
  body: JSON.stringify({ query: schema }),
})
console.log('✅ Schema applied (profiles table + RLS policies)')

console.log('\n📦 Creating avatars storage bucket...')
try {
  const supabaseUrl = `https://${projectRef}.supabase.co`
  const apiKeys = await api(`/projects/${projectRef}/api-keys`)
  const serviceKey = apiKeys.find(k => k.name === 'service_role')?.api_key

  const bucketRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      'apikey': serviceKey,
    },
    body: JSON.stringify({
      id: 'avatars',
      name: 'avatars',
      public: true,
      file_size_limit: 2097152, // 2MB
      allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    }),
  })
  if (bucketRes.ok || (await bucketRes.text()).includes('already exists')) {
    console.log('✅ Avatars bucket created (public, 2MB limit, images only)')
  }
} catch (e) {
  console.log(`⚠️  Could not create bucket via Storage API: ${e.message}`)
  console.log('   Creating via Management API instead...')
}

const storagePolicy = `
CREATE POLICY "Public avatar read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
`

try {
  await api(`/projects/${projectRef}/database/query`, {
    method: 'POST',
    body: JSON.stringify({ query: storagePolicy }),
  })
  console.log('✅ Storage RLS policies applied')
} catch (e) {
  console.log(`⚠️  Storage policies may already exist: ${e.message.slice(0, 100)}`)
}

console.log('\n🔑 Fetching API keys...')
const keys = await api(`/projects/${projectRef}/api-keys`)
const anonKey = keys.find(k => k.name === 'anon')?.api_key

const supabaseUrl = `https://${projectRef}.supabase.co`

console.log('\n📝 Writing .env.local...')
const envContent = `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
`
writeFileSync(new URL('../.env.local', import.meta.url), envContent)
console.log('✅ .env.local written')

console.log('\n' + '='.repeat(50))
console.log('🎉 RetroLog Supabase setup complete!')
console.log('='.repeat(50))
console.log(`\n   Project URL:  ${supabaseUrl}`)
console.log(`   Dashboard:   https://supabase.com/dashboard/project/${projectRef}`)
console.log(`\n   Next steps:`)
console.log(`   1. npm run dev`)
console.log(`   2. Open http://localhost:3000`)
console.log(`   3. (Optional) Configure OAuth providers in Dashboard > Auth > Providers`)
console.log(`\n   For Vercel deployment, add these env vars:`)
console.log(`   NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`)
console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`)
console.log()
