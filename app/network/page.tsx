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
import { Search, SortAsc, SortDesc, User, Heart, Lock, Trophy } from "lucide-react"

interface VolunteerProfile {
  id: string
  name: string
  gender: string
  uniqueId: string
  additionalInfo: string
  contactMethod: string
  currentAddress: string
  showAddress: boolean
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
      additionalInfo: "AI研究爱好者",
      contactMethod: "ethan@example.com",
      currentAddress: "杭州市西湖区",
      showAddress: true,
      selfIntro: "热爱技术，致力于用AI改善社会",
      professionalBackground: "计算机科学专业，5年AI开发经验",
      skillsAndExperience: "机器学习、深度学习、自然语言处理",
      coreValues: "诚信、创新、社会责任",
      participationMotivation: "希望通过技术帮助更多人解决心理健康问题",
      connectionExpectations: "寻找志同道合的技术专家和心理学专业人士",
      skillsToShare: "Python编程、AI模型训练、数据分析",
      learningGoals: "深入了解心理学理论，提升跨学科合作能力",
      availableTime: ["周二下午", "周日下午"],
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "陈志明",
      gender: "男",
      uniqueId: "ChenZhiming",
      additionalInfo: "家庭心理教练",
      contactMethod: "zhiming.chen@example.com",
      currentAddress: "北京市朝阳区",
      showAddress: true,
      selfIntro: "专业心理咨询师，专注家庭关系改善",
      professionalBackground: "心理学硕士，10年临床经验",
      skillsAndExperience: "家庭治疗、认知行为疗法、情感分析",
      coreValues: "同理心、专业性、保密原则",
      participationMotivation: "将传统心理咨询与AI技术结合，扩大服务范围",
      connectionExpectations: "与技术开发者合作，开发更好的心理健康工具",
      skillsToShare: "心理评估、咨询技巧、案例分析",
      learningGoals: "学习AI在心理健康领域的应用",
      availableTime: ["周一上午", "周三下午", "周五晚上"],
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "金美丽",
      gender: "女",
      uniqueId: "JinMeili",
      additionalInfo: "行为分析专家",
      contactMethod: "meili.jin@example.com",
      currentAddress: "上海市浦东新区",
      showAddress: false,
      selfIntro: "专注于行为模式分析和干预策略研究",
      professionalBackground: "应用心理学博士，研究行为分析8年",
      skillsAndExperience: "行为分析、数据统计、研究方法设计",
      coreValues: "科学严谨、循证实践、持续学习",
      participationMotivation: "推动心理学研究的数字化转型",
      connectionExpectations: "寻找数据科学家和统计学专家合作",
      skillsToShare: "行为数据分析、实验设计、学术写作",
      learningGoals: "掌握大数据分析技术和机器学习方法",
      availableTime: ["周二上午", "周四下午"],
      joinDate: "2024-01-28",
    },
    {
      id: "4",
      name: "王大伟",
      gender: "男",
      uniqueId: "WangDawei",
      additionalInfo: "产品经理",
      contactMethod: "dawei.wang@example.com",
      currentAddress: "深圳市南山区",
      showAddress: true,
      selfIntro: "互联网产品经理，关注用户体验和产品创新",
      professionalBackground: "工商管理硕士，6年产品管理经验",
      skillsAndExperience: "产品设计、用户研究、项目管理",
      coreValues: "用户至上、数据驱动、团队协作",
      participationMotivation: "设计更人性化的心理健康产品",
      connectionExpectations: "与心理学专家和技术团队协作",
      skillsToShare: "产品规划、用户体验设计、市场分析",
      learningGoals: "了解心理健康领域的用户需求和痛点",
      availableTime: ["周六上午", "周日晚上"],
      joinDate: "2024-03-05",
    },
    {
      id: "5",
      name: "李小红",
      gender: "女",
      uniqueId: "LiXiaohong",
      additionalInfo: "UI/UX设计师",
      contactMethod: "xiaohong.li@example.com",
      currentAddress: "成都市高新区",
      showAddress: true,
      selfIntro: "专注于创造温暖、易用的数字体验",
      professionalBackground: "视觉传达设计专业，4年设计经验",
      skillsAndExperience: "界面设计、用户体验、视觉设计",
      coreValues: "美学追求、用户同理心、细节完美",
      participationMotivation: "为心理健康应用设计更友好的界面",
      connectionExpectations: "与心理学专家合作，理解用户情感需求",
      skillsToShare: "设计思维、原型制作、视觉传达",
      learningGoals: "学习心理学在设计中的应用",
      availableTime: ["周一晚上", "周三上午", "周六下午"],
      joinDate: "2024-02-14",
    },
    {
      id: "6",
      name: "张建国",
      gender: "男",
      uniqueId: "ZhangJianguo",
      additionalInfo: "数据科学家",
      contactMethod: "jianguo.zhang@example.com",
      currentAddress: "广州市天河区",
      showAddress: true,
      selfIntro: "用数据洞察人类行为，推动科学决策",
      professionalBackground: "统计学博士，专注大数据分析7年",
      skillsAndExperience: "数据挖掘、统计建模、机器学习",
      coreValues: "数据驱动、科学方法、客观分析",
      participationMotivation: "将数据科学应用于心理健康研究",
      connectionExpectations: "与心理学研究者合作进行数据分析",
      skillsToShare: "统计分析、数据可视化、预测建模",
      learningGoals: "了解心理学研究方法和理论框架",
      availableTime: ["周二晚上", "周四上午", "周日上午"],
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
                    <Badge variant="secondary" className="text-xs">
                      3个
                    </Badge>
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
            className={`max-w-4xl max-h-[80vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200 ${
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
                      {selectedVolunteer.additionalInfo}
                    </Badge>
                  </div>

                  {/* Basic Info */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#397eff]" />
                        基本信息
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          联系方式:
                        </span>
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                          {selectedVolunteer.contactMethod}
                        </p>
                      </div>
                      {selectedVolunteer.showAddress && selectedVolunteer.currentAddress && (
                        <div>
                          <span
                            className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
                          >
                            地址:
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

                  {/* Self Introduction */}
                  <Card className={theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#397eff]" />
                        自我介绍
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
                        {selectedVolunteer.selfIntro}
                      </p>
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
