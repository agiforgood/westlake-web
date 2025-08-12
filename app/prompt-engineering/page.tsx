"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { Play, Save, Copy, DollarSign, FolderOpen, Calendar } from "lucide-react"

import { HeaderButtons } from "@/components/header-buttons"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

export default function PromptEngineering() {
  const [activeTab, setActiveTab] = useState("workspace")
  const [promptTitle, setPromptTitle] = useState("")
  const [promptContent, setPromptContent] = useState("")
  const [selectedModel, setSelectedModel] = useState("deepseek-v3")
  const [maxRounds, setMaxRounds] = useState(20)
  const { theme } = useTheme()
  const { t } = useLanguage()

  const samplePrompts = [
    {
      id: 1,
      title: "吃饭饭",
      subtitle: "付多少佛挡杀佛是",
      date: "8/12/2025",
      category: "家庭指导",
    },
    {
      id: 2,
      title: "情感支持",
      subtitle: "家庭关系改善指导",
      date: "8/11/2025",
      category: "情感支持",
    },
    {
      id: 3,
      title: "亲子沟通",
      subtitle: "建立健康的亲子关系",
      date: "8/10/2025",
      category: "亲子关系",
    },
  ]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("prompt.title")}
            </h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
              {t("prompt.description")}
            </p>
          </div>

          <HeaderButtons />
        </div>

        {/* Tabs */}
        <div className={`flex gap-8 mb-8 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
          <button
            onClick={() => setActiveTab("workspace")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "workspace"
                ? "text-[#397eff] border-b-2 border-[#397eff]"
                : theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t("prompt.workspace")}
          </button>
          <button
            onClick={() => setActiveTab("management")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "management"
                ? "text-[#397eff] border-b-2 border-[#397eff]"
                : theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t("prompt.promptManagement")}
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "results"
                ? "text-[#397eff] border-b-2 border-[#397eff]"
                : theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t("prompt.evaluationResults")}
          </button>
        </div>

        {/* Content */}
        <div className="max-w-full">
          {activeTab === "workspace" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Prompt Creation */}
              <div className="lg:col-span-2 space-y-6">
                {/* Prompt Content */}
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>{t("prompt.promptContent")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="在此输入您的AI家庭心理教练提示词。专注于为家庭关系改善、情感支持和心理健康提供全面指导..."
                      value={promptContent}
                      onChange={(e) => setPromptContent(e.target.value)}
                      className={`min-h-[300px] resize-none ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }`}
                    />
                  </CardContent>
                </Card>

                {/* Prompt Title */}
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>提示词标题</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      placeholder="输入提示词标题..."
                      value={promptTitle}
                      onChange={(e) => setPromptTitle(e.target.value)}
                      className={
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Configuration & Info */}
              <div className="space-y-6">
                {/* Evaluation Criteria */}
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>评估维度说明</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#397eff] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>准确性</p>
                          <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                            精确的语言表达，全面收集家庭动态信息，提供针对性解决方案。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#397eff] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            目标一致性
                          </p>
                          <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                            明确目标和实用工作重点，理解家庭成员需求并提供清晰指导。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#397eff] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>共情</p>
                          <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                            准确理解家庭情感并提供适当的情感支持和指导。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#397eff] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>信息整合</p>
                          <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                            全面分析家庭动态，有效支持系统和安全考虑。
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#397eff] mt-2 flex-shrink-0"></div>
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>合作性</p>
                          <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                            有效沟通和协作关系，促进家庭发展。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`pt-4 border-t ${theme === "dark" ? "border-slate-600" : "border-gray-200"}`}>
                      <Button
                        variant="outline"
                        className={`w-full border-[#397eff] text-[#397eff] hover:bg-[#397eff] hover:text-white ${
                          theme === "dark" ? "bg-transparent" : "bg-transparent"
                        }`}
                      >
                        查看详细评分指南
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Parameter Configuration */}
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>参数配置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Response Rounds */}
                    <div>
                      <label className={`text-sm mb-2 block ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        对话轮次（最大20轮）
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={maxRounds}
                          onChange={(e) => setMaxRounds(Number.parseInt(e.target.value) || 20)}
                          min="1"
                          max="20"
                          className={
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-900"
                          }
                        />
                        <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>轮</span>
                      </div>
                    </div>

                    {/* Model Selection */}
                    <div>
                      <label className={`text-sm mb-2 block ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        模型选择
                      </label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger
                          className={
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-900"
                          }
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300"}
                        >
                          <SelectItem value="deepseek-v3">deepseek-v3</SelectItem>
                          <SelectItem value="claude-sonnet-4">claude-sonnet-4</SelectItem>
                          <SelectItem value="gemini-2.5">gemini-2.5</SelectItem>
                          <SelectItem value="qwen-max">qwen-max</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        后端支持：Claude-sonnet-4、Gemini 2.5系列、qwen-max、deepseek-v3
                      </p>
                    </div>

                    {/* Current Model Info */}
                    <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                          模型：
                        </span>
                        <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {selectedModel}
                        </span>
                      </div>
                      <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        DeepSeek V3模型，增强推理能力优秀
                      </p>
                    </div>

                    {/* Cost Information */}
                    <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-[#397eff]" />
                        <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                          估算费用
                        </span>
                        <Button variant="link" className="text-[#397eff] p-0 h-auto text-xs">
                          查看详情
                        </Button>
                      </div>

                      <div className="text-2xl font-bold text-[#397eff] mb-2">¥ 0.11</div>

                      <div className={`space-y-1 text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        <div className="flex justify-between">
                          <span>输入token：</span>
                          <span>0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>对话轮次：</span>
                          <span>{maxRounds} 轮</span>
                        </div>
                        <div className="flex justify-between">
                          <span>模型：</span>
                          <span>{selectedModel}</span>
                        </div>
                      </div>

                      <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
                        * 实际费用可能因token使用量而有所不同
                      </p>
                    </div>

                    {/* Generate Button */}
                    <Button className="w-full bg-[#004cd7] hover:bg-[#004cd7]/80 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      生成对话
                    </Button>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className={`flex-1 bg-transparent ${
                          theme === "dark"
                            ? "border-slate-600 text-slate-400 hover:text-white"
                            : "border-gray-300 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        保存
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 bg-transparent ${
                          theme === "dark"
                            ? "border-slate-600 text-slate-400 hover:text-white"
                            : "border-gray-300 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        复制
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "management" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    提示词管理
                  </h2>
                  <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>管理和组织您保存的提示词</p>
                </div>
                <Button className="bg-[#004cd7] hover:bg-[#004cd7]/80 text-white">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  创建新提示词
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {samplePrompts.map((prompt) => (
                  <Card
                    key={prompt.id}
                    className={`cursor-pointer transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {prompt.title}
                          </h3>
                          <p className={`text-sm mb-3 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            {prompt.subtitle}
                          </p>
                          <div
                            className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}
                          >
                            <Calendar className="w-3 h-3" />
                            <span>{prompt.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {prompt.category}
                        </span>
                        <Button size="sm" className="bg-[#397eff] hover:bg-[#397eff]/80 text-white text-xs">
                          加载此提示词
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty state for more prompts */}
              <Card
                className={`border-dashed ${theme === "dark" ? "bg-slate-800 border-slate-600" : "bg-white border-gray-200"}`}
              >
                <CardContent className="p-12 text-center">
                  <FolderOpen
                    className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`}
                  />
                  <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    暂无更多提示词
                  </h3>
                  <p className={`mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
                    创建您的第一个提示词开始使用
                  </p>
                  <Button
                    variant="outline"
                    className={`bg-transparent ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-400 hover:text-white"
                        : "border-gray-300 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    创建新提示词
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "results" && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  评估结果
                </h2>
                <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>查看和分析您的提示词评估结果</p>
              </div>

              <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}>
                <CardContent className="p-12 text-center">
                  <div className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                      }`}
                    >
                      <Play className={`w-8 h-8 ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">暂无评估结果</h3>
                    <p className={`mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
                      运行一些提示词以查看评估结果
                    </p>
                    <Button
                      onClick={() => setActiveTab("workspace")}
                      className="bg-[#004cd7] hover:bg-[#004cd7]/80 text-white"
                    >
                      前往工作台
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
