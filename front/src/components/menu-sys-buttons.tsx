"use client"

import { WindowTitlebar } from "tauri-controls"

import {
  Menubar,
  MenubarMenu
} from "@/components/ui/menubar"

import { Sailboat } from "lucide-react"
import { MenuModeToggle } from "./menu-mode-toggle"
import { SysButtons } from "./sys-buttons"


export function MenuSysButtons() {

  return (
    <WindowTitlebar
      windowControlsProps={{
        hide: true
      }}
      className="bg-[#242424] sticky top-0 z-50"

    // controlsOrder="platform"
    // windowControlsProps={{ platform: "macos", className: "" }}
    >
      <Menubar className="rounded-none border-b border-none pl-2 lg:pl-3 bg-transparent">
        <MenubarMenu>
          <div className="inline-flex gap-x-0.5 h-fit w-fit items-center text-cyan-500">
            <Sailboat className="h-5 w-5" />
            <span className="font-semibold h-5">Playvoice</span>
          </div>
        </MenubarMenu>
      </Menubar>
        <SysButtons />
    </WindowTitlebar>
  )
}
