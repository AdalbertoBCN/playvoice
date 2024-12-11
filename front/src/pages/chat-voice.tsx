import { useEffect, useState } from "react"
import { AudioConference, LiveKitRoom } from "@livekit/components-react"

import "@livekit/components-styles" // Estilos do LiveKit

import useChampSelect from "@/hooks/useChampSelect"
import { usePUser } from "@/hooks/usePUser"

const VITE_PUBLIC_LK_SERVER_URL = import.meta.env.VITE_PUBLIC_LK_SERVER_URL

if (!VITE_PUBLIC_LK_SERVER_URL) {
  throw new Error("Missing LiveKit Server URL")
}

export function ChatVoice() {
  const { user } = usePUser()
  const champSelect = useChampSelect()
  const [token, setToken] = useState(null) // Estado para armazenar o token
  const [loading, setLoading] = useState(true) // Estado para controlar o carregamento

  // Função para buscar o token via fetch
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("http://localhost:3333/chat-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: "room1",
            participantName: `Player-${Math.floor(Math.random() * 1000) + 1}`,
          }),
        })

        const data = await response.json()

        setToken(data.token) // Armazena o token no estado
      } catch (error) {
        console.error("Erro ao buscar token:", error)
      } finally {
        setLoading(false) // Finaliza o carregamento
      }
    }

    fetchToken() // Chama a função assim que o componente é montado
  }, [])

  if (!champSelect) {
    return <p>Entre na champion select para poder entrar em uma sala de voz.</p>
  }

  // Renderiza uma mensagem de carregamento enquanto busca o token
  if (loading) {
    return <p>Carregando...</p>
  }

  // Exibe erro caso o token não tenha sido obtido
  if (!token) {
    return <p>Erro ao obter o token.</p>
  }

  // Renderiza o componente quando o token é obtido
  return (
    <LiveKitRoom
      token={token}
      serverUrl={VITE_PUBLIC_LK_SERVER_URL}
      connect={true}
    >
      <AudioConference />
    </LiveKitRoom>
  )
}
