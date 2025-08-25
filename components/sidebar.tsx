"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import {
  LayoutDashboard,
  Users,
  Trophy,
  Brain,
  UserCheck,
  Network,
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "dashboard.title",
    href: "/dashboard",
    icon: LayoutDashboard,
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
    name: "sidebar.volunteerNetwork",
    href: "/network",
    icon: Network,
  },
  {
    name: "sidebar.leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "sidebar.badgeSystem",
    href: "/badge",
    icon: Star,
  },
  {
    name: "sidebar.myProfile",
    href: "/profile",
    icon: Users,
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  const { t } = useLanguage()

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-in-out",
          "border-r",
          theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-inherit">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <Star className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-gray-900"} fill-current`} />
            </div>
            {!collapsed && (
              <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                智能向善
              </span>
            )}
          </Link>

          {/* Collapse button - only show on desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? theme === "dark"
                      ? "bg-slate-800 text-white"
                      : "bg-gray-100 text-gray-900"
                    : theme === "dark"
                      ? "text-slate-400 hover:text-white hover:bg-slate-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{t(item.name)}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content margin */}
      <style jsx global>{`
        .sidebar-margin {
          margin-left: ${collapsed ? "4rem" : "16rem"};
          transition: margin-left 300ms ease-in-out;
        }
        
        @media (max-width: 768px) {
          .sidebar-margin {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  )
}
