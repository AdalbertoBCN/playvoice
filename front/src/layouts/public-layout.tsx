import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { MenuSysButtons } from '@/components/menu-sys-buttons'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function PublicLayout() {
  const navigate = useNavigate()

  return (
    <>
    <MenuSysButtons />
    <main>
      <Outlet />
    </main>
    </>
  )
}