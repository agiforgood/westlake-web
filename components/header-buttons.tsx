"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { AvatarDropdown } from "@/components/avatar-dropdown"

export function HeaderButtons() {
  const { theme } = useTheme()

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className={`${theme === "dark" ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
      >
        <Bell className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`${theme === "dark" ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
      >
        <Settings className="w-5 h-5" />
      </Button>
      <AvatarDropdown userId="Ethanovum" userName="JD" />
    </div>
  )
}
