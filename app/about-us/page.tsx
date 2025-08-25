"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Linkedin, Github, Users, Heart, Target, ArrowRight } from "lucide-react"

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "张明华",
      role: "项目创始人 & 技术总监",
      avatar: "/placeholder-user.jpg",
      bio: "计算机科学博士，专注于AI伦理和社会影响研究。曾在多家知名科技公司担任技术领导职务，致力于推动AI技术的社会化应用。",
      expertise: ["AI伦理", "机器学习", "社会创新"],
      achievements: ["发表AI伦理相关论文20余篇", "获得国家科技进步奖二等奖", "TEDx演讲者，主题《AI向善的未来》"],
      contact: {
        email: "minghua.zhang@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/minghua-zhang",
        github: "https://github.com/minghua-zhang",
      },
    },
    {
      name: "李心怡",
      role: "心理学专家 & 产品负责人",
      avatar: "/placeholder-user.jpg",
      bio: "临床心理学博士，国家二级心理咨询师。在心理健康领域有15年从业经验，专注于AI辅助心理治疗的研究与应用。",
      expertise: ["临床心理学", "心理评估", "AI心理学"],
      achievements: ["主持国家自然科学基金项目3项", "出版心理学专著《数字时代的心理健康》", "培训心理咨询师超过500名"],
      contact: {
        email: "xinyi.li@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/xinyi-li",
      },
    },
    {
      name: "王建国",
      role: "数据科学家 & 算法专家",
      avatar: "/placeholder-user.jpg",
      bio: "统计学博士，前Google研究科学家。在自然语言处理和机器学习领域有深厚造诣，专注于开发公平、透明的AI算法。",
      expertise: ["自然语言处理", "机器学习", "算法公平性"],
      achievements: ["在顶级会议发表论文30余篇", "获得ACM杰出论文奖", "开源项目FairNLP获得5000+ stars"],
      contact: {
        email: "jianguo.wang@westlakeaiforgood.com",
        github: "https://github.com/jianguo-wang",
      },
    },
    {
      name: "陈雅婷",
      role: "社区运营总监",
      avatar: "/placeholder-user.jpg",
      bio: "社会学硕士，拥有丰富的非营利组织管理经验。曾在联合国儿童基金会工作5年，专注于志愿者网络建设和社区发展。",
      expertise: ["社区建设", "志愿者管理", "社会影响评估"],
      achievements: ["建立志愿者网络覆盖全国50个城市", "组织公益活动惠及10万+人群", "获得中国青年志愿者优秀组织者奖"],
      contact: {
        email: "yating.chen@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/yating-chen",
      },
    },
    {
      name: "刘德华",
      role: "产品设计师 & 用户体验专家",
      avatar: "/placeholder-user.jpg",
      bio: "交互设计硕士，前阿里巴巴资深设计师。专注于无障碍设计和包容性产品开发，致力于让技术惠及每一个人。",
      expertise: ["用户体验设计", "无障碍设计", "产品策略"],
      achievements: [
        "设计作品获得红点设计奖",
        "主导设计的产品服务用户超过1000万",
        "无障碍设计倡导者，推动行业标准制定",
      ],
      contact: {
        email: "dehua.liu@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/dehua-liu",
      },
    },
    {
      name: "赵小芳",
      role: "法律顾问 & 合规专家",
      avatar: "/placeholder-user.jpg",
      bio: "法学博士，专注于数据保护和AI法律法规研究。曾在知名律师事务所担任合伙人，为多家科技公司提供合规咨询服务。",
      expertise: ["数据保护法", "AI法律法规", "企业合规"],
      achievements: ["参与起草《个人信息保护法》实施细则", "为100+企业提供AI合规咨询", "出版《AI时代的法律挑战》专著"],
      contact: {
        email: "xiaofang.zhao@westlakeaiforgood.com",
        linkedin: "https://linkedin.com/in/xiaofang-zhao",
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
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">关于我们</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              我们是一群充满热情的志愿者，致力于推动AI技术向善发展，让人工智能更好地服务于社会和人类福祉
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">我们的使命</h3>
                    <p className="text-white/80 text-sm">
                      通过志愿者网络和开放协作，推动AI技术的伦理发展，确保人工智能造福全人类
                    </p>
                  </div>
                  <div>
                    <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">我们的愿景</h3>
                    <p className="text-white/80 text-sm">
                      建设一个AI技术与人文关怀相结合的未来，让每个人都能从智能技术的发展中受益
                    </p>
                  </div>
                  <div>
                    <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">我们的价值观</h3>
                    <p className="text-white/80 text-sm">
                      开放、包容、协作、创新，坚持以人为本的技术发展理念，促进社会公平与进步
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">核心团队</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center">
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
                      <div className="flex flex-wrap gap-2">
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
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      {member.contact.email && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="w-3 h-3 mr-1" />
                          邮箱
                        </Button>
                      )}
                      {member.contact.linkedin && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Linkedin className="w-3 h-3 mr-1" />
                          LinkedIn
                        </Button>
                      )}
                      {member.contact.github && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Github className="w-3 h-3 mr-1" />
                          GitHub
                        </Button>
                      )}
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">加入我们</h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                我们正在寻找更多志同道合的伙伴加入我们的团队。无论您是技术专家、心理学家、设计师还是对AI向善事业充满热情的志愿者，
                我们都欢迎您的参与。让我们一起为构建更美好的AI未来而努力！
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                    <Users className="w-4 h-4 mr-2" />
                    成为志愿者
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/network">
                  <Button variant="outline" className="px-8 bg-transparent">
                    <Heart className="w-4 h-4 mr-2" />
                    了解更多志愿者
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
