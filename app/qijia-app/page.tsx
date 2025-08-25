"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Download, Smartphone, Heart, Users, Shield, Menu, X } from "lucide-react"

export default function QijiaAppPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(authStatus === "true")
  }, [])

  const handleProtectedNavigation = (path: string, requireAuth = true) => {
    if (requireAuth && !isAuthenticated) {
      alert("请先登录后再访问此功能")
      window.location.href = "/login"
    } else {
      window.location.href = path
    }
  }

  const navItems = [
    { name: "齐家APP", href: "/qijia-app", current: true },
    { name: "提示词竞技场", href: "/prompt-engineering", protected: true },
    { name: "心理学家协作平台", href: "/psychologist-evaluation", protected: true },
    { name: "教程", href: "/tutorial" },
    { name: "关于我们", href: "/about-us" },
    { name: "路线图", href: "https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc", external: true },
    { name: "任务", href: "https://docs.westlakeaiforgood.com/", external: true },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
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
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-white">智能向善</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <button
                        onClick={() =>
                          item.protected ? handleProtectedNavigation(item.href) : (window.location.href = item.href)
                        }
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          item.current ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => handleProtectedNavigation("/dashboard")}
                className="bg-white text-gray-900 hover:bg-gray-100 font-medium"
              >
                成为志愿者
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-300 p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/20 backdrop-blur-sm border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        item.protected ? handleProtectedNavigation(item.href) : (window.location.href = item.href)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                        item.current ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              <Button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleProtectedNavigation("/dashboard")
                }}
                className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-100 font-medium"
              >
                成为志愿者
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">齐家APP</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              AI驱动的家庭心理健康平台，让每个家庭都能享受专业的心理支持
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-gray-900">智能心理评估</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  基于AI技术的专业心理评估工具，帮助家庭成员了解彼此的心理状态，及时发现问题并提供针对性建议。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-gray-900">家庭互动工具</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  提供丰富的家庭互动游戏和活动建议，增进家庭成员之间的理解和感情，构建和谐的家庭关系。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-gray-900">专业心理支持</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  连接专业心理咨询师和志愿者网络，为有需要的家庭提供及时、专业的心理健康支持服务。
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <div className="text-center">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
              <CardHeader className="text-center">
                <Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900 mb-2">立即下载</CardTitle>
                <CardDescription className="text-gray-600">
                  扫描二维码下载齐家APP，开始您的家庭心理健康之旅
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Download className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">App Store 下载二维码</p>
                      <p className="text-xs text-gray-400 mt-1">即将上线</p>
                    </div>
                  </div>
                </div>

                {/* App Store Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white" disabled>
                    <Download className="w-4 h-4 mr-2" />从 App Store 下载
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    <Download className="w-4 h-4 mr-2" />从 Google Play 下载
                  </Button>
                  <p className="text-xs text-gray-500 text-center">* 应用正在开发中，敬请期待</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">为什么选择齐家APP？</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
                  <div>
                    <h4 className="font-semibold mb-2">🎯 精准评估</h4>
                    <p className="text-sm">基于心理学专业量表和AI算法，提供科学准确的心理健康评估</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">👨‍👩‍👧‍👦 全家适用</h4>
                    <p className="text-sm">针对不同年龄段家庭成员设计，从儿童到老人都能找到合适的功能</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔒 隐私保护</h4>
                    <p className="text-sm">严格遵循数据保护法规，确保用户隐私和数据安全</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🌟 专业支持</h4>
                    <p className="text-sm">由专业心理学家和AI专家团队共同开发，确保专业性和实用性</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 text-center px-8 py-4 text-white/80 z-10">
        <div className="space-y-1 text-sm">
          <p>© 2025 智能向善社会创新网络. 保留所有权利</p>
          <p>浙ICP备2025166409号-1</p>
        </div>
      </div>
    </div>
  )
}
