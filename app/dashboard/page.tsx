"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AvatarDropdown } from "@/components/avatar-dropdown"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import {
  Users,
  Trophy,
  TrendingUp,
  Brain,
  UserCheck,
  Award,
  Network,
  Calendar,
  MessageSquare,
  Star,
  ArrowUpRight,
  Activity,
  Clock,
  Target,
} from "lucide-react"

export default function DashboardPage() {
  const { theme } = useTheme()
  const { t } = useLanguage()

  const stats = [
    {
      title: "总积分",
      value: "2,847",
      change: "+12%",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "完成任务",
      value: "156",
      change: "+8%",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "网络连接",
      value: "89",
      change: "+23%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "活跃度",
      value: "94%",
      change: "+5%",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "task",
      title: "完成了心理评估任务",
      description: "为青少年心理健康项目提供专业评估",
      time: "2小时前",
      points: "+50",
      icon: UserCheck,
    },
    {
      id: 2,
      type: "connection",
      title: "与李明建立了连接",
      description: "AI研究专家，专注于教育应用",
      time: "4小时前",
      points: "+10",
      icon: Users,
    },
    {
      id: 3,
      type: "achievement",
      title: "获得了提示工程师徽章",
      description: "在提示工程领域表现优秀",
      time: "1天前",
      points: "+100",
      icon: Award,
    },
    {
      id: 4,
      type: "task",
      title: "参与了AI伦理讨论",
      description: "为AI向善项目贡献观点",
      time: "2天前",
      points: "+30",
      icon: MessageSquare,
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "心理健康评估",
      description: "为留守儿童心理健康项目提供专业评估",
      deadline: "明天",
      priority: "高",
      points: 80,
    },
    {
      id: 2,
      title: "AI教育内容审核",
      description: "审核AI生成的教育内容质量",
      deadline: "3天后",
      priority: "中",
      points: 50,
    },
    {
      id: 3,
      title: "社区讨论主持",
      description: "主持关于AI伦理的社区讨论",
      deadline: "1周后",
      priority: "中",
      points: 60,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-100 text-red-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "低":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"}`}>
      <Sidebar />
      <div className="sidebar-margin">
        <Navbar />
        <div className="pt-16">
          {/* Header */}
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  欢迎回来，John
                </h1>
                <p className={`text-lg ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                  今天是创造积极影响的好日子
                </p>
              </div>
              <AvatarDropdown />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            {stat.title}
                          </p>
                          <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {stat.value}
                          </p>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-slate-700" : stat.bgColor}`}>
                          <Icon className={`w-6 h-6 ${theme === "dark" ? "text-slate-300" : stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : ""}`}>
                      <Activity className="w-5 h-5" />
                      最近活动
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-slate-400" : ""}>
                      您最近的贡献和成就
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => {
                        const Icon = activity.icon
                        return (
                          <div
                            key={activity.id}
                            className={`flex items-start gap-4 p-4 rounded-lg border ${
                              theme === "dark" ? "bg-slate-700/50 border-slate-600" : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-full ${theme === "dark" ? "bg-slate-600" : "bg-white"} shadow-sm`}
                            >
                              <Icon className={`w-4 h-4 ${theme === "dark" ? "text-slate-300" : "text-gray-600"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  {activity.title}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.points}
                                  </Badge>
                                </div>
                              </div>
                              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                                {activity.description}
                              </p>
                              <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-gray-500"} mt-1`}>
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Tasks */}
              <div>
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : ""}`}>
                      <Clock className="w-5 h-5" />
                      待完成任务
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-slate-400" : ""}>
                      即将到期的任务
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border ${
                            theme === "dark" ? "bg-slate-700/50 border-slate-600" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {task.title}
                            </h4>
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                          </div>
                          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"} mb-3`}>
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                                {task.deadline}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              +{task.points}分
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      查看所有任务
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className={`mt-6 ${theme === "dark" ? "bg-slate-800 border-slate-700" : ""}`}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>快速操作</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2 bg-transparent">
                        <Brain className="w-5 h-5" />
                        <span className="text-xs">提示工程</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2 bg-transparent">
                        <UserCheck className="w-5 h-5" />
                        <span className="text-xs">心理评估</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2 bg-transparent">
                        <Network className="w-5 h-5" />
                        <span className="text-xs">志愿者网络</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2 bg-transparent">
                        <Star className="w-5 h-5" />
                        <span className="text-xs">我的徽章</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
