"use client"

import { Sailboat } from "lucide-react"
import { WindowTitlebar } from "tauri-controls"

import { Menubar, MenubarMenu } from "@/components/ui/menubar"

import { MenuModeToggle } from "./menu-mode-toggle"
import { SysButtons } from "./sys-buttons"

export function MenuSysButtons() {
  return (
    <WindowTitlebar
      windowControlsProps={{
        hide: true,
      }}
      className="sticky top-0 z-50 bg-[#242424]"
      // controlsOrder="platform"
      // windowControlsProps={{ platform: "macos", className: "" }}
    >
      <SysButtons />
    </WindowTitlebar>
  )
}
