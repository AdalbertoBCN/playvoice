import * as React from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuSysButtons } from '@/components/menu-sys-buttons'
import { usePUser } from '@/hooks/usePUser'

export default function ProtectedLayout() {
  const { isLoaded, user } = useUser();
  const { setUser } = usePUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user){
      setUser(user.id, user.imageUrl, user.fullName ?? "name")
    }
    if (isLoaded && !user) {
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