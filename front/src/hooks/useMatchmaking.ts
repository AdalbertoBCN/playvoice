import { MatchRoot } from '@/types/Matchmaking.interface';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useRef, useState } from 'react'
import { isEqual } from "lodash"

type Match = MatchRoot | null;

export default function useMatchmaking() {
  const [match, setMatch] = useState<Match>(null);
  const matchRef = useRef<Match>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newMatch = await invoke("get_matchmaking_data");
      if (!isEqual(newMatch, matchRef.current)) {
        matchRef.current = newMatch as Match;
        setMatch(newMatch as Match);
        console.log("ReRendered");
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  },[])

  return match;
}
