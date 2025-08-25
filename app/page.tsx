"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const pages = [
    {
      id: 0,
      content: (
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 tracking-wider leading-tight">
            智 能 向 善 社 会 创 新 网 络
          </h1>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">以人为本，智能向善</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            公益领域始终面临两大挑战：与前沿技术之间的观念鸿沟，以及缺乏高效的专业志愿者网络。这导致许多社会问题虽有人关注，却难有创新性解决方案。
          </p>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            智能向善社会创新网络正是为此而生：让公益插上AI技术的翅膀，创造性地解决社会问题。
          </p>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">激活认知盈余</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            构建贡献、协作与声誉机制的社会创新网络
          </h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            正如Clay
            Shirky在《认知盈余》中所说："在数字时代，人们拥有大量闲暇时间和认知能力，如果被有效组织，将创造巨大的社会价值。"
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            这一洞察启发我们创造性地提出"得道易助"理念——从"得道多助"的道德感召走向"得道易助"的机制创新。我们不只追求让公益事业获得支持，更致力于创造让专业志愿者的"助人"体验变得轻松美好。
          </p>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">共创意义的容器</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">超越生命的有限性</h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            坂本龙一曾说"艺术千秋，人生朝露"，人生如朝露般短暂易逝，但人类始终渴望超越生命的有限性。
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            智能向善社会创新网络正是这样一个让每份贡献都被看见、被记录、被放大的"意义容器"。志愿者能真切地看到自己如何改变他人生活、如何融入更大的智慧洪流，创造出超越个体的持久价值。
          </p>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">加入我们</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            成为智能向善社会创新网络的一员，用你的专业技能和热情，共同创造一个更美好的世界。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg">
                立即加入
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg bg-transparent"
              onClick={() => setCurrentPage(0)}
            >
              了解更多
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const handleScroll = (event: WheelEvent) => {
    if (isScrolling) return

    setIsScrolling(true)

    if (event.deltaY > 0 && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else if (event.deltaY < 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }

    setTimeout(() => setIsScrolling(false), 800)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isScrolling) return

    if (event.key === "ArrowDown" && currentPage < pages.length - 1) {
      setIsScrolling(true)
      setCurrentPage(currentPage + 1)
      setTimeout(() => setIsScrolling(false), 800)
    } else if (event.key === "ArrowUp" && currentPage > 0) {
      setIsScrolling(true)
      setCurrentPage(currentPage - 1)
      setTimeout(() => setIsScrolling(false), 800)
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentPage, isScrolling])

  const goToPage = (pageIndex: number) => {
    if (isScrolling) return
    setIsScrolling(true)
    setCurrentPage(pageIndex)
    setTimeout(() => setIsScrolling(false), 800)
  }

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Background gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-400/20"></div>

      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white/10 backdrop-blur-sm">
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
        <Link href="/dashboard">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium">登录</Button>
        </Link>
      </header>

      {/* Main Content - Scrollable Pages */}
      <main className="relative z-10 pt-20">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${currentPage * 100}vh)`,
            height: `${pages.length * 100}vh`,
          }}
        >
          {pages.map((page, index) => (
            <div
              key={page.id}
              className="h-screen flex items-center justify-center px-8"
              style={{
                opacity: index === currentPage ? 1 : 0.3,
                transition: "opacity 0.7s ease-in-out",
              }}
            >
              {page.content}
            </div>
          ))}
        </div>
      </main>

      {/* Page Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPage ? "bg-blue-600 scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300"
            aria-label="Previous page"
          >
            <ChevronUp className="w-6 h-6 text-gray-800" />
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300"
            aria-label="Next page"
          >
            <ChevronDown className="w-6 h-6 text-gray-800" />
          </button>
        )}
      </div>

      {/* Footer - Fixed at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 text-center px-8 py-4 bg-white/10 backdrop-blur-sm">
        <div className="space-y-1">
          <p className="text-xs text-gray-700">© 2025 智能向善社会创新网络. 保留所有权利</p>
          <p className="text-xs text-gray-700">浙ICP备2025166409号-1</p>
        </div>
      </footer>

      {/* Mobile Navigation Instructions */}
      <div className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 text-center">
        <p className="text-sm text-gray-700 bg-white/80 px-4 py-2 rounded-full">滑动或使用箭头键浏览</p>
      </div>
    </div>
  )
}
