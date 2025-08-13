"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function GuestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Background gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-400/20"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Star className="w-8 h-8 text-blue-600 fill-blue-600" />
          </div>
          <span className="text-xl font-semibold text-gray-800">智能向善</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#roadmap" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            路线图
          </Link>
          <Link href="#tasks" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            任务
          </Link>
          <Link href="#volunteers" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            志愿者
          </Link>
        </nav>

        {/* Login Button */}
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium">登录</Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 tracking-wider leading-tight">
            智能向善社会创新网络
          </h1>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center px-8 py-8 text-gray-700">
        <div className="space-y-2">
          <p className="text-sm">© 2025 智能向善社会创新网络. 保留所有权利</p>
          <p className="text-sm">浙ICP备2025166409号-1</p>
        </div>
      </footer>

      {/* Mobile Navigation Menu (hidden by default, can be toggled) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 z-20">
        <nav className="flex justify-around">
          <Link href="#roadmap" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
            路线图
          </Link>
          <Link href="#tasks" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
            任务
          </Link>
          <Link href="#volunteers" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
            志愿者
          </Link>
        </nav>
      </div>
    </div>
  )
}
