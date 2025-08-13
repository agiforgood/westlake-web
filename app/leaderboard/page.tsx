"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Trophy, Medal, Award, Star, Filter, ChevronDown } from "lucide-react"
import { HeaderButtons } from "@/components/header-buttons"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

export default function LeaderboardPage() {
  // Remove this line entirely since we don't need tab state anymore
  const [selectedModel, setSelectedModel] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { theme } = useTheme()
  const { t } = useLanguage()

  const modelOptions = [
    { value: "all", label: "所有模型" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5", label: "GPT-3.5 Turbo" },
    { value: "claude-3", label: "Claude-3" },
    { value: "deepseek-v3", label: "DeepSeek-V3" },
    { value: "gemini-pro", label: "Gemini Pro" },
  ]

  const promptEngineeringLeaderboard = [
    { rank: 1, name: "陈志明", score: 2847, badge: "🏆", change: "+12", model: "gpt-4" },
    { rank: 2, name: "金美丽", score: 2756, badge: "🥈", change: "+8", model: "claude-3" },
    { rank: 3, name: "王大伟", score: 2689, badge: "🥉", change: "-2", model: "deepseek-v3" },
    { rank: 4, name: "李小红", score: 2634, badge: "⭐", change: "+15", model: "gpt-4" },
    { rank: 5, name: "张建国", score: 2598, badge: "⭐", change: "+5", model: "gemini-pro" },
    { rank: 6, name: "刘雅婷", score: 2567, badge: "⭐", change: "-1", model: "gpt-3.5" },
    { rank: 7, name: "赵文华", score: 2534, badge: "⭐", change: "+3", model: "claude-3" },
    { rank: 8, name: "孙丽娜", score: 2498, badge: "⭐", change: "+7", model: "deepseek-v3" },
  ]

  const getFilteredLeaderboard = () => {
    const baseLeaderboard = promptEngineeringLeaderboard
    if (selectedModel === "all") return baseLeaderboard
    return baseLeaderboard.filter((participant) => participant.model === selectedModel)
  }

  const currentLeaderboard = getFilteredLeaderboard()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <div className="sidebar-margin p-8 px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("leaderboard.title")}</h1>
            <p className={theme === "dark" ? "text-slate-400" : "text-gray-600"}>{t("leaderboard.topPerformers")}</p>
          </div>
          <HeaderButtons />
        </div>

        {/* Tab Navigation and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className={`flex gap-8 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
            <div className={`pb-4 px-2 font-medium text-[#397eff] border-b-2 border-[#397eff]`}>
              {t("leaderboard.promptEngineering")}
            </div>
          </div>

          {/* Model filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 border-gray-300 text-gray-900"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">{modelOptions.find((option) => option.value === selectedModel)?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {isFilterOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${
                  theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300"
                } border`}
              >
                <div className="py-1">
                  {modelOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedModel(option.value)
                        setIsFilterOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedModel === option.value
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl border ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>总参与者</span>
            </div>
            <div className="text-2xl font-bold">1,247</div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Medal className="w-5 h-5 text-[#397eff]" />
              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>本周活跃</span>
            </div>
            <div className="text-2xl font-bold">892</div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>最高分</span>
            </div>
            <div className="text-2xl font-bold">2,847</div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-green-500" />
              <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>平均分</span>
            </div>
            <div className="text-2xl font-bold">1,834</div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div
          className={`rounded-xl border overflow-hidden ${
            theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
          }`}
        >
          <div className={`p-6 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">提示词工程 排名</h2>
              {selectedModel !== "all" && (
                <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                  筛选条件:{" "}
                  <span className="text-[#397eff] font-medium">
                    {modelOptions.find((option) => option.value === selectedModel)?.label}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === "dark" ? "bg-slate-700" : "bg-gray-100"}>
                <tr>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    排名
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    参与者
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    分数
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    模型
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    徽章
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    变化
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === "dark" ? "divide-slate-700" : "divide-gray-200"}`}>
                {currentLeaderboard.map((participant, index) => (
                  <tr
                    key={`${participant.name}-${index}`}
                    className={`transition-colors ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg font-bold ${
                            index + 1 === 1
                              ? "text-yellow-500"
                              : index + 1 === 2
                                ? "text-gray-500"
                                : index + 1 === 3
                                  ? "text-amber-600"
                                  : theme === "dark"
                                    ? "text-slate-400"
                                    : "text-gray-600"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{participant.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#397eff] font-semibold">{participant.score.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {participant.model}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl">{participant.badge}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          participant.change.startsWith("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {participant.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
