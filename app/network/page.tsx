"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Search, Filter, User, MapPin, Clock, Heart, Briefcase, Calendar } from "lucide-react"

interface Volunteer {
  id: string
  name: string
  gender: string
  uniqueId: string
  additionalInfo: string
  contactMethod: string
  currentAddress: string
  selfIntro: string
  professionalBackground: string
  skillsAndExperience: string
  coreValues: string
  participationMotivation: string
  connectionExpectations: string
  skillsToShare: string
  learningGoals: string
  availableTime: string[]
  joinDate: string
  showAddress: boolean
  avatar?: string
}

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("joinDate")
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  // 示例志愿者数据
  const volunteers: Volunteer[] = [
    {
      id: "1",
      name: "陈志明",
      gender: "男",
      uniqueId: "chenzhiming",
      additionalInfo: "心理学博士，专注家庭治疗",
      contactMethod: "微信: czm_psychology",
      currentAddress: "北京市海淀区",
      selfIntro: "专业心理咨询师，致力于家庭关系改善和心理健康教育",
      professionalBackground: "北京师范大学心理学博士，10年临床心理咨询经验",
      skillsAndExperience: "家庭治疗、认知行为疗法、情感咨询",
      coreValues: "以人为本，科学严谨，助人自助",
      participationMotivation: "希望通过AI技术扩大心理健康服务的覆盖面",
      connectionExpectations: "寻找志同道合的心理健康从业者和技术专家",
      skillsToShare: "心理评估、治疗方案设计、专业培训",
      learningGoals: "学习AI在心理健康领域的应用",
      availableTime: ["周二下午", "周四上午", "周六全天"],
      joinDate: "2024-01-15",
      showAddress: true,
    },
    {
      id: "2",
      name: "李小红",
      gender: "女",
      uniqueId: "lixiaohong",
      additionalInfo: "UI/UX设计师，关注用户体验",
      contactMethod: "邮箱: lixiaohong@design.com",
      currentAddress: "上海市浦东新区",
      selfIntro: "资深设计师，专注于创造有温度的数字产品",
      professionalBackground: "中央美术学院设计学硕士，8年互联网产品设计经验",
      skillsAndExperience: "用户研究、界面设计、交互设计、设计系统",
      coreValues: "用户至上，简约美学，可持续设计",
      participationMotivation: "希望用设计的力量让心理健康服务更易获得",
      connectionExpectations: "与心理学专家合作，设计更好的用户体验",
      skillsToShare: "产品设计、用户体验优化、视觉设计",
      learningGoals: "了解心理学原理在设计中的应用",
      availableTime: ["周一晚上", "周三下午", "周日上午"],
      joinDate: "2024-02-20",
      showAddress: false,
    },
    {
      id: "3",
      name: "王大伟",
      gender: "男",
      uniqueId: "wangdawei",
      additionalInfo: "全栈开发工程师，AI技术爱好者",
      contactMethod: "GitHub: wangdawei-dev",
      currentAddress: "深圳市南山区",
      selfIntro: "技术驱动的产品开发者，相信技术可以改变世界",
      professionalBackground: "清华大学计算机科学硕士，5年AI产品开发经验",
      skillsAndExperience: "机器学习、自然语言处理、Web开发、数据分析",
      coreValues: "开源精神，技术创新，社会责任",
      participationMotivation: "用AI技术解决心理健康领域的实际问题",
      connectionExpectations: "与心理学专家和设计师协作开发AI产品",
      skillsToShare: "AI模型开发、系统架构设计、技术培训",
      learningGoals: "深入理解心理学理论和实践",
      availableTime: ["周一晚上", "周五下午", "周六下午"],
      joinDate: "2024-01-10",
      showAddress: true,
    },
    {
      id: "4",
      name: "张美丽",
      gender: "女",
      uniqueId: "zhangmeili",
      additionalInfo: "社会工作者，社区心理健康推广者",
      contactMethod: "电话: 138****5678",
      currentAddress: "广州市天河区",
      selfIntro: "致力于社区心理健康服务，关爱每一个需要帮助的人",
      professionalBackground: "中山大学社会工作硕士，6年社区服务经验",
      skillsAndExperience: "社区组织、心理健康宣传、危机干预、团体辅导",
      coreValues: "平等互助，社会公正，人文关怀",
      participationMotivation: "希望通过网络平台扩大社区心理健康服务影响力",
      connectionExpectations: "与专业心理咨询师和技术开发者合作",
      skillsToShare: "社区动员、活动组织、心理健康宣传",
      learningGoals: "学习数字化心理健康服务模式",
      availableTime: ["周三上午", "周五晚上", "周日下午"],
      joinDate: "2024-03-05",
      showAddress: true,
    },
    {
      id: "5",
      name: "刘建明",
      gender: "男",
      uniqueId: "liujianming",
      additionalInfo: "数据科学家，心理测量专家",
      contactMethod: "LinkedIn: liu-jianming",
      currentAddress: "杭州市西湖区",
      selfIntro: "用数据洞察人心，用科学方法改善心理健康",
      professionalBackground: "浙江大学统计学博士，专注心理测量和数据分析",
      skillsAndExperience: "心理测量、数据挖掘、统计分析、量表开发",
      coreValues: "科学严谨，数据驱动，循证实践",
      participationMotivation: "开发更准确的心理健康评估工具",
      connectionExpectations: "与心理学研究者和AI工程师深度合作",
      skillsToShare: "数据分析、心理测量、研究方法",
      learningGoals: "探索AI在心理测量中的创新应用",
      availableTime: ["周二上午", "周四下午", "周六上午"],
      joinDate: "2024-02-28",
      showAddress: false,
    },
    {
      id: "6",
      name: "赵文华",
      gender: "女",
      uniqueId: "zhaowenhua",
      additionalInfo: "教育工作者，青少年心理健康关注者",
      contactMethod: "微信: zhao_educator",
      currentAddress: "成都市锦江区",
      selfIntro: "关注青少年心理健康，致力于教育创新",
      professionalBackground: "华东师范大学教育心理学硕士，12年教育工作经验",
      skillsAndExperience: "青少年心理辅导、教育咨询、课程设计、家长指导",
      coreValues: "教育公平，全人发展，终身学习",
      participationMotivation: "为青少年心理健康教育贡献专业力量",
      connectionExpectations: "与心理健康专家和技术团队合作开发教育产品",
      skillsToShare: "教育心理学、青少年辅导、课程开发",
      learningGoals: "学习数字化心理健康教育方法",
      availableTime: ["周一下午", "周三晚上", "周日上午"],
      joinDate: "2024-01-25",
      showAddress: true,
    },
  ]

  // 搜索和排序逻辑
  const filteredAndSortedVolunteers = useMemo(() => {
    let filtered = volunteers

    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = volunteers.filter((volunteer) => {
        const searchableText = [
          volunteer.name,
          volunteer.uniqueId,
          volunteer.additionalInfo,
          volunteer.selfIntro,
          volunteer.professionalBackground,
          volunteer.skillsAndExperience,
          volunteer.coreValues,
          volunteer.participationMotivation,
          volunteer.connectionExpectations,
          volunteer.skillsToShare,
          volunteer.learningGoals,
          volunteer.currentAddress,
          volunteer.availableTime.join(" "),
        ]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(query)
      })
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "joinDate":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        case "location":
          return a.currentAddress.localeCompare(b.currentAddress)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, sortBy])

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setIsDialogOpen(true)
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">志愿者网络</h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
              发现和连接智能向善社会创新网络的志愿者们
            </p>
          </div>
          <HeaderButtons />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索志愿者姓名、技能、背景、价值观..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className={`w-40 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joinDate">加入时间</SelectItem>
                <SelectItem value="name">姓名</SelectItem>
                <SelectItem value="location">地区</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-[#397eff]" />
                <div>
                  <p className="text-2xl font-bold">{volunteers.length}</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>总志愿者</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#397eff]" />
                <div>
                  <p className="text-2xl font-bold">
                    {new Set(volunteers.map((v) => v.currentAddress.split("市")[0])).size}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>覆盖城市</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#397eff]" />
                <div>
                  <p className="text-2xl font-bold">{filteredAndSortedVolunteers.length}</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>搜索结果</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedVolunteers.map((volunteer) => (
            <Card
              key={volunteer.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleVolunteerClick(volunteer)}
            >
              <CardContent className="p-6">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {volunteer.name}
                    </h3>
                    <p className={`text-sm mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      @{volunteer.uniqueId}
                    </p>
                    {volunteer.showAddress && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {volunteer.currentAddress}
                      </div>
                    )}
                  </div>
                </div>

                {/* Self Introduction */}
                <p className={`text-sm mb-4 line-clamp-2 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                  {volunteer.selfIntro}
                </p>

                {/* Additional Info */}
                <p className={`text-xs mb-4 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                  {volunteer.additionalInfo}
                </p>

                {/* Skills Preview */}
                <div className="mb-4">
                  <p className={`text-xs font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    专业技能
                  </p>
                  <p className={`text-sm line-clamp-2 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    {volunteer.skillsAndExperience}
                  </p>
                </div>

                {/* Available Time */}
                <div className="mb-4">
                  <p className={`text-xs font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    可参与时间
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {volunteer.availableTime.slice(0, 2).map((time, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={`text-xs ${
                          theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {time}
                      </Badge>
                    ))}
                    {volunteer.availableTime.length > 2 && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        +{volunteer.availableTime.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    加入于 {new Date(volunteer.joinDate).toLocaleDateString("zh-CN")}
                  </div>
                  <Button size="sm" className="bg-[#397eff] hover:bg-[#397eff]/80 text-white text-xs">
                    查看详情
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedVolunteers.length === 0 && (
          <div className="text-center py-12">
            <User className={`w-16 h-16 mx-auto mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`} />
            <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              未找到匹配的志愿者
            </h3>
            <p className={`${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>尝试调整搜索条件或清空搜索框</p>
          </div>
        )}

        {/* Volunteer Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className={`max-w-4xl max-h-[80vh] overflow-y-auto ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            {selectedVolunteer && (
              <>
                <DialogHeader>
                  <DialogTitle className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    志愿者详情
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="text-center pb-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {selectedVolunteer.name}
                    </h2>
                    <p className={`text-lg mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      @{selectedVolunteer.uniqueId}
                    </p>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.additionalInfo}
                    </p>
                  </div>

                  {/* Contact and Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        <User className="w-5 h-5 text-[#397eff]" />
                        基本信息
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            性别
                          </p>
                          <p className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {selectedVolunteer.gender}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            联系方式
                          </p>
                          <p className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {selectedVolunteer.contactMethod}
                          </p>
                        </div>
                        {selectedVolunteer.showAddress && (
                          <div>
                            <p
                              className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}
                            >
                              当前地址
                            </p>
                            <p className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {selectedVolunteer.currentAddress}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            加入时间
                          </p>
                          <p className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {new Date(selectedVolunteer.joinDate).toLocaleDateString("zh-CN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        <Clock className="w-5 h-5 text-[#397eff]" />
                        可参与时间
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedVolunteer.availableTime.map((time, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={`${
                              theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Self Introduction */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      自我介绍
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.selfIntro}
                    </p>
                  </div>

                  {/* Professional Background */}
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      <Briefcase className="w-5 h-5 text-[#397eff]" />
                      专业背景
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.professionalBackground}
                    </p>
                  </div>

                  {/* Skills and Experience */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      技能与经验
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.skillsAndExperience}
                    </p>
                  </div>

                  {/* Core Values */}
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      <Heart className="w-5 h-5 text-[#397eff]" />
                      核心价值观
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.coreValues}
                    </p>
                  </div>

                  {/* Participation Motivation */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      参与动机
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.participationMotivation}
                    </p>
                  </div>

                  {/* Connection Expectations */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      期望连接
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.connectionExpectations}
                    </p>
                  </div>

                  {/* Skills to Share */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      可分享技能
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.skillsToShare}
                    </p>
                  </div>

                  {/* Learning Goals */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      学习目标
                    </h3>
                    <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {selectedVolunteer.learningGoals}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
