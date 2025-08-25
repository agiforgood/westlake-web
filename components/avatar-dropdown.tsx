"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"
import Link from "next/link"
import { useTheme } from "./theme-provider"

interface AvatarDropdownProps {
  userImage?: string
  userName?: string
  userId?: string
}

export function AvatarDropdown({ userImage, userName = "JD", userId = "Ethanovum" }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    setIsOpen(false)
    // Handle logout logic here
    console.log("Logout clicked")
    // Redirect to homepage
    router.push("/")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Clickable Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none focus:ring-2 focus:ring-[#397eff] rounded-full"
      >
        <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#397eff] transition-all">
          <AvatarImage src={userImage || "/placeholder.svg?height=40&width=40"} />
          <AvatarFallback className="bg-[#004cd7] text-white">{userName}</AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50 ${
            theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
          }`}
        >
          {/* User Info */}
          <div className={`px-4 py-3 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
            <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              登录ID: {userId}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                theme === "dark"
                  ? "text-slate-300 hover:text-white hover:bg-slate-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <User className="w-4 h-4" />
              志愿者说明书
            </Link>

            <div className={`border-t my-2 ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`} />

            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                theme === "dark"
                  ? "text-red-400 hover:text-red-300 hover:bg-slate-700"
                  : "text-red-600 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
