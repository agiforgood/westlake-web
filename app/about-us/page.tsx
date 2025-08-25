"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Linkedin, Github, Heart, Users, Target, Award } from "lucide-react"

export default function AboutUsPage() {
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

  const teamMembers = [
    {
      name: "张明华",
      role: "项目创始人 & 技术总监",
      avatar: "/placeholder-user.jpg",
      bio: "西湖大学人工智能博士，专注于AI伦理和社会影响研究。曾在Google、Microsoft等公司担任高级工程师，拥有10年AI产品开发经验。",
      expertise: ["人工智能", "机器学习", "AI伦理", "产品设计"],
      achievements: ["发表AI伦理相关论文15篇", "获得国家科技进步二等奖", "TEDx演讲者"],
      contact: {
        email: "minghua.zhang@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/minghua-zhang",
        github: "https://github.com/minghua-zhang",
      },
    },
    {
      name: "李心怡",
      role: "心理学专家 & 内容总监",
      avatar: "/placeholder-user.jpg",
      bio: "北京师范大学心理学博士，国家二级心理咨询师。专注于家庭心理健康和AI辅助心理评估研究，拥有丰富的临床经验。",
      expertise: ["临床心理学", "家庭治疗", "心理评估", "AI心理学"],
      achievements: ["执业心理咨询师8年", "发表心理学研究论文20篇", "心理健康科普作家"],
      contact: {
        email: "xinyi.li@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/xinyi-li",
      },
    },
    {
      name: "王建国",
      role: "社区运营总监",
      avatar: "/placeholder-user.jpg",
      bio: "清华大学社会学硕士，拥有8年社区运营和志愿者管理经验。曾在联合国儿童基金会、中国青少年发展基金会等机构工作。",
      expertise: ["社区运营", "志愿者管理", "公益项目", "社会创新"],
      achievements: ["管理志愿者团队超过1000人", "策划公益项目50+个", "获得中国公益慈善项目大赛金奖"],
      contact: {
        email: "jianguo.wang@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/jianguo-wang",
      },
    },
    {
      name: "陈雅文",
      role: "产品设计师",
      avatar: "/placeholder-user.jpg",
      bio: "中央美术学院交互设计硕士，专注于用户体验设计和无障碍设计。曾在阿里巴巴、腾讯等公司担任高级设计师。",
      expertise: ["用户体验设计", "交互设计", "无障碍设计", "设计系统"],
      achievements: ["获得红点设计奖", "设计作品服务用户超过1亿", "无障碍设计倡导者"],
      contact: {
        email: "yawen.chen@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/yawen-chen",
      },
    },
    {
      name: "刘志强",
      role: "数据科学家",
      avatar: "/placeholder-user.jpg",
      bio: "斯坦福大学统计学博士，专注于自然语言处理和情感分析。在AI领域拥有丰富的研究和工程经验。",
      expertise: ["自然语言处理", "情感分析", "机器学习", "数据挖掘"],
      achievements: ["发表NLP相关论文25篇", "获得ACL最佳论文奖", "开源项目贡献者"],
      contact: {
        email: "zhiqiang.liu@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/zhiqiang-liu",
        github: "https://github.com/zhiqiang-liu",
      },
    },
    {
      name: "赵美玲",
      role: "法务与合规专家",
      avatar: "/placeholder-user.jpg",
      bio: "北京大学法学博士，专注于数据保护法和AI法律法规研究。曾在知名律师事务所担任合伙人，为多家科技公司提供法律服务。",
      expertise: ["数据保护法", "AI法律法规", "合规管理", "知识产权"],
      achievements: ["执业律师12年", "参与制定AI行业标准", "数据保护法专家委员会成员"],
      contact: {
        email: "meiling.zhao@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/meiling-zhao",
      },
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
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors bg-gray-50 font-medium"
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
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">关于我们</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              我们是一群充满热情的志愿者，致力于用人工智能技术创造积极的社会影响，让科技真正服务于人类的福祉
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">我们的使命</h3>
                <p className="text-white/80 leading-relaxed">
                  通过AI技术推动社会创新，为家庭心理健康、教育公平、社会包容等领域提供智能化解决方案，让每个人都能受益于科技进步。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">我们的愿景</h3>
                <p className="text-white/80 leading-relaxed">
                  成为全球领先的AI向善平台，连接技术专家、心理学家、社会工作者等各界人士，共同构建一个更加智能、包容、温暖的社会。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">我们的价值观</h3>
                <p className="text-white/80 leading-relaxed">
                  坚持以人为本、开放协作、持续创新的原则，确保AI技术的发展始终服务于人类的根本利益和长远福祉。
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">核心团队</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">专业领域</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">主要成就</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {member.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2">
                            <Award className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-center gap-3">
                        <a
                          href={`mailto:${member.contact.email}`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="发送邮件"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        {member.contact.linkedin && (
                          <a
                            href={member.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.contact.github && (
                          <a
                            href={member.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                            title="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Join Us Section */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <Users className="w-20 h-20 text-blue-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-6">加入我们</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                我们正在寻找更多志同道合的伙伴，无论您是技术专家、心理学家、设计师还是对AI向善充满热情的任何人，
                都欢迎您加入我们的团队，一起用科技的力量让世界变得更美好。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleProtectedNavigation("/dashboard")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  成为志愿者
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "mailto:contact@westlakeaiforgood.com")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  联系我们
                </Button>
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
