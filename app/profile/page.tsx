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

  const [formData, setFormData] = useState({
    name: "Ethan",
    gender: "保密",
    uniqueId: "Ethanovum",
    email: "ethan@example.com", // 改为邮箱示例
    address: "",
    phone:"",
    showAddress: true, // 改为默认打钩
    showContact: true, // 新增联系方式公开显示选项
    showAdditionalInfo: true, // 新增电子邮箱或微信公开显示选项，默认打钩
    intro: "未填写",
    professionalBackground: "未填写",
    contributions: "未填写",
    skills:"未填写",
    coreValues: "未填写",
    participationMotivation: "未填写",
    connectionExpectations: "未填写",
    learningGoals: "未填写",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center cursor-pointer">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#397eff] rounded-full flex items-center justify-center text-white hover:bg-[#397eff]/80">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
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
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                      <Select
                        disabled={!isEditing}
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange("gender", value)}
                      >
                        <SelectTrigger
                          className={
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-900"
                          }
                        >
                          <SelectValue />
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
                        value={formData.uniqueId}
                        onChange={(e) => handleInputChange("uniqueId", e.target.value)}
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
                        电子邮箱 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="showAdditionalInfo"
                          disabled={!isEditing}
                          checked={formData.showAdditionalInfo}
                          onChange={(e) => setFormData((prev) => ({ ...prev, showAdditionalInfo: e.target.checked }))}
                          className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                        />
                        <label
                          htmlFor="showAdditionalInfo"
                          className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}
                        >
                          公开显示电子邮箱或微信
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        联系方式 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="showContact"
                          disabled={!isEditing}
                          checked={formData.showContact}
                          onChange={(e) => setFormData((prev) => ({ ...prev, showContact: e.target.checked }))}
                          className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                        />
                        <label
                          htmlFor="showContact"
                          className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}
                        >
                          公开显示联系方式
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        当前地址
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        disabled={!isEditing}
                        className={
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        }
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="showAddress"
                          disabled={!isEditing}
                          checked={formData.showAddress}
                          onChange={(e) => setFormData((prev) => ({ ...prev, showAddress: e.target.checked }))}
                          className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                        />
                        <label
                          htmlFor="showAddress"
                          className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}
                        >
                          公开显示地址
                        </label>
                      </div>
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
                        value={formData.intro}
                        onChange={(e) => handleInputChange("intro", e.target.value)}
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
                        value={formData.professionalBackground}
                        onChange={(e) => handleInputChange("professionalBackground", e.target.value)}
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
                      我可以做出的贡献 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.contributions}
                      onChange={(e) => handleInputChange("contributions", e.target.value)}
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
                      我的专业技能
                    </label>
                    <Textarea
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
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
                      我的核心价值观 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.coreValues}
                      onChange={(e) => handleInputChange("coreValues", e.target.value)}
                      disabled={!isEditing}
                      placeholder="我的价值观，法律法规意识，道德价值观念，社会责任感"
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
                      我想要参与智能向善社会创新网络的原因
                    </label>
                    <Textarea
                      value={formData.participationMotivation}
                      onChange={(e) => handleInputChange("participationMotivation", e.target.value)}
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
                      我希望得到什么样的支持 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.connectionExpectations}
                      onChange={(e) => handleInputChange("connectionExpectations", e.target.value)}
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
                      value={formData.learningGoals}
                      onChange={(e) => handleInputChange("learningGoals", e.target.value)}
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
                    可参与时间
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      可参与时间 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day) => (
                        <div key={day} className="flex items-center gap-4">
                          <span
                            className={`w-12 text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {day}
                          </span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                disabled={!isEditing}
                                className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                              />
                              <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                                上午
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                disabled={!isEditing}
                                className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                              />
                              <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                                下午
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                disabled={!isEditing}
                                className="w-4 h-4 text-[#397eff] bg-gray-100 border-gray-300 rounded focus:ring-[#397eff] focus:ring-2"
                              />
                              <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                                晚上
                              </span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
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
