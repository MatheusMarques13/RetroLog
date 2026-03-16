'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { SparklesIcon, CheckIcon, XIcon } from '@/components/icons'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passStrength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 5 ? 2 : password.length > 0 ? 1 : 0
  const passColor = ['bg-border', 'bg-accent-pink', 'bg-accent-yellow', 'bg-accent-yellow', 'bg-accent-mint'][passStrength]
  const passLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passStrength]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
        <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
        <div className="w-full max-w-md text-center">
          <CheckIcon className="w-12 h-12 text-accent-mint mx-auto mb-4" />
          <h1 className="font-pixel text-xl text-txt-primary mb-2">Password Updated!</h1>
          <p className="font-hand text-sm text-txt-secondary mb-6">Your password has been reset successfully.</p>
          <Link href="/auth" className="inline-block py-3 px-8 rounded-xl font-hand font-bold text-base text-white bg-accent-pink border-2 border-dark shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 transition-all">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
      <div className="paper-grain absolute inset-0 pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <SparklesIcon className="w-6 h-6 text-accent-yellow mx-auto mb-2" />
          <h1 className="font-pixel text-xl text-txt-primary mb-1">Set New Password</h1>
          <p className="font-hand text-sm text-txt-secondary">Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">New Password</label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="input-field"
              autoComplete="new-password"
            />
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passStrength >= i ? passColor : 'bg-border'}`} />
                  ))}
                </div>
                <p className={`font-mono text-[10px] mt-1 ${passStrength >= 3 ? 'text-accent-mint' : passStrength >= 2 ? 'text-accent-yellow' : 'text-accent-pink'}`}>
                  {passLabel}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="font-hand text-sm font-bold text-txt-primary mb-1 block">Confirm Password</label>
            <input
              type="password" value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="input-field"
              autoComplete="new-password"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="font-hand text-xs text-accent-pink mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3 bg-accent-pink/10 border border-accent-pink/30 rounded-xl">
              <XIcon className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
              <p className="font-hand text-sm text-accent-pink">{error}</p>
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className={`w-full py-3.5 rounded-xl font-hand font-bold text-base text-white border-2 border-dark transition-all duration-200 ${
              loading ? 'bg-accent-pink/70 cursor-wait' : 'bg-accent-pink shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <p className="text-center font-hand text-sm text-txt-secondary mt-5">
          <Link href="/auth" className="text-accent-pink font-bold hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  )
}
