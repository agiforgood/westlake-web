"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Search, Filter, ChevronDown, User, MapPin, Clock, Heart, Briefcase, Star, Calendar, Mail } from "lucide-react"

interface Volunteer {
  id: string
  name: string
  uniqueId: string
  gender: string
  location: string
  selfIntro: string
  professionalBackground: string
  skillsAndExperience: string
  coreValues: string
  participationMotivation: string
  connectionExpectations: string
  skillsToShare: string
  learningGoals: string
  contactMethod: string
  availableTime: string[]
  joinDate: string
  rating: number
  completedTasks: number
  specialties: string[]
  showAddress: boolean
}

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("joinDate")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  // 模拟志愿者数据
  const volunteers: Volunteer[] = [
    {
      id: "1",
      name: "陈志明",
      uniqueId: "chenzhiming",
      gender: "男",
      location: "北京市",
      selfIntro: "热爱心理学和AI技术的家庭教练，致力于帮助家庭建立更好的沟通关系",
      professionalBackground: "心理学硕士，从事家庭心理咨询工作5年",
      skillsAndExperience: "家庭关系咨询、情感支持、心理评估",
      coreValues: "诚信、专业、关爱、成长",
      participationMotivation: "希望通过AI技术帮助更多家庭解决心理问题",
      connectionExpectations: "寻找志同道合的心理学专家和技术人员",
      skillsToShare: "心理咨询技巧、家庭治疗方法",
      learningGoals: "学习最新的AI心理学应用技术",
      contactMethod: "微信: chenzhiming123",
      availableTime: ["周一下午", "周三晚上", "周六上午"],
      joinDate: "2024-01-15",
      rating: 4.8,
      completedTasks: 156,
      specialties: ["心理咨询", "家庭治疗", "情感支持"],
      showAddress: true,
    },
    {
      id: "2",
      name: "金美丽",
      uniqueId: "jinmeili",
      gender: "女",
      location: "上海市",
      selfIntro: "UI/UX设计师，专注于心理健康应用的用户体验设计",
      professionalBackground: "设计学学士，5年互联网产品设计经验",
      skillsAndExperience: "用户界面设计、用户体验研究、产品原型设计",
      coreValues: "创新、美学、用户至上、团队合作",
      participationMotivation: "希望通过设计让心理健康服务更加易用和温暖",
      connectionExpectations: "与心理学专家和开发者合作，创造更好的产品",
      skillsToShare: "设计思维、用户研究方法、视觉设计",
      learningGoals: "深入了解心理学理论，提升专业设计能力",
      contactMethod: "邮箱: jinmeili@example.com",
      availableTime: ["周二晚上", "周四下午", "周日上午"],
      joinDate: "2024-02-20",
      rating: 4.6,
      completedTasks: 89,
      specialties: ["UI设计", "UX研究", "产品设计"],
      showAddress: true,
    },
    {
      id: "3",
      name: "王大伟",
      uniqueId: "wangdawei",
      gender: "男",
      location: "深圳市",
      selfIntro: "全栈开发工程师，专注于AI和心理健康技术的结合",
      professionalBackground: "计算机科学硕士，8年软件开发经验",
      skillsAndExperience: "Python、React、机器学习、数据分析",
      coreValues: "技术创新、开源精神、持续学习、社会责任",
      participationMotivation: "用技术力量推动心理健康事业的发展",
      connectionExpectations: "与心理学专家合作，开发更智能的心理健康工具",
      skillsToShare: "编程技能、AI算法、系统架构设计",
      learningGoals: "学习心理学知识，提升跨领域合作能力",
      contactMethod: "GitHub: wangdawei-dev",
      availableTime: ["周一晚上", "周五下午", "周六晚上"],
      joinDate: "2024-01-10",
      rating: 4.9,
      completedTasks: 203,
      specialties: ["全栈开发", "机器学习", "数据分析"],
      showAddress: false,
    },
    {
      id: "4",
      name: "李小红",
      uniqueId: "lixiaohong",
      gender: "女",
      location: "广州市",
      selfIntro: "临床心理学博士，专注于儿童和青少年心理健康",
      professionalBackground: "临床心理学博士，10年儿童心理治疗经验",
      skillsAndExperience: "儿童心理评估、青少年心理治疗、家庭系统治疗",
      coreValues: "专业、耐心、关爱、科学",
      participationMotivation: "希望帮助更多儿童和家庭获得专业的心理支持",
      connectionExpectations: "与教育工作者和技术人员合作，创新治疗方法",
      skillsToShare: "儿童心理学理论、治疗技巧、案例分析",
      learningGoals: "学习数字化治疗工具的应用",
      contactMethod: "电话: 138-0000-0000",
      availableTime: ["周三下午", "周五上午", "周日下午"],
      joinDate: "2024-03-05",
      rating: 4.7,
      completedTasks: 67,
      specialties: ["儿童心理学", "青少年治疗", "家庭治疗"],
      showAddress: true,
    },
    {
      id: "5",
      name: "张建国",
      uniqueId: "zhangjianguo",
      gender: "男",
      location: "杭州市",
      selfIntro: "产品经理，致力于打造有温度的心理健康产品",
      professionalBackground: "工商管理硕士，6年产品管理经验",
      skillsAndExperience: "产品规划、需求分析、项目管理、用户调研",
      coreValues: "用户导向、数据驱动、团队协作、持续改进",
      participationMotivation: "通过产品思维推动心理健康服务的普及",
      connectionExpectations: "与心理学专家和技术团队合作，打造优秀产品",
      skillsToShare: "产品思维、项目管理、商业分析",
      learningGoals: "深入了解心理健康领域的专业知识",
      contactMethod: "微信: zhangjianguo_pm",
      availableTime: ["周二上午", "周四晚上", "周六下午"],
      joinDate: "2024-02-28",
      rating: 4.5,
      completedTasks: 92,
      specialties: ["产品管理", "项目管理", "商业分析"],
      showAddress: true,
    },
    {
      id: "6",
      name: "刘雅婷",
      uniqueId: "liuyating",
      gender: "女",
      location: "成都市",
      selfIntro: "心理学研究生，专注于积极心理学和幸福感研究",
      professionalBackground: "心理学硕士在读，2年心理咨询实习经验",
      skillsAndExperience: "积极心理学、幸福感测量、心理统计",
      coreValues: "积极向上、科学严谨、助人为乐、终身学习",
      participationMotivation: "希望将积极心理学理念传播给更多人",
      connectionExpectations: "与经验丰富的心理学家学习交流",
      skillsToShare: "积极心理学理论、研究方法、数据分析",
      learningGoals: "提升实践经验，学习新的治疗技术",
      contactMethod: "邮箱: liuyating@student.edu.cn",
      availableTime: ["周一上午", "周三晚上", "周日晚上"],
      joinDate: "2024-03-20",
      rating: 4.3,
      completedTasks: 34,
      specialties: ["积极心理学", "研究方法", "数据分析"],
      showAddress: false,
    },
  ]

  const sortOptions = [
    { value: "joinDate", label: "加入时间" },
    { value: "rating", label: "评分" },
    { value: "completedTasks", label: "完成任务数" },
    { value: "name", label: "姓名" },
  ]

  const filterOptions = [
    { value: "all", label: "全部" },
    { value: "psychology", label: "心理学专家" },
    { value: "technology", label: "技术专家" },
    { value: "design", label: "设计专家" },
    { value: "management", label: "管理专家" },
  ]

  const getFilteredAndSortedVolunteers = () => {
    const filtered = volunteers.filter((volunteer) => {
      const matchesSearch =
        volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.selfIntro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      if (filterBy === "all") return matchesSearch

      const categoryMap: { [key: string]: string[] } = {
        psychology: ["心理咨询", "心理学", "治疗", "咨询"],
        technology: ["开发", "技术", "编程", "AI", "机器学习"],
        design: ["设计", "UI", "UX", "产品设计"],
        management: ["管理", "产品", "项目"],
      }

      const keywords = categoryMap[filterBy] || []
      const matchesFilter = keywords.some(
        (keyword) =>
          volunteer.specialties.some((specialty) => specialty.includes(keyword)) ||
          volunteer.skillsAndExperience.includes(keyword),
      )

      return matchesSearch && matchesFilter
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "completedTasks":
          return b.completedTasks - a.completedTasks
        case "name":
          return a.name.localeCompare(b.name)
        case "joinDate":
        default:
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      }
    })
  }

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setIsDialogOpen(true)
  }

  const filteredVolunteers = getFilteredAndSortedVolunteers()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">志愿者网络</h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
              发现和连接智能向善社会创新网络的志愿者
            </p>
          </div>
          <HeaderButtons />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === "dark" ? "text-slate-400" : "text-gray-400"
              }`}
            />
            <Input
              placeholder="搜索志愿者姓名、技能或专长..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${
                theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-300 text-gray-900"
              }`}
            >
              <span className="text-sm">排序: {sortOptions.find((option) => option.value === sortBy)?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            {isSortOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 border ${
                  theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300"
                }`}
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value)
                        setIsSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortBy === option.value
                          ? "bg-[#397eff] text-white"
                          : theme === "dark"
                            ? "text-slate-300 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-300 text-gray-900"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">{filterOptions.find((option) => option.value === filterBy)?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {isFilterOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 border ${
                  theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300"
                }`}
              >
                <div className="py-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterBy(option.value)
                        setIsFilterOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        filterBy === option.value
                          ? "bg-[#397eff] text-white"
                          : theme === "dark"
                            ? "text-slate-300 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
            找到 {filteredVolunteers.length} 位志愿者
          </p>
        </div>

        {/* Volunteer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <Card
              key={volunteer.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleVolunteerClick(volunteer)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004cd7] to-[#397eff] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {volunteer.name}
                      </CardTitle>
                      <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        @{volunteer.uniqueId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {volunteer.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location */}
                {volunteer.showAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                    <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                      {volunteer.location}
                    </span>
                  </div>
                )}

                {/* Self Introduction */}
                <p className={`text-sm line-clamp-3 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                  {volunteer.selfIntro}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {volunteer.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`text-xs ${
                        theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {specialty}
                    </Badge>
                  ))}
                  {volunteer.specialties.length > 3 && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        theme === "dark" ? "border-slate-600 text-slate-400" : "border-gray-300 text-gray-600"
                      }`}
                    >
                      +{volunteer.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4 text-xs">
                    <span className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                      完成任务: {volunteer.completedTasks}
                    </span>
                    <span className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                      加入: {new Date(volunteer.joinDate).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVolunteers.length === 0 && (
          <div className="text-center py-12">
            <User className={`w-16 h-16 mx-auto mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`} />
            <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              未找到匹配的志愿者
            </h3>
            <p className={`${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>尝试调整搜索条件或筛选选项</p>
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
                  {/* Header */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#004cd7] to-[#397eff] flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {selectedVolunteer.name}
                    </h2>
                    <p className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      @{selectedVolunteer.uniqueId}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {selectedVolunteer.rating}
                        </span>
                      </div>
                      <span className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>•</span>
                      <span className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        完成 {selectedVolunteer.completedTasks} 个任务
                      </span>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${
                      theme === "dark" ? "bg-slate-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                      <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        性别: {selectedVolunteer.gender}
                      </span>
                    </div>
                    {selectedVolunteer.showAddress && (
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                        <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                          {selectedVolunteer.location}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                      <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        加入时间: {new Date(selectedVolunteer.joinDate).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`} />
                      <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        {selectedVolunteer.contactMethod}
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      专业领域
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVolunteer.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-[#397eff] text-white">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="space-y-6">
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <User className="w-5 h-5 text-[#397eff]" />
                        自我介绍
                      </h3>
                      <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        {selectedVolunteer.selfIntro}
                      </p>
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <Briefcase className="w-5 h-5 text-[#397eff]" />
                        专业背景
                      </h3>
                      <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        {selectedVolunteer.professionalBackground}
                      </p>
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <Star className="w-5 h-5 text-[#397eff]" />
                        技能与经验
                      </h3>
                      <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        {selectedVolunteer.skillsAndExperience}
                      </p>
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <Heart className="w-5 h-5 text-[#397eff]" />
                        核心价值观
                      </h3>
                      <p className={`${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                        {selectedVolunteer.coreValues}
                      </p>
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <Clock className="w-5 h-5 text-[#397eff]" />
                        可参与时间
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedVolunteer.availableTime.map((time, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={
                              theme === "dark" ? "border-slate-600 text-slate-300" : "border-gray-300 text-gray-700"
                            }
                          >
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
