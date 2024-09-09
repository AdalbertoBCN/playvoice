import { LobbyRoot } from '@/types/Lobby.interface'
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useRef, useState } from 'react'
import { isEqual } from "lodash"

type Lobby = LobbyRoot | null;

export default function useLobby() {
  const [lobby, setLobby] = useState<Lobby>(null);
  const lobbyRef = useRef<Lobby>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newLobby = await invoke("get_lobby_data");
      if (!isEqual(newLobby, lobbyRef.current)) {
        lobbyRef.current = newLobby as Lobby;
        setLobby(newLobby as Lobby);
        console.log("ReRendered");
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  },[])

  return lobby;
}
