"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("登录成功！正在跳转...")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 2000)
  }

  const handleSkipLogin = () => {
    setSuccess("跳过登录，正在跳转...")
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  const handleLoginFailure = () => {
    setError("登录失败：用户名或密码错误")
    setIsLoading(false)
  }

  const simulateLoginFailure = () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    setTimeout(() => {
      handleLoginFailure()
    }, 2000)
  }

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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/10 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <span className="text-xl font-semibold text-white">智能向善</span>
        </Link>
      </header>

      {/* Login Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">欢迎回来</CardTitle>
            <CardDescription className="text-gray-600">登录您的智能向善账户</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  邮箱地址
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入您的邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  密码
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入您的密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">记住我</span>
                </label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  忘记密码？
                </Link>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">{success}</span>
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            {/* Test Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">测试功能</p>
              <div className="flex gap-2">
                <Button
                  onClick={handleSkipLogin}
                  variant="outline"
                  className="flex-1 text-sm bg-transparent"
                  disabled={isLoading}
                >
                  跳过登录
                </Button>
                <Button
                  onClick={simulateLoginFailure}
                  variant="outline"
                  className="flex-1 text-sm text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                  disabled={isLoading}
                >
                  模拟登录失败
                </Button>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">还没有账户？</span>
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 ml-1">
                立即注册
              </Link>
            </div>
          </CardContent>
        </Card>
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
