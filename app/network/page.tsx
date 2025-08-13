"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Search, SortAsc, SortDesc, User, Heart, Lock, Trophy, Briefcase, Clock } from "lucide-react"

interface VolunteerProfile {
  id: string
  name: string
  gender: string
  uniqueId: string
  additionalInfo: string
  contactMethod: string
  currentAddress: string
  showAddress: boolean
  showContact: boolean
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
  avatar?: string
}

// 模拟当前用户权限状态
interface UserPermissions {
  isPsychologist: boolean
  isPromptEngineer: boolean
  badgeCount: number
  userType: "normal" | "privileged"
}

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "date">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerProfile | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  // 模拟当前用户权限 - 可以根据实际情况修改这些值来测试不同权限
  const currentUserPermissions: UserPermissions = {
    isPsychologist: false, // 设为 true 测试心理学家权限
    isPromptEngineer: false, // 设为 true 测试提示词工程师权限
    badgeCount: 1, // 设为 >= 1 测试有勋章用户权限
    userType: "normal", // 会根据上面的条件自动计算
  }

  // 检查用户是否有权限查看详情
  const hasViewPermission = () => {
    return (
      currentUserPermissions.isPsychologist ||
      currentUserPermissions.isPromptEngineer ||
      currentUserPermissions.badgeCount >= 1
    )
  }

  // Mock data for volunteers
  const volunteers: VolunteerProfile[] = [
    {
      id: "1",
      name: "Ethan",
      gender: "保密",
      uniqueId: "Ethanovum",
      additionalInfo: "ethan@example.com",
      contactMethod: "微信: ethan_tech",
      currentAddress: "杭州市西湖区",
      showAddress: true,
      showContact: true,
      selfIntro: "热爱技术，致力于用AI改善社会",
      professionalBackground:
        "计算机科学专业，5年AI开发经验，曾在多家科技公司担任算法工程师，专注于机器学习和深度学习技术的研发与应用。",
      skillsAndExperience: "机器学习、深度学习、自然语言处理、Python编程、TensorFlow、PyTorch框架开发",
      coreValues: "诚信、创新、社会责任。相信技术应该服务于人类，推动社会进步。坚持开源精神，乐于分享知识和经验。",
      participationMotivation:
        "希望通过技术帮助更多人解决心理健康问题，将AI技术与心理学结合，开发更智能、更人性化的心理健康工具。",
      connectionExpectations:
        "寻找志同道合的技术专家和心理学专业人士，希望能够与心理学家、产品经理、设计师等不同背景的专业人士合作。",
      skillsToShare: "Python编程、AI模型训练、数据分析、系统架构设计、开源项目管理",
      learningGoals: "深入了解心理学理论，提升跨学科合作能力，学习用户体验设计，了解心理健康领域的实际需求。",
      availableTime: ["周二下午", "周日下午", "周六上午"],
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "陈志明",
      gender: "男",
      uniqueId: "ChenZhiming",
      additionalInfo: "zhiming.chen@example.com",
      contactMethod: "电话: 138****8888",
      currentAddress: "北京市朝阳区",
      showAddress: true,
      showContact: false,
      selfIntro: "专业心理咨询师，专注家庭关系改善",
      professionalBackground:
        "心理学硕士，10年临床经验，国家二级心理咨询师，擅长家庭治疗、婚姻咨询、青少年心理问题处理。",
      skillsAndExperience: "家庭治疗、认知行为疗法、情感分析、心理测评、危机干预、团体心理辅导",
      coreValues: "同理心、专业性、保密原则。始终以来访者的福祉为中心，坚持专业伦理，保护来访者隐私。",
      participationMotivation: "将传统心理咨询与AI技术结合，扩大服务范围，让更多人能够获得专业的心理健康支持。",
      connectionExpectations: "与技术开发者合作，开发更好的心理健康工具，同时与其他心理学专家交流经验，提升服务质量。",
      skillsToShare: "心理评估、咨询技巧、案例分析、心理危机处理、专业督导",
      learningGoals: "学习AI在心理健康领域的应用，了解数字化心理服务的发展趋势，提升技术应用能力。",
      availableTime: ["周一上午", "周三下午", "周五晚上", "周日上午"],
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "金美丽",
      gender: "女",
      uniqueId: "JinMeili",
      additionalInfo: "meili.jin@example.com",
      contactMethod: "邮箱: meili.research@gmail.com",
      currentAddress: "上海市浦东新区",
      showAddress: false,
      showContact: true,
      selfIntro: "专注于行为模式分析和干预策略研究",
      professionalBackground: "应用心理学博士，研究行为分析8年，发表多篇SCI论文，主持过多项国家级科研项目。",
      skillsAndExperience: "行为分析、数据统计、研究方法设计、实验心理学、认知神经科学、学术论文写作",
      coreValues: "科学严谨、循证实践、持续学习。坚信科学研究应该服务于实践，推动心理学理论的应用转化。",
      participationMotivation: "推动心理学研究的数字化转型，将学术研究成果转化为实际应用，帮助更多人受益。",
      connectionExpectations: "寻找数据科学家和统计学专家合作，希望与产品开发团队合作，将研究成果产品化。",
      skillsToShare: "行为数据分析、实验设计、学术写作、统计分析、研究方法论",
      learningGoals: "掌握大数据分析技术和机器学习方法，学习产品开发流程，了解商业化运作模式。",
      availableTime: ["周二上午", "周四下午", "周六晚上"],
      joinDate: "2024-01-28",
    },
    {
      id: "4",
      name: "王大伟",
      gender: "男",
      uniqueId: "WangDawei",
      additionalInfo: "dawei.wang@example.com",
      contactMethod: "微信: wangdawei_pm",
      currentAddress: "深圳市南山区",
      showAddress: true,
      showContact: true,
      selfIntro: "互联网产品经理，关注用户体验和产品创新",
      professionalBackground: "工商管理硕士，6年产品管理经验，曾负责多款千万级用户产品的设计和运营。",
      skillsAndExperience: "产品设计、用户研究、项目管理、数据分析、A/B测试、敏捷开发",
      coreValues: "用户至上、数据驱动、团队协作。相信好的产品应该解决真实的用户问题，创造实际价值。",
      participationMotivation: "设计更人性化的心理健康产品，让技术真正服务于用户的心理健康需求。",
      connectionExpectations: "与心理学专家和技术团队协作，深入了解用户需求，打造有温度的产品。",
      skillsToShare: "产品规划、用户体验设计、市场分析、运营策略、团队管理",
      learningGoals: "了解心理健康领域的用户需求和痛点，学习心理学基础知识，提升产品的专业性。",
      availableTime: ["周六上午", "周日晚上", "周三晚上"],
      joinDate: "2024-03-05",
    },
    {
      id: "5",
      name: "李小红",
      gender: "女",
      uniqueId: "LiXiaohong",
      additionalInfo: "xiaohong.li@example.com",
      contactMethod: "QQ: 123456789",
      currentAddress: "成都市高新区",
      showAddress: true,
      showContact: false,
      selfIntro: "专注于创造温暖、易用的数字体验",
      professionalBackground: "视觉传达设计专业，4年设计经验，擅长UI/UX设计，曾为多家知名企业设计产品界面。",
      skillsAndExperience: "界面设计、用户体验、视觉设计、交互设计、原型制作、设计系统构建",
      coreValues: "美学追求、用户同理心、细节完美。相信设计的力量，通过设计传递温暖和关怀。",
      participationMotivation: "为心理健康应用设计更友好的界面，让用户在使用过程中感受到温暖和支持。",
      connectionExpectations: "与心理学专家合作，理解用户情感需求，设计出真正有帮助的产品界面。",
      skillsToShare: "设计思维、原型制作、视觉传达、用户体验优化、设计规范制定",
      learningGoals: "学习心理学在设计中的应用，了解色彩心理学，提升设计的心理学专业性。",
      availableTime: ["周一晚上", "周三上午", "周六下午", "周日上午"],
      joinDate: "2024-02-14",
    },
    {
      id: "6",
      name: "张建国",
      gender: "男",
      uniqueId: "ZhangJianguo",
      additionalInfo: "jianguo.zhang@example.com",
      contactMethod: "电话: 139****9999",
      currentAddress: "广州市天河区",
      showAddress: true,
      showContact: true,
      selfIntro: "用数据洞察人类行为，推动科学决策",
      professionalBackground: "统计学博士，专注大数据分析7年，在金融、医疗、教育等多个领域有丰富的数据分析经验。",
      skillsAndExperience: "数据挖掘、统计建模、机器学习、Python/R编程、数据可视化、商业智能",
      coreValues: "数据驱动、科学方法、客观分析。相信数据的力量，通过科学的方法发现规律，指导决策。",
      participationMotivation: "将数据科学应用于心理健康研究，通过数据分析发现心理健康规律，为干预提供科学依据。",
      connectionExpectations: "与心理学研究者合作进行数据分析，与产品团队合作开发数据驱动的心理健康产品。",
      skillsToShare: "统计分析、数据可视化、预测建模、A/B测试设计、数据库设计",
      learningGoals: "了解心理学研究方法和理论框架，学习心理测量学，提升跨学科合作能力。",
      availableTime: ["周二晚上", "周四上午", "周日上午", "周五下午"],
      joinDate: "2024-01-10",
    },
  ]

  // Search and filter logic
  const filteredAndSortedVolunteers = useMemo(() => {
    let filtered = volunteers

    // Search filter
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
          ...volunteer.availableTime,
        ]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(query)
      })
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name, "zh-CN")
      } else if (sortBy === "date") {
        comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [searchQuery, sortBy, sortOrder])

  const handleVolunteerClick = (volunteer: VolunteerProfile) => {
    if (hasViewPermission()) {
      setSelectedVolunteer(volunteer)
      setIsDialogOpen(true)
    } else {
      setShowPermissionDialog(true)
    }
  }

  const toggleSort = (newSortBy: "name" | "date") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortOrder("asc")
    }
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

        {/* Permission Status Banner */}
        {!hasViewPermission() && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              theme === "dark"
                ? "bg-amber-900/20 border-amber-700 text-amber-200"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="font-medium">权限提示：</span>
              <span>获得至少1个勋章或成为心理学家/提示词工程师后可查看志愿者详细信息</span>
            </div>
          </div>
        )}

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-400"}`}
            />
            <Input
              placeholder="搜索志愿者..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              }`}
            />
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => toggleSort("name")}
              className={`flex items-center gap-2 ${
                sortBy === "name"
                  ? "bg-[#397eff] text-white border-[#397eff]"
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                    : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {sortBy === "name" && sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
              按姓名
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleSort("date")}
              className={`flex items-center gap-2 ${
                sortBy === "date"
                  ? "bg-[#397eff] text-white border-[#397eff]"
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                    : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {sortBy === "date" && sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
              按加入时间
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
            找到 {filteredAndSortedVolunteers.length} 位志愿者
            {searchQuery && ` (搜索: "${searchQuery}")`}
          </p>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedVolunteers.map((volunteer) => (
            <Card
              key={volunteer.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg relative ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleVolunteerClick(volunteer)}
            >
              {/* Lock overlay for users without permission */}
              {!hasViewPermission() && (
                <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center z-10">
                  <Lock className={`w-6 h-6 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`text-lg mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {volunteer.name}
                    </CardTitle>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      @{volunteer.uniqueId}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className={`text-sm line-clamp-2 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    {volunteer.selfIntro}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      获得勋章:
                    </span>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <Trophy className="w-4 h-4 text-blue-500" />
                      <Trophy className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedVolunteers.length === 0 && (
          <div className="text-center py-12">
            <User className={`w-16 h-16 mx-auto mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`} />
            <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              未找到匹配的志愿者
            </h3>
            <p className={`${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>尝试调整搜索条件或清空搜索框</p>
          </div>
        )}

        {/* Permission Dialog */}
        <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
          <DialogContent
            className={`max-w-md animate-in fade-in-0 zoom-in-95 duration-200 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
          >
            <DialogHeader>
              <DialogTitle className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                权限不足
              </DialogTitle>
            </DialogHeader>

            <div className="text-center py-6">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-100"
                }`}
              >
                <Lock className={`w-8 h-8 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
              </div>

              <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                请做出贡献获得勋章，查看志愿者详情
              </h3>

              <p className={`text-sm mb-6 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                您需要满足以下条件之一才能查看志愿者详细信息：
              </p>

              <div
                className={`text-left space-y-2 mb-6 p-4 rounded-lg ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    获得至少1个勋章
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    成为认证心理学家
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" />
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    成为提示词工程师
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-[#004cd7] hover:bg-[#004cd7]/80 text-white"
                  onClick={() => {
                    setShowPermissionDialog(false)
                    // 这里可以跳转到相关页面
                  }}
                >
                  去获得勋章
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 ${
                    theme === "dark"
                      ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                      : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setShowPermissionDialog(false)}
                >
                  我知道了
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Volunteer Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className={`max-w-6xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200 ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            {selectedVolunteer && (
              <>
                <DialogHeader>
                  <DialogTitle className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    志愿者说明书
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                  {/* Profile Header */}
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {selectedVolunteer.name}
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      @{selectedVolunteer.uniqueId}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      智能向善社会创新网络志愿者
                    </Badge>
                  </div>

                  {/* 个人基础信息 */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#397eff]" />
                        个人基础信息
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span
                          className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                        >
                          姓名/昵称:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>{selectedVolunteer.name}</p>
                      </div>
                      <div>
                        <span
                          className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                        >
                          性别:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>{selectedVolunteer.gender}</p>
                      </div>
                      <div>
                        <span
                          className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                        >
                          唯一ID:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                          {selectedVolunteer.uniqueId}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                        >
                          电子邮箱或微信:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                          {selectedVolunteer.additionalInfo}
                        </p>
                      </div>
                      {selectedVolunteer.showContact && (
                        <div>
                          <span
                            className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                          >
                            联系方式:
                          </span>
                          <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                            {selectedVolunteer.contactMethod}
                          </p>
                        </div>
                      )}
                      {selectedVolunteer.showAddress && selectedVolunteer.currentAddress && (
                        <div>
                          <span
                            className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                          >
                            当前地址:
                          </span>
                          <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                            {selectedVolunteer.currentAddress}
                          </p>
                        </div>
                      )}
                      <div>
                        <span
                          className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                        >
                          加入时间:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                          {new Date(selectedVolunteer.joinDate).toLocaleDateString("zh-CN")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 自我介绍和专业背景 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-[#397eff]" />
                          一句话介绍自己
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.selfIntro}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-[#397eff]" />
                          专业背景介绍
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.professionalBackground}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 专业能力与贡献范围 */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#397eff]" />
                        专业能力与贡献范围
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          可以贡献的技能或经验
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.skillsAndExperience}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          专业技能分享
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.skillsToShare}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 价值观与期望连接 */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#397eff]" />
                        价值观与期望连接
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          核心价值观
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.coreValues}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          参与动机
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.participationMotivation}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          期望连接
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.connectionExpectations}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          学习目标
                        </h4>
                        <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                          {selectedVolunteer.learningGoals}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 可参与时间 */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#397eff]" />
                        可参与时间
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedVolunteer.availableTime.map((time, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
