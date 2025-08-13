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
          {/* 产品 Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
              产品
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#qijia-app"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  齐家APP
                </a>
                <a
                  href="#prompt-arena"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  提示词竞技场
                </a>
                <a
                  href="#psychologist-platform"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  心理学家协作平台
                </a>
              </div>
            </div>
          </div>

          {/* 文档 Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
              文档
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#roadmap"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  路线图
                </a>
                <a
                  href="#tasks"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  任务
                </a>
                <a
                  href="#tutorials"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  教程
                </a>
              </div>
            </div>
          </div>

          {/* 志愿者 Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
              志愿者
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#who-we-are"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  我们是谁
                </a>
                <a
                  href="#become-volunteer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  成为志愿者
                </a>
              </div>
            </div>
          </div>
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
        <nav className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-medium text-gray-900 mb-2">产品</p>
            <div className="space-y-1">
              <a href="#qijia-app" className="block text-sm text-gray-700 hover:text-gray-900">
                齐家APP
              </a>
              <a href="#prompt-arena" className="block text-sm text-gray-700 hover:text-gray-900">
                提示词竞技场
              </a>
              <a href="#psychologist-platform" className="block text-sm text-gray-700 hover:text-gray-900">
                心理学家协作平台
              </a>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">文档</p>
            <div className="space-y-1">
              <a href="#roadmap" className="block text-sm text-gray-700 hover:text-gray-900">
                路线图
              </a>
              <a href="#tasks" className="block text-sm text-gray-700 hover:text-gray-900">
                任务
              </a>
              <a href="#tutorials" className="block text-sm text-gray-700 hover:text-gray-900">
                教程
              </a>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">志愿者</p>
            <div className="space-y-1">
              <a href="#who-we-are" className="block text-sm text-gray-700 hover:text-gray-900">
                我们是谁
              </a>
              <a href="#become-volunteer" className="block text-sm text-gray-700 hover:text-gray-900">
                成为志愿者
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
