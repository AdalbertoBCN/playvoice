import { SignedIn, UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "./ui/button"

export default function TopNavbar() {
  const { user } = useUser()

  return (
    <div className="flex items-center justify-between bg-[#101010] px-2 py-4">
      <section>
        <img
          src="/PlayVoiceLogo.png"
          alt="Logo PlayVoice"
          className="h-12 w-16"
        />
      </section>
      <section className="flex items-center">
        <Button className="bg-[#1A3472] text-white hover:bg-[#253d75]">
            Ver Jogos
        </Button>
        <Button variant="ghost" className="hover:bg-transparent">
            <img src="/games/LOL.png" alt="League of Legends" className="w-12 h-12" />
        </Button>
        <Button variant="ghost" className="hover:bg-transparent">
            <img src="/games/ADD.png" alt="League of Legends" className="w-12 h-12" />
        </Button>
      </section>
      <section className="flex items-center gap-2">
        <SignedIn>
          {user?.firstName}
          {user?.lastName}
          {user?.username}
          <UserButton />
        </SignedIn>
      </section>
    </div>
  )
}
