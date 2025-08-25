"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Brain, TrendingUp, Star, Target } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "@/components/theme-provider"
import { HeaderButtons } from "@/components/header-buttons"

export default function Dashboard() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>智能向善社会创新网络数据概览</p>
          </div>
          {/* HeaderButtons */}
          <HeaderButtons />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                {t("dashboard.totalUsers")}
              </CardTitle>
              <Users className="h-4 w-4 text-[#397eff]" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>12,847</div>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {t("dashboard.monthlyGrowth")}
              </p>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                {t("dashboard.activePrompts")}
              </CardTitle>
              <Target className="h-4 w-4 text-[#397eff]" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>2,341</div>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {t("dashboard.weeklyGrowth")}
              </p>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                {t("dashboard.totalAnnotations")}
              </CardTitle>
              <Brain className="h-4 w-4 text-[#397eff]" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>45,692</div>
              <p className="text-xs text-blue-400 flex items-center gap-1">
                <Star className="h-3 w-3" />
                {t("dashboard.qualityScore")}
              </p>
            </CardContent>
          </Card>

          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                {t("dashboard.completedEvaluations")}
              </CardTitle>
              <Trophy className="h-4 w-4 text-[#397eff]" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>8,934</div>
              <p className="text-xs text-yellow-400 flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                {t("dashboard.weeklyCompleted")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Prompt Performers */}
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-2`}>
                <Trophy className="h-5 w-5 text-[#397eff]" />
                {t("dashboard.topPerformers")}
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                {t("dashboard.monthlyContributors")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-sm font-bold text-black">
                    1
                  </div>
                  <div>
                    <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {t("dashboard.contributor1Name")}
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      {t("dashboard.contributor1Role")}
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#004cd7] text-white">2,847 {t("dashboard.points")}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 flex items-center justify-center text-sm font-bold text-black">
                    2
                  </div>
                  <div>
                    <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {t("dashboard.contributor2Name")}
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      {t("dashboard.contributor2Role")}
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#397eff] text-white">2,156 {t("dashboard.points")}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {t("dashboard.contributor3Name")}
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      {t("dashboard.contributor3Role")}
                    </p>
                  </div>
                </div>
                <Badge className={theme === "dark" ? "bg-slate-700 text-white" : "bg-gray-300 text-gray-900"}>
                  1,923 {t("dashboard.points")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Psychology Annotation Stats */}
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-2`}>
                <Brain className="h-5 w-5 text-[#397eff]" />
                {t("dashboard.psychologyAnnotations")}
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                {t("dashboard.annotationCategories")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    {t("dashboard.emotionalAnalysis")}
                  </span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    18,456
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}>
                  <div className="bg-[#004cd7] h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    {t("dashboard.behaviorPatterns")}
                  </span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    15,234
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}>
                  <div className="bg-[#397eff] h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                    {t("dashboard.cognitiveAssessment")}
                  </span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    12,002
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}>
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}>
          <CardHeader>
            <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
              {t("dashboard.recentActivity")}
            </CardTitle>
            <CardDescription className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
              {t("dashboard.allModulesUpdates")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`flex items-center gap-4 p-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"}`}
              >
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {t("dashboard.activity1")}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    {t("dashboard.time1")}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 p-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"}`}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {t("dashboard.activity2")}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    {t("dashboard.time2")}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 p-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-100"}`}
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {t("dashboard.activity3")}
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    {t("dashboard.time3")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
