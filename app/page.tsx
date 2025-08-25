"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0)
  const totalSections = 4

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        // Scroll down
        setCurrentSection((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        setCurrentSection((prev) => prev - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentSection < totalSections - 1) {
        setCurrentSection((prev) => prev + 1)
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSection])

  const navigateToSection = (index: number) => {
    setCurrentSection(index)
  }

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection((prev) => prev + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
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

      {/* Main Content Container */}
      <div
        className="h-screen transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {/* Section 1 - Hero with Video Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/abstract-flowing-particles-technology-background-v.png" type="video/mp4" />
            {/* Fallback gradient background */}
          </video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-cyan-400/30 z-10"></div>

          {/* Content */}
          <div className="relative z-20 text-center px-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.2em] leading-tight drop-shadow-2xl">
              智 能 向 善 社 会 创 新 网 络
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <button onClick={nextSection} className="text-white hover:text-gray-300 transition-colors animate-bounce">
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </section>

        {/* Section 2 - Mission Statement */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">以人为本，智能向善</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              公益领域始终面临两大挑战：与前沿技术之间的观念鸿沟，以及缺乏高效的专业志愿者网络。这导致许多社会问题虽有人关注，却难有创新性解决方案。智能向善社会创新网络正是为此而生：让公益插上AI技术的翅膀，创造性地解决社会问题。
            </p>
          </div>
        </section>

        {/* Section 3 - Innovation Philosophy */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              激活认知盈余，构建贡献、协作与声誉机制的社会创新网络
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              正如Clay
              Shirky在《认知盈余》中所说："在数字时代，人们拥有大量闲暇时间和认知能力，如果被有效组织，将创造巨大的社会价值。"这一洞察启发我们创造性地提出"得道易助"理念——从"得道多助"的道德感召走向"得道易助"的机制创新。
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              我们不只追求让公益事业获得支持，更致力于创造让专业志愿者的"助人"体验变得轻松美好。
            </p>
          </div>
        </section>

        {/* Section 4 - Vision */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              共创意义的容器：超越生命的有限性
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              坂本龙一曾说"艺术千秋，人生朝露"，人生如朝露般短暂易逝，但人类始终渴望超越生命的有限性。智能向善社会创新网络正是这样一个让每份贡献都被看见、被记录、被放大的"意义容器"。
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              志愿者能真切地看到自己如何改变他人生活、如何融入更大的智慧洪流，创造出超越个体的持久价值。
            </p>

            {/* Call to Action */}
            <div className="mt-12">
              <Link href="/dashboard">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  开始你的智能向善之旅
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? "bg-blue-600 scale-125" : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSection === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800 hover:bg-white/20"
          }`}
          aria-label="Previous section"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={nextSection}
          disabled={currentSection === totalSections - 1}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSection === totalSections - 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800 hover:bg-white/20"
          }`}
          aria-label="Next section"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Footer - Only visible on last section */}
      <footer
        className={`fixed bottom-0 left-0 right-0 z-40 text-center px-8 py-4 text-gray-600 transition-opacity duration-500 ${
          currentSection === totalSections - 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-1">
          <p className="text-sm">© 2025 智能向善社会创新网络. 保留所有权利</p>
          <p className="text-sm">浙ICP备2025166409号-1</p>
        </div>
      </footer>
    </div>
  )
}
