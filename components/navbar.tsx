"use client"

import { useState, useRef, useEffect } from "react"
import { User, Settings, MessageCircle, LogOut } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useTheme } from "./theme-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { theme } = useTheme()

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

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 h-16 border-b ${
        theme === "dark"
          ? "bg-slate-900/95 border-slate-800 backdrop-blur-sm"
          : "bg-white/95 border-slate-200 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-end h-full px-6">
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#004cd7] to-[#397eff] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              }`}
            >
              {/* User Info */}
              <div className={`px-4 py-3 border-b ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>John Doe</p>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  john.doe@example.com
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    // Handle profile navigation
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-slate-700"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  {t("profile.myProfile")}
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false)
                    // Handle messages navigation
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-slate-700"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("profile.myMessages")}
                </button>

                <div className={`border-t my-2 ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`} />

                <button
                  onClick={() => {
                    setIsOpen(false)
                    // Handle logout
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-red-400 hover:text-red-300 hover:bg-slate-700"
                      : "text-red-600 hover:text-red-700 hover:bg-red-50"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  {t("profile.logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
