"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play, BookOpen, Users, Brain, Target, CheckCircle, ArrowRight } from "lucide-react"

export default function TutorialPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(authStatus === "true")
  }, [])

  const handleProtectedNavigation = (path: string, name: string) => {
    if (!isAuthenticated) {
      alert(`请先登录后再访问${name}`)
      window.location.href = "/login"
    } else {
      window.location.href = path
    }
  }

  const promptEngineeringSteps = [
    {
      step: 1,
      title: "注册并完善个人资料",
      description: "创建账户，填写专业背景和技能标签，让系统更好地为您匹配合适的任务。",
      tips: "详细的个人资料有助于获得更多高质量的任务机会",
    },
    {
      step: 2,
      title: "浏览可用任务",
      description: "在提示词工程页面查看当前可用的任务，选择符合您专业领域的项目。",
      tips: "优先选择与您专业背景匹配的任务，提高完成质量",
    },
    {
      step: 3,
      title: "创建和优化提示词",
      description: "使用平台提供的工具创建提示词，测试效果并不断优化，确保达到预期目标。",
      tips: "多次测试和迭代是创建高质量提示词的关键",
    },
    {
      step: 4,
      title: "提交并获得反馈",
      description: "提交完成的提示词，等待专家评审和用户反馈，根据建议进行改进。",
      tips: "积极响应反馈，持续改进有助于提升个人声誉",
    },
  ]

  const psychologistSteps = [
    {
      step: 1,
      title: "验证专业资质",
      description: "上传心理学相关学历证书或执业资格证明，通过平台的专业资质审核。",
      tips: "完整的资质认证有助于获得更多信任和高价值任务",
    },
    {
      step: 2,
      title: "选择评估任务",
      description: "在心理学家协作平台查看待评估的对话记录，选择适合的评估任务。",
      tips: "选择您专业领域内的评估任务，确保评估质量",
    },
    {
      step: 3,
      title: "进行专业评估",
      description: "基于心理学专业知识，对AI对话进行多维度评估，提供详细的分析报告。",
      tips: "客观、专业的评估是建立良好声誉的基础",
    },
    {
      step: 4,
      title: "协作与交流",
      description: "与其他心理学专家交流评估经验，参与案例讨论，共同提升评估标准。",
      tips: "积极参与社区讨论有助于专业成长和网络建设",
    },
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
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/10 backdrop-blur-sm">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <span className="text-xl font-semibold text-white">智能向善</span>
        </Link>

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
                <Link
                  href="/qijia-app"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  齐家APP
                </Link>
                <button
                  onClick={() => handleProtectedNavigation("/prompt-engineering", "提示词竞技场")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  提示词竞技场
                </button>
                <button
                  onClick={() => handleProtectedNavigation("/psychologist-evaluation", "心理学家协作平台")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  心理学家协作平台
                </button>
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
                  href="https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  路线图
                </a>
                <a
                  href="https://docs.westlakeaiforgood.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  任务
                </a>
                <Link
                  href="/tutorial"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors bg-gray-50 font-medium"
                >
                  教程
                </Link>
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
                <Link
                  href="/about-us"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  我们是谁
                </Link>
                <button
                  onClick={() => handleProtectedNavigation("/dashboard", "志愿者平台")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  成为志愿者
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Login Button */}
        <Link href="/login">
          <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-6 py-2 rounded-full font-medium">
            登录/注册
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-[10px ] mt-10">新手教程</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              快速掌握提示词工程师和心理学家协作平台的基本操作
            </p>
          </div>

          {/* Tutorial Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Prompt Engineering Tutorial */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">提示词工程师</CardTitle>
                    <CardDescription className="text-gray-600">学习如何创建高质量的AI提示词</CardDescription>
                  </div>
                </div>
                <Badge className="w-fit bg-blue-100 text-blue-800">初级教程</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {promptEngineeringSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <Target className="w-3 h-3 inline mr-1" />
                          小贴士: {step.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    开始提示词工程之旅
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Psychologist Tutorial */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">心理学家协作</CardTitle>
                    <CardDescription className="text-gray-600">了解如何参与AI心理评估工作</CardDescription>
                  </div>
                </div>
                <Badge className="w-fit bg-green-100 text-green-800">专业教程</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {psychologistSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-700">
                          <Target className="w-3 h-3 inline mr-1" />
                          小贴士: {step.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    开始心理学家协作
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">详细文档</h3>
                <p className="text-sm text-white/80 mb-4">查看完整的操作手册和最佳实践指南</p>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-transparent">
                  查看文档
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Play className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">视频教程</h3>
                <p className="text-sm text-white/80 mb-4">观看详细的操作演示视频</p>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-transparent">
                  观看视频
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">社区支持</h3>
                <p className="text-sm text-white/80 mb-4">加入社区，与其他志愿者交流经验</p>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-transparent">
                  加入社区
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">准备好开始了吗？</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                现在您已经了解了基本操作流程，是时候开始您的志愿者之旅了。选择适合您的角色，开始为社会创造积极影响。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Brain className="w-4 h-4 mr-2" />
                    成为提示词工程师
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    加入心理学家协作
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
