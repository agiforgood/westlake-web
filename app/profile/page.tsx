"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Edit, User, Clock, Heart, Briefcase } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  const profileData = {
    name: "Ethan",
    gender: "保密",
    uniqueId: "Ethanovum",
    additionalInfo: "未填写",
    contactMethod: "未填写",
    currentAddress: "",
    selfIntro: "未填写",
    professionalBackground: "未填写",
    skillsAndExperience: "未填写",
    coreValues: "未填写",
    participationMotivation: "未填写",
    connectionExpectations: "未填写",
    skillsToShare: "未填写",
    learningGoals: "未填写",
    availableTime: "周日下午 周二下午",
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <div className="sidebar-margin">
        <div className="flex">
          {/* Left Sidebar Navigation */}

          {/* Main Content */}
          <div className="flex-1 p-8 py-6 px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">志愿者说明书</h1>
                <p className={` ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                  智能向善社会创新网络志愿者个人信息
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!isEditing) {
                      toast.info("进入编辑模式，完成点击保存更改")
                    }
                    setIsEditing(!isEditing)
                  }}
                  className={`${
                    theme === "dark"
                      ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                      : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  编辑
                </Button>
                <HeaderButtons />
              </div>
            </div>

            {/* Profile Content - All sections in one page */}
            <div className="max-w-4xl space-y-12">
              {/* Profile Avatar Section */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">志愿者说明书</h2>
                <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>欢迎来到智能问答社会创新网络</p>
              </div>

              {/* 个人基础信息 Section */}
              <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#397eff]" />
                    个人基础信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        姓名/昵称/希望被称呼的名字 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={profileData.name}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        性别 <span className="text-red-500">*</span>
                      </label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger
                          className={
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-900"
                          }
                        >
                          <SelectValue placeholder={profileData.gender} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男</SelectItem>
                          <SelectItem value="female">女</SelectItem>
                          <SelectItem value="private">保密</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        唯一ID <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={profileData.uniqueId}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        其余信息 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={profileData.additionalInfo}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        联系方式 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={profileData.contactMethod}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        当前地址
                      </label>
                      <Input
                        value={profileData.currentAddress}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>
                  </div>

                  {/* Long form fields */}
                  <div className="space-y-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        一句话介绍自己 <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        value={profileData.selfIntro}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        我的专业背景介绍
                      </label>
                      <Textarea
                        value={profileData.professionalBackground}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 专业能力与贡献范围 Section */}
              <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#397eff]" />
                    专业能力与贡献范围
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      我可以贡献给大家的技能或经验的事情
                    </label>
                    <Textarea
                      value={profileData.skillsAndExperience}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      我的专业技能或者，我的技能也很棒好
                    </label>
                    <Textarea
                      value={profileData.skillsToShare}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 价值观与期望连接 Section */}
              <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#397eff]" />
                    价值观与期望连接
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      我能够或者的核心价值观 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={profileData.coreValues}
                      disabled={!isEditing}
                      placeholder="我的价值观，法律法规意识，道德价值观念，社会责任感，市场价值观/商业道德观，游戏规则"
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      除了基础心理健康外，我还想要在在我们这个社会创新网络
                    </label>
                    <Textarea
                      value={profileData.participationMotivation}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      我对什么样的人或智能问答网络技术的支持 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={profileData.connectionExpectations}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      我的思想和灵感的来源
                    </label>
                    <Textarea
                      value={profileData.learningGoals}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 联系信息和可享与时间 Section */}
              <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#397eff]" />
                    联系信息和可享与时间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      可享与时间
                    </label>
                    <Input
                      value={profileData.availableTime}
                      disabled={!isEditing}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6">
                  <Button
                    className="bg-[#004cd7] hover:bg-[#004cd7]/80 text-white"
                    onClick={() => {
                      setIsEditing(false)
                      toast.success("已成功保存")
                    }}
                  >
                    保存更改
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      toast.warning("取消更改")
                    }}
                    className={
                      theme === "dark"
                        ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                    }
                  >
                    取消
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
