"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { HeaderButtons } from "@/components/header-buttons"
import type { Locale } from "@/lib/i18n"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

export default function PsychologistEvaluation({ params }: { params: { locale: Locale } }) {
  const [activeTab, setActiveTab] = useState("dialogue")
  const { theme } = useTheme()
  const { t } = useLanguage()

  // Generate evaluation entries
  const evaluationEntries = Array.from({ length: 24 }, (_, i) => ({
    id: 24 - i,
    progress: i === 16 ? 1 : 0, // Entry 17 has 1/5 progress, others have 0/5
    total: 5,
    status: "pending",
  }))

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      {/* Main Content */}
      <div className="sidebar-margin p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">心理学家评估</h1>
            <p className={`${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>管理和跟踪心理评估会话</p>
          </div>

          <HeaderButtons />
        </div>

        {/* Navigation Tabs */}
        <div className={`flex gap-8 mb-8 border-b ${theme === "dark" ? "border-slate-800" : "border-gray-200"}`}>
          <button
            onClick={() => setActiveTab("dialogue")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "dialogue"
                ? "text-[#397eff] border-b-2 border-[#397eff]"
                : theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            对话
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "records"
                ? "text-[#397eff] border-b-2 border-[#397eff]"
                : theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            评估记录
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {activeTab === "dialogue" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">对话列表</h2>

              <div className="space-y-4">
                {evaluationEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          theme === "dark" ? "bg-slate-800" : "bg-gray-100"
                        }`}
                      >
                        <span className="text-lg font-bold text-[#397eff]">{entry.id}</span>
                      </div>
                      <div>
                        <h3 className={`font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          评估会话 #{entry.id}
                        </h3>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                          完成进度: {entry.progress}/{entry.total} 个维度
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-sm mb-1 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                          状态
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                            {entry.progress === 0 ? "未开始" : "进行中"}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`bg-transparent ${
                          theme === "dark"
                            ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">评估记录</h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold mb-2 text-[#397eff]">总会话数</h3>
                  <p className="text-3xl font-bold mb-1">24</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>活跃评估</p>
                </div>

                <div
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold mb-2 text-[#397eff]">已完成</h3>
                  <p className="text-3xl font-bold mb-1">0</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>完全完成</p>
                </div>

                <div
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold mb-2 text-[#397eff]">进行中</h3>
                  <p className="text-3xl font-bold mb-1">1</p>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>部分完成</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">最近活动</h3>
                <div className="space-y-3">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#397eff]"></div>
                    <span className="text-sm">会话 #17 进度更新：已完成 1/5 个维度</span>
                    <span className={`text-xs ml-auto ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      2小时前
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-slate-600" : "bg-gray-400"}`}></div>
                    <span className="text-sm">新建评估会话 #24</span>
                    <span className={`text-xs ml-auto ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      1天前
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-slate-600" : "bg-gray-400"}`}></div>
                    <span className="text-sm">评估框架已更新</span>
                    <span className={`text-xs ml-auto ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      3天前
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
