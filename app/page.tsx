"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown } from "lucide-react"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 4

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  // Handle wheel scroll
  useEffect(() => {
    let isScrolling = false

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      isScrolling = true
      setTimeout(() => {
        isScrolling = false
      }, 1000)

      if (e.deltaY > 0) {
        // Scroll down
        nextPage()
      } else {
        // Scroll up
        prevPage()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/10 backdrop-blur-sm">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <span className="text-xl font-semibold text-white">智能向善</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* 产品 Dropdown */}
          <div className="relative group">
            <button className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1">
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
            <button className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1">
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
            <button className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1">
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
        <Link href="/login">
          <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-6 py-2 rounded-full font-medium">
            登录注册
          </Button>
        </Link>
      </header>

      {/* Sliding Pages Container */}
      <div className="relative w-full h-screen">
        <div
          className="flex flex-col w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${currentPage * 100}vh)` }}
        >
          {/* Page 1: Title with Video Background */}
          <div className="min-h-screen w-full relative flex items-center justify-center">
            {/* Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              {/* Fallback gradient background if video fails to load */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 text-center px-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.2em] leading-tight">
                智 能 向 善
                <br />社 会 创 新 网 络
              </h1>
            </div>
          </div>

          {/* Page 2: Mission */}
          <div className="min-h-screen w-full relative flex items-center justify-center">
            {/* Same Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-4xl text-center text-white px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">以人为本，智能向善</h2>
              <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                公益领域始终面临两大挑战：与前沿技术之间的观念鸿沟，以及缺乏高效的专业志愿者网络。这导致许多社会问题虽有人关注，却难有创新性解决方案。
              </p>
              <div className="mt-8 h-1 w-32 bg-white/50 mx-auto"></div>
              <p className="text-xl md:text-2xl mt-8 leading-relaxed">
                <strong>智能向善社会创新网络正是为此而生：让公益插上AI技术的翅膀，创造性地解决社会问题。</strong>
              </p>
            </div>
          </div>

          {/* Page 3: Innovation Philosophy */}
          <div className="min-h-screen w-full relative flex items-center justify-center">
            {/* Same Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-5xl text-center text-white px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                激活认知盈余，构建贡献、协作与声誉机制的社会创新网络
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
                <p>
                  正如Clay Shirky在《认知盈余》中所说：
                  <em>"在数字时代，人们拥有大量闲暇时间和认知能力，如果被有效组织，将创造巨大的社会价值。"</em>
                </p>
                <div className="h-1 w-24 bg-white/50 mx-auto"></div>
                <p>
                  这一洞察启发我们创造性地提出<strong>"得道易助"</strong>
                  理念——从"得道多助"的道德感召走向"得道易助"的机制创新。
                </p>
                <p className="text-xl md:text-2xl font-semibold">
                  我们不只追求让公益事业获得支持，更致力于创造让专业志愿者的"助人"体验变得轻松美好。
                </p>
              </div>
            </div>
          </div>

          {/* Page 4: Vision */}
          <div className="min-h-screen w-full relative flex items-center justify-center">
            {/* Same Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-4xl text-center text-white px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">共创意义的容器：超越生命的有限性</h2>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
                <p>
                  坂本龙一曾说<em>"艺术千秋，人生朝露"</em>，人生如朝露般短暂易逝，但人类始终渴望超越生命的有限性。
                </p>
                <div className="h-1 w-24 bg-white/50 mx-auto"></div>
                <p className="text-xl md:text-2xl font-semibold">
                  智能向善社会创新网络正是这样一个让每份贡献都被看见、被记录、被放大的<strong>"意义容器"</strong>。
                </p>
                <p>志愿者能真切地看到自己如何改变他人生活、如何融入更大的智慧洪流，创造出超越个体的持久价值。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPage === index ? "bg-white/80 scale-125" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Hint - Only show when not on last page */}
      {currentPage < totalPages - 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/70 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">滚动浏览</span>
            <div className="animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Footer (only visible on last page) */}
      <div
        className={`absolute bottom-0 left-0 right-0 text-center px-8 py-4 text-white/80 transition-opacity duration-500 ${
          currentPage === totalPages - 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-1 text-sm">
          <p>© 2025 智能向善社会创新网络. 保留所有权利</p>
          <p>浙ICP备2025166409号-1</p>
        </div>
      </div>
    </div>
  )
}
