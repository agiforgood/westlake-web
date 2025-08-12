"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Trophy,
  Brain,
  UserCheck,
  User,
  Network,
  Award,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { useLanguage } from "./language-provider"


const navigationItems = [
  {
    name: "sidebar.dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "sidebar.promptEngineering",
    href: "/prompt-engineering",
    icon: Brain,
  },
  {
    name: "sidebar.psychologistEvaluation",
    href: "/psychologist-evaluation",
    icon: UserCheck,
  },
  {
    name: "sidebar.leaderboard",
    href: "/leaderboard",
    icon: Award,
  },
  {
    name: "sidebar.badge",
    href: "#",
    icon: Trophy,
  },
  {
    name: "sidebar.network",
    href: "#",
    icon: Network,
  },
  {
    name: "sidebar.profile",
    href: "#",
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const createLocalizedHref = (href: string) => {
    if (href === "#") return href
    return href
  }

  const isActiveItem = (href: string) => {
    if (href === "#") return false
    return pathname === href
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full transition-all duration-300 border-r z-50 ${
          isCollapsed ? "w-20" : "w-64"
        } ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div className="p-6 h-full flex flex-col relative">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors opacity-80 hover:opacity-100 ${
              theme === "dark"
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#004cd7] to-[#397eff] flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            {!isCollapsed && (
              <span className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                WestLake
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveItem(item.href)
              const href = createLocalizedHref(item.href)

              return (
                <div key={item.name}>
                  {item.href === "#" ? (
                    <a
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#004cd7] text-white"
                          : theme === "dark"
                            ? "text-slate-400 hover:text-white hover:bg-slate-800"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? t(item.name) : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{t(item.name)}</span>}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#004cd7] text-white"
                          : theme === "dark"
                            ? "text-slate-400 hover:text-white hover:bg-slate-800"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? t(item.name) : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{t(item.name)}</span>}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Theme Toggle Button */}
          <div className="space-y-2">


            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full ${
                theme === "dark"
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? (theme === "dark" ? t("sidebar.lightMode") : t("sidebar.darkMode")) : undefined}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {!isCollapsed && <span>{theme === "dark" ? t("sidebar.lightMode") : t("sidebar.darkMode")}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Added dynamic margin utility for other components to use */}
      <style jsx global>{`
        .sidebar-margin {
          margin-left: ${isCollapsed ? "5rem" : "16rem"};
          transition: margin-left 300ms ease;
        }
      `}</style>
    </>
  )
}
