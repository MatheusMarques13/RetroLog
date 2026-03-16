// Force dynamic rendering — this page requires auth cookies
export const dynamic = 'force-dynamic'

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return children
}
