"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { AvatarDropdown } from "@/components/avatar-dropdown"

export function HeaderButtons() {
  const { theme } = useTheme()

  return (
    <div className="flex items-center gap-4">

      <AvatarDropdown userId="Ethanovum" userName="JD" />
    </div>
  )
}
