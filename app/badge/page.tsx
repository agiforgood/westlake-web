"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Trophy, Medal, Award, Star, Crown, Target, Zap, Heart, Code, Palette, Brain, Users } from "lucide-react"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: string
  earned: boolean
  earnedDate?: string
  condition: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export default function BadgePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  const categories = [
    { id: "all", name: "全部", count: 16 },
    { id: "design", name: "设计", count: 4 },
    { id: "development", name: "开发", count: 4 },
    { id: "prompt", name: "提示词工程师", count: 4 },
    { id: "psychology", name: "心理学专家", count: 4 },
  ]

  const badges: BadgeData[] = [
    // 设计类徽章
    {
      id: "design-1",
      name: "设计新手",
      description: "完成第一个设计任务",
      icon: Palette,
      category: "design",
      earned: true,
      earnedDate: "2024-01-15",
      condition: "完成第一个UI设计任务",
      rarity: "common",
    },
    {
      id: "design-2",
      name: "色彩大师",
      description: "创建10个不同配色方案",
      icon: Star,
      category: "design",
      earned: true,
      earnedDate: "2024-02-20",
      condition: "成功创建10个不同的配色方案",
      rarity: "rare",
    },
    {
      id: "design-3",
      name: "界面专家",
      description: "设计100个界面组件",
      icon: Award,
      category: "design",
      earned: false,
      condition: "设计并完成100个不同的界面组件",
      rarity: "epic",
    },
    {
      id: "design-4",
      name: "设计传奇",
      description: "获得1000个设计点赞",
      icon: Crown,
      category: "design",
      earned: false,
      condition: "设计作品累计获得1000个点赞",
      rarity: "legendary",
    },

    // 开发类徽章
    {
      id: "dev-1",
      name: "代码新手",
      description: "提交第一个代码",
      icon: Code,
      category: "development",
      earned: true,
      earnedDate: "2024-01-10",
      condition: "成功提交第一个代码提交",
      rarity: "common",
    },
    {
      id: "dev-2",
      name: "Bug终结者",
      description: "修复50个Bug",
      icon: Target,
      category: "development",
      earned: true,
      earnedDate: "2024-03-05",
      condition: "成功修复50个代码Bug",
      rarity: "rare",
    },
    {
      id: "dev-3",
      name: "架构师",
      description: "设计系统架构",
      icon: Trophy,
      category: "development",
      earned: false,
      condition: "独立设计并实现一个完整的系统架构",
      rarity: "epic",
    },
    {
      id: "dev-4",
      name: "开发传奇",
      description: "贡献10万行代码",
      icon: Crown,
      category: "development",
      earned: false,
      condition: "累计贡献100,000行高质量代码",
      rarity: "legendary",
    },

    // 提示词工程师徽章
    {
      id: "prompt-1",
      name: "提示词新手",
      description: "创建第一个提示词",
      icon: Zap,
      category: "prompt",
      earned: true,
      earnedDate: "2024-02-01",
      condition: "成功创建并测试第一个AI提示词",
      rarity: "common",
    },
    {
      id: "prompt-2",
      name: "效果优化师",
      description: "优化提示词效果",
      icon: Star,
      category: "prompt",
      earned: true,
      earnedDate: "2024-02-28",
      condition: "成功优化提示词，提升效果30%以上",
      rarity: "rare",
    },
    {
      id: "prompt-3",
      name: "提示词专家",
      description: "创建100个高质量提示词",
      icon: Medal,
      category: "prompt",
      earned: false,
      condition: "创建100个评分8分以上的提示词",
      rarity: "epic",
    },
    {
      id: "prompt-4",
      name: "AI大师",
      description: "提示词被采用1000次",
      icon: Crown,
      category: "prompt",
      earned: false,
      condition: "创建的提示词被其他用户采用1000次",
      rarity: "legendary",
    },

    // 心理学专家徽章
    {
      id: "psych-1",
      name: "心理学入门",
      description: "完成第一次心理评估",
      icon: Heart,
      category: "psychology",
      earned: true,
      earnedDate: "2024-01-20",
      condition: "完成第一次完整的心理健康评估",
      rarity: "common",
    },
    {
      id: "psych-2",
      name: "情感分析师",
      description: "分析100个情感案例",
      icon: Brain,
      category: "psychology",
      earned: true,
      earnedDate: "2024-03-10",
      condition: "成功分析100个不同的情感心理案例",
      rarity: "rare",
    },
    {
      id: "psych-3",
      name: "心理专家",
      description: "获得专业认证",
      icon: Award,
      category: "psychology",
      earned: false,
      condition: "通过平台心理学专业认证考试",
      rarity: "epic",
    },
    {
      id: "psych-4",
      name: "心理大师",
      description: "帮助1000个用户",
      icon: Users,
      category: "psychology",
      earned: false,
      condition: "成功帮助1000个用户解决心理问题",
      rarity: "legendary",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-500"
      case "rare":
        return "text-blue-500"
      case "epic":
        return "text-purple-500"
      case "legendary":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 dark:bg-slate-800"
      case "rare":
        return "bg-blue-100 dark:bg-slate-800"
      case "epic":
        return "bg-purple-100 dark:bg-slate-800"
      case "legendary":
        return "bg-yellow-100 dark:bg-slate-800"
      default:
        return "bg-gray-100 dark:bg-slate-800"
    }
  }

  const filteredBadges =
    selectedCategory === "all" ? badges : badges.filter((badge) => badge.category === selectedCategory)

  const earnedCount = badges.filter((badge) => badge.earned).length
  const totalCount = badges.length

  const handleBadgeClick = (badge: BadgeData) => {
    setSelectedBadge(badge)
    setIsDialogOpen(true)
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">徽章收藏</h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>展示您在平台上获得的成就和荣誉</p>
          </div>
          <HeaderButtons />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#397eff]">已获得徽章</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{earnedCount}</div>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                共 {totalCount} 个徽章
              </p>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#397eff]">完成度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Math.round((earnedCount / totalCount) * 100)}%</div>
              <div className={`w-full rounded-full h-2 mt-2 ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`}>
                <div
                  className="bg-[#397eff] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(earnedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#397eff]">最近获得</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">Bug终结者</div>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>2024年3月5日</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-[#397eff] text-white hover:bg-[#397eff]/90"
                    : theme === "dark"
                      ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                      : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    selectedCategory === category.id
                      ? "bg-white/20 text-white"
                      : theme === "dark"
                        ? "bg-slate-700 text-slate-300"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map((badge) => {
            const IconComponent = badge.icon
            return (
              <Card
                key={badge.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  badge.earned
                    ? theme === "dark"
                      ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                      : "bg-white border-gray-200 hover:border-gray-300"
                    : theme === "dark"
                      ? "bg-slate-800/50 border-slate-700/50 opacity-60"
                      : "bg-white/50 border-gray-200/50 opacity-60"
                }`}
                onClick={() => handleBadgeClick(badge)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      badge.earned
                        ? theme === "dark"
                          ? "bg-slate-700"
                          : getRarityBg(badge.rarity).split(" ")[0] // 只取浅色模式的背景色
                        : theme === "dark"
                          ? "bg-slate-700"
                          : "bg-gray-200"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${
                        badge.earned
                          ? getRarityColor(badge.rarity)
                          : theme === "dark"
                            ? "text-slate-500"
                            : "text-gray-400"
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-semibold mb-2 ${
                      badge.earned
                        ? theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : theme === "dark"
                          ? "text-slate-500"
                          : "text-gray-400"
                    }`}
                  >
                    {badge.name}
                  </h3>

                  <p
                    className={`text-sm mb-3 ${
                      badge.earned
                        ? theme === "dark"
                          ? "text-slate-400"
                          : "text-gray-600"
                        : theme === "dark"
                          ? "text-slate-600"
                          : "text-gray-400"
                    }`}
                  >
                    {badge.description}
                  </p>

                  {badge.earned && badge.earnedDate && (
                    <Badge variant="secondary" className="text-xs">
                      {new Date(badge.earnedDate).toLocaleDateString("zh-CN")}
                    </Badge>
                  )}

                  {!badge.earned && (
                    <Badge variant="outline" className="text-xs opacity-60">
                      未获得
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Badge Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className={`max-w-md ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
          >
            {selectedBadge && (
              <>
                <DialogHeader>
                  <DialogTitle className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    徽章详情
                  </DialogTitle>
                </DialogHeader>

                <div className="text-center py-6">
                  <div
                    className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      selectedBadge.earned
                        ? theme === "dark"
                          ? "bg-slate-700"
                          : getRarityBg(selectedBadge.rarity).split(" ")[0]
                        : theme === "dark"
                          ? "bg-slate-700"
                          : "bg-gray-200"
                    }`}
                  >
                    <selectedBadge.icon
                      className={`w-12 h-12 ${
                        selectedBadge.earned
                          ? getRarityColor(selectedBadge.rarity)
                          : theme === "dark"
                            ? "text-slate-500"
                            : "text-gray-400"
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      selectedBadge.earned
                        ? theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : theme === "dark"
                          ? "text-slate-500"
                          : "text-gray-400"
                    }`}
                  >
                    {selectedBadge.name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${
                      selectedBadge.earned
                        ? theme === "dark"
                          ? "text-slate-400"
                          : "text-gray-600"
                        : theme === "dark"
                          ? "text-slate-600"
                          : "text-gray-400"
                    }`}
                  >
                    {selectedBadge.description}
                  </p>

                  <div className={`p-4 rounded-lg mb-4 ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"}`}>
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      获得条件
                    </h4>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      {selectedBadge.condition}
                    </p>
                  </div>

                  {selectedBadge.earned && selectedBadge.earnedDate && (
                    <div className={`p-4 rounded-lg ${getRarityBg(selectedBadge.rarity)}`}>
                      <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        获得时间
                      </h4>
                      <p className={`text-sm ${getRarityColor(selectedBadge.rarity)}`}>
                        {new Date(selectedBadge.earnedDate).toLocaleDateString("zh-CN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {!selectedBadge.earned && (
                    <Badge variant="outline" className="mt-4">
                      尚未获得此徽章
                    </Badge>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
