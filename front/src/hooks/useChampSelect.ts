
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useRef, useState } from 'react'
import { isEqual } from "lodash"
import { ChampSelectRoot } from '@/types/ChampSelect.interface';

type ChampSelect = ChampSelectRoot | null;

export default function useChampSelect() {
    const [champSelect, setChampSelect] = useState<ChampSelect>(null);
    const champSelectRef = useRef<ChampSelect>(null);
    
    useEffect(() => {
        const interval = setInterval(async () => {
        const newChampSelect = await invoke("get_champ_select_data");
        if (!isEqual(newChampSelect, champSelectRef.current)) {
            champSelectRef.current = newChampSelect as ChampSelect;
            setChampSelect(newChampSelect as ChampSelect);
            console.log("ReRendered");
        }
        }, 500);
    
        return () => {
        clearInterval(interval);
        };
    },[])
    
    return champSelect;
    }