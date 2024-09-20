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

            <div onClick={minimizeWindow} className="inline-flex items-center justify-center m-0 mr-2 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]">
                <Minus />
            </div>

            <div onClick={closeWindow} className="inline-flex items-center justify-center m-0 mr-2 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]">
                <X/>
            </div>

        </div>
    )
}

function Minus() {
  return (
    <svg
      width={10}
      height={1}
      viewBox="0 0 10 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[9px]"
    >
      <path
        d="M.498 1.001A.498.498 0 010 .503.5.5 0 01.146.15.478.478 0 01.303.04.498.498 0 01.498 0h9.004c.068 0 .132.013.19.04a.465.465 0 01.162.111.5.5 0 01-.352.85H.498z"
        fill="currentColor"
        fillOpacity={0.8956}
      />
    </svg>
  )
}


function X() {
    return (
      <svg
        width={10}
        height={10}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-2 w-2"
      >
        <path
          d="M5 5.709L.854 9.854a.48.48 0 01-.351.147.5.5 0 01-.361-.142A.5.5 0 010 9.498a.48.48 0 01.146-.352l4.146-4.145L.146.855A.485.485 0 010 .5.498.498 0 01.146.147.5.5 0 01.503.001a.48.48 0 01.351.146L5 4.293 9.146.147a.485.485 0 01.356-.146.5.5 0 01.352.854L5.708 5.001l4.146 4.145a.498.498 0 010 .708.498.498 0 01-.352.147.485.485 0 01-.356-.147L5 5.71z"
          fill="currentColor"
          fillOpacity={0.8956}
        />
      </svg>
    )
  }