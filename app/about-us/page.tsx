"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, Mail, Linkedin, Github, Award, Heart, Users } from "lucide-react"

export default function AboutUsPage() {
  const volunteers = [
    {
      id: 1,
      name: "张明博士",
      role: "项目发起人 & AI研究专家",
      avatar: "/placeholder-user.jpg",
      bio: "西湖大学人工智能研究院教授，专注于AI伦理和社会应用研究。拥有15年AI领域研究经验，发表论文100余篇。",
      expertise: ["人工智能", "机器学习", "AI伦理", "社会计算"],
      achievements: ["IEEE Fellow", "国家杰青", "CCF杰出科学家"],
      contact: {
        email: "zhang.ming@westlake.edu.cn",
        linkedin: "zhang-ming-ai",
        github: "zhangming-ai",
      },
    },
    {
      id: 2,
      name: "李心怡教授",
      role: "心理学顾问 & 平台设计师",
      avatar: "/placeholder-user.jpg",
      bio: "北京师范大学心理学院教授，儿童发展心理学专家。致力于将心理学理论应用于数字化心理健康服务。",
      expertise: ["发展心理学", "儿童心理", "心理测评", "数字心理健康"],
      achievements: ["教育部长江学者", "中国心理学会理事", "国际儿童发展学会会员"],
      contact: {
        email: "li.xinyi@bnu.edu.cn",
        linkedin: "li-xinyi-psychology",
      },
    },
    {
      id: 3,
      name: "王志强",
      role: "技术架构师 & 全栈开发",
      avatar: "/placeholder-user.jpg",
      bio: "前阿里巴巴高级技术专家，拥有10年大规模系统架构经验。现专注于公益技术项目，用技术改变世界。",
      expertise: ["系统架构", "云计算", "大数据", "前端开发"],
      achievements: ["阿里云MVP", "开源贡献者", "技术博客作者"],
      contact: {
        email: "wang.zhiqiang@example.com",
        github: "wangzhiqiang-dev",
        linkedin: "wang-zhiqiang-tech",
      },
    },
    {
      id: 4,
      name: "陈美玲",
      role: "产品经理 & 用户体验设计师",
      avatar: "/placeholder-user.jpg",
      bio: "前腾讯产品经理，专注于社交产品和用户体验设计。热衷于用设计思维解决社会问题，创造有温度的产品。",
      expertise: ["产品设计", "用户体验", "交互设计", "用户研究"],
      achievements: ["红点设计奖", "iF设计奖", "中国设计红星奖"],
      contact: {
        email: "chen.meiling@example.com",
        linkedin: "chen-meiling-ux",
      },
    },
    {
      id: 5,
      name: "刘建华博士",
      role: "数据科学家 & 算法工程师",
      avatar: "/placeholder-user.jpg",
      bio: "清华大学计算机系博士，专注于自然语言处理和推荐系统。曾在Google、微软等公司担任高级算法工程师。",
      expertise: ["自然语言处理", "推荐系统", "深度学习", "数据挖掘"],
      achievements: ["ACL最佳论文奖", "KDD Cup冠军", "专利发明人"],
      contact: {
        email: "liu.jianhua@example.com",
        github: "liujianhua-ai",
        linkedin: "liu-jianhua-data",
      },
    },
    {
      id: 6,
      name: "赵雅琪",
      role: "社区运营 & 志愿者协调员",
      avatar: "/placeholder-user.jpg",
      bio: "资深社区运营专家，曾负责多个大型开源项目的社区建设。擅长志愿者招募、培训和激励机制设计。",
      expertise: ["社区运营", "志愿者管理", "活动策划", "内容运营"],
      achievements: ["最佳社区运营奖", "志愿服务先进个人", "公益项目优秀组织者"],
      contact: {
        email: "zhao.yaqi@example.com",
        linkedin: "zhao-yaqi-community",
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
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <span className="text-xl font-semibold text-white">智能向善</span>
        </Link>
        <Link href="/">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">我们是谁</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              智能向善社会创新网络由一群充满热情的志愿者组成，我们来自不同的专业背景，
              但都怀着同一个目标：用AI技术创造更美好的世界
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-12">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">我们的使命</h3>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                通过构建专业志愿者网络，将前沿AI技术与社会公益需求相结合，
                创造性地解决社会问题，让每个人都能从技术进步中受益。
                我们相信，当技术与善意相遇，就能创造出改变世界的力量。
              </p>
            </CardContent>
          </Card>

          {/* Team Members */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">核心团队成员</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteers.map((volunteer) => (
                <Card key={volunteer.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={volunteer.avatar || "/placeholder.svg"}
                        alt={volunteer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{volunteer.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{volunteer.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{volunteer.bio}</p>

                    {/* Expertise */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">专业领域</h4>
                      <div className="flex flex-wrap gap-2">
                        {volunteer.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">主要成就</h4>
                      <div className="space-y-1">
                        {volunteer.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Award className="w-3 h-3 text-yellow-600" />
                            <span className="text-xs text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-center gap-3">
                        {volunteer.contact.email && (
                          <Button size="sm" variant="outline" className="p-2 bg-transparent">
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                        {volunteer.contact.linkedin && (
                          <Button size="sm" variant="outline" className="p-2 bg-transparent">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {volunteer.contact.github && (
                          <Button size="sm" variant="outline" className="p-2 bg-transparent">
                            <Github className="w-4 h-4" />
                          </Button>
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
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">加入我们</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                我们正在寻找更多志同道合的伙伴加入我们的团队。无论您是AI专家、心理学家、
                设计师、开发者，还是对公益事业充满热情的任何人，我们都欢迎您的加入。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Heart className="w-4 h-4 mr-2" />
                    成为志愿者
                  </Button>
                </Link>
                <Link href="/tutorial">
                  <Button variant="outline">了解更多</Button>
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
