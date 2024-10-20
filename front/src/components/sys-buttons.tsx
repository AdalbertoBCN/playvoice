import { Minus, Settings, X } from "lucide-react";
import { useCallback } from "react";

export function SysButtons() {
    const closeWindow = useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/plugin-window")
    
        appWindow.close()
      }, []);

    const minimizeWindow = useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/plugin-window")
    
        appWindow.minimize()
      }, []);

    return (
        <div className="h-auto items-center ml-auto flex">
            <div onClick={minimizeWindow} className="inline-flex items-center justify-center m-0 aspect-square h-8 w-8 cursor-default p-2 text-white hover:bg-[#424242] active:bg-[#565656]">
                <Minus />
            </div>

            <div className="inline-flex items-center justify-center m-0 aspect-square h-8 w-8 cursor-default p-2 text-white hover:bg-[#424242] active:bg-[#565656]">
              <Settings />
            </div>

            <div onClick={closeWindow} className="inline-flex items-center justify-center m-0 aspect-square h-8 w-8 cursor-default p-2 text-white hover:bg-red-700 active:bg-red-500">
                <X />
            </div>
        </div>
    )
}