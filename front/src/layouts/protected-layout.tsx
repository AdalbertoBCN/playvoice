import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuSysButtons } from '@/components/menu-sys-buttons'

export default function ProtectedLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  }, [isLoaded])

  if (!isLoaded) return 'Loading...'

  return (
    <div>
      <MenuSysButtons />
      <Outlet />
    </div>
)
}