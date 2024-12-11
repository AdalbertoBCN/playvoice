import * as React from "react"
import { useUser } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

import useChampSelect from "@/hooks/useChampSelect"
import { usePUser } from "@/hooks/usePUser"
import { MenuSysButtons } from "@/components/menu-sys-buttons"

export default function ProtectedLayout() {
  const { isLoaded, user } = useUser()
  const champSelect = useChampSelect()

  const { setUser } = usePUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        setUser(user.id, user.imageUrl, user.fullName ?? "name")
      }

      if (champSelect && window.location.pathname !== "/chat-voice") {
        navigate("/chat-voice")
      }
    }, 1000)

    if (isLoaded && !user) {
      navigate("/sign-in")
    }

    return () => clearInterval(interval)
  }, [isLoaded, user])

  if (!isLoaded)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Loading...
      </div>
    )

  return (
    <div>
      <MenuSysButtons />
      <Outlet />
    </div>
  )
}
