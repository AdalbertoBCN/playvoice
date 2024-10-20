import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center p-8">
      <div className="flex flex-col w-2/3 items-center justify-center gap-4">
        <img
          src="/PlayVoiceLogo.png"
          alt="Logo PlayVoice"
          className="h-[370px] w-[500px]"
        />
        <h1 className="text-3xl font-bold text-white">
          Bem-vindo ao PlayVoice
        </h1>
        <p className="text-lg text-[#A5A5A5]">
          O aplicativo definitivo de comunicação para gamers!
        </p>
      </div>
      <div className="flex flex-col w-2/3 items-center justify-center gap-4">
        <Link to="/sign-in">
          <Button className="bg-[#1A3472] text-white py-3 px-8 hover:bg-[#253d75]">Entrar</Button>
        </Link>

        <Link to="sign-up">
          <Button className="bg-[#1A3472] text-white py-3 px-8 hover:bg-[#253d75]">Cadastrar-se</Button>
        </Link>
      </div>
    </main>
  )
}
