"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { getLocaleFromPathname, removeLocaleFromPathname } from "@/lib/i18n"

interface LanguageContextType {
  language: Locale
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Sidebar
    "sidebar.dashboard": "Dashboard",
    "sidebar.promptEngineering": "Prompt Engineering",
    "sidebar.psychologistEvaluation": "Psychologist Evaluation",
    "sidebar.leaderboard": "Leaderboard",
    "sidebar.badge": "Badge",
    "sidebar.network": "Network",
    "sidebar.profile": "Profile",
    "sidebar.lightMode": "Light Mode",
    "sidebar.darkMode": "Dark Mode",
    "sidebar.english": "English",
    "sidebar.chinese": "中文",

    // Profile Dropdown
    "profile.myProfile": "My Profile",
    "profile.myMessages": "My Messages",
    "profile.logout": "Logout",

    // Dashboard
    "dashboard.title": "Dashboard Overview",
    "dashboard.totalUsers": "Total Users",
    "dashboard.activePrompts": "Active Prompts",
    "dashboard.completedEvaluations": "Completed Evaluations",
    "dashboard.totalAnnotations": "Total Annotations",
    "dashboard.promptLeaderboard": "Prompt Leaderboard",
    "dashboard.topPerformers": "Top Performers",
    "dashboard.psychologyAnnotations": "Psychology Annotations",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.viewAll": "View All",
    "dashboard.points": "points",
    "dashboard.annotations": "annotations",
    "dashboard.anxiety": "Anxiety",
    "dashboard.depression": "Depression",
    "dashboard.stress": "Stress",
    "dashboard.relationships": "Relationships",
    "dashboard.selfEsteem": "Self-esteem",
    "dashboard.monthlyGrowth": "+12.5% from last month",
    "dashboard.weeklyGrowth": "+8.2% from last week",
    "dashboard.qualityScore": "Quality Score: 94.2%",
    "dashboard.weeklyCompleted": "156 completed this week",
    "dashboard.monthlyContributors": "Leading contributors this month",
    "dashboard.contributor1Name": "Chen Zhiming",
    "dashboard.contributor1Role": "Family Psychology Coach",
    "dashboard.contributor2Name": "Jin Sarah",
    "dashboard.contributor2Role": "Behavior Analysis Expert",
    "dashboard.contributor3Name": "Johnson",
    "dashboard.contributor3Role": "Cognitive Assessor",
    "dashboard.annotationCategories": "Annotation categories and progress",
    "dashboard.emotionalAnalysis": "Emotional Analysis",
    "dashboard.behaviorPatterns": "Behavior Patterns",
    "dashboard.cognitiveAssessment": "Cognitive Assessment",
    "dashboard.allModulesUpdates": "Latest updates from all modules",
    "dashboard.activity1": "New prompt 'Family Conflict Resolution' received highest rating",
    "dashboard.activity2": "Psychology evaluation batch #247 completed",
    "dashboard.activity3": "1,247 new annotations added to database",
    "dashboard.time1": "2 hours ago",
    "dashboard.time2": "4 hours ago",
    "dashboard.time3": "6 hours ago",

    // Prompt Engineering
    "prompt.title": "AI Family Psychology Coach Prompts",
    "prompt.description": "Create and optimize AI prompts for psychological guidance and evaluation",
    "prompt.workspace": "Workspace",
    "prompt.promptManagement": "Prompt Management",
    "prompt.evaluationResults": "Evaluation Results",
    "prompt.promptContent": "Prompt Content",
    "prompt.promptTitle": "Prompt Title",
    "prompt.evaluationCriteria": "Evaluation Criteria",
    "prompt.parameterConfig": "Parameter Configuration",
    "prompt.responseLength": "Response Length",
    "prompt.modelSelection": "Model Selection",
    "prompt.currentModel": "Current Model",
    "prompt.costEstimate": "Cost Estimate",
    "prompt.generateDialogue": "Generate Dialogue",
    "prompt.loadPrompt": "Load This Prompt",
    "prompt.category": "Category",

    // Psychologist Evaluation
    "psych.title": "Psychologist Evaluation System",
    "psych.dialogue": "Dialogue",
    "psych.evaluationRecords": "Evaluation Records",
    "psych.dialogueList": "Dialogue List",
    "psych.completionProgress": "Completion Progress",
    "psych.dimensions": "dimensions",
    "psych.session": "Session",

    // Leaderboard
    "leaderboard.title": "Global Leaderboard",
    "leaderboard.topPerformers": "Top performers in each category",
    "leaderboard.promptEngineering": "Prompt Engineering",
    "leaderboard.psychologyEvaluation": "Psychology Evaluation",
    "leaderboard.totalParticipants": "Total Participants",
    "leaderboard.averageScore": "Average Score",
    "leaderboard.topScore": "Top Score",
    "leaderboard.filterByModel": "Filter by Model",
    "leaderboard.allModels": "All Models",
    "leaderboard.rank": "Rank",
    "leaderboard.user": "User",
    "leaderboard.score": "Score",
    "leaderboard.model": "Model",
    "leaderboard.specialty": "Specialty",
  },
  zh: {
    // Sidebar
    "sidebar.dashboard": "仪表板",
    "sidebar.promptEngineering": "提示词工程",
    "sidebar.psychologistEvaluation": "心理学家评估",
    "sidebar.leaderboard": "排行榜",
    "sidebar.badge": "徽章",
    "sidebar.network": "网络",
    "sidebar.profile": "个人资料",
    "sidebar.lightMode": "浅色模式",
    "sidebar.darkMode": "深色模式",
    "sidebar.english": "English",
    "sidebar.chinese": "中文",

    // Profile Dropdown
    "profile.myProfile": "我的资料",
    "profile.myMessages": "我的私信",
    "profile.logout": "退出登录",

    // Dashboard
    "dashboard.title": "仪表板概览",
    "dashboard.totalUsers": "总用户数",
    "dashboard.activePrompts": "活跃提示词",
    "dashboard.completedEvaluations": "已完成评估",
    "dashboard.totalAnnotations": "总标注数",
    "dashboard.promptLeaderboard": "提示词排行榜",
    "dashboard.topPerformers": "顶级表现者",
    "dashboard.psychologyAnnotations": "心理学标注",
    "dashboard.recentActivity": "最近活动",
    "dashboard.viewAll": "查看全部",
    "dashboard.points": "积分",
    "dashboard.annotations": "标注",
    "dashboard.anxiety": "焦虑",
    "dashboard.depression": "抑郁",
    "dashboard.stress": "压力",
    "dashboard.relationships": "人际关系",
    "dashboard.selfEsteem": "自尊",
    "dashboard.monthlyGrowth": "较上月增长 +12.5%",
    "dashboard.weeklyGrowth": "较上周增长 +8.2%",
    "dashboard.qualityScore": "质量评分: 94.2%",
    "dashboard.weeklyCompleted": "本周完成 156 个",
    "dashboard.monthlyContributors": "本月领先贡献者",
    "dashboard.contributor1Name": "陈志明",
    "dashboard.contributor1Role": "家庭心理教练",
    "dashboard.contributor2Name": "金莎拉",
    "dashboard.contributor2Role": "行为分析专家",
    "dashboard.contributor3Name": "约翰逊",
    "dashboard.contributor3Role": "认知评估师",
    "dashboard.annotationCategories": "标注分类和进度",
    "dashboard.emotionalAnalysis": "情感分析",
    "dashboard.behaviorPatterns": "行为模式",
    "dashboard.cognitiveAssessment": "认知评估",
    "dashboard.allModulesUpdates": "所有模块的最新更新",
    "dashboard.activity1": "新提示词'家庭冲突解决'获得最高评分",
    "dashboard.activity2": "心理评估批次 #247 已完成",
    "dashboard.activity3": "1,247 个新标注已添加到数据库",
    "dashboard.time1": "2小时前",
    "dashboard.time2": "4小时前",
    "dashboard.time3": "6小时前",

    // Prompt Engineering
    "prompt.title": "齐家AI家庭心理教练提示词",
    "prompt.description": "创建和优化用于心理指导和评估的AI提示词",
    "prompt.workspace": "工作台",
    "prompt.promptManagement": "提示词管理",
    "prompt.evaluationResults": "评估结果",
    "prompt.promptContent": "提示词内容",
    "prompt.promptTitle": "提示词标题",
    "prompt.evaluationCriteria": "评估维度说明",
    "prompt.parameterConfig": "参数配置",
    "prompt.responseLength": "对话轮次",
    "prompt.modelSelection": "模型选择",
    "prompt.currentModel": "当前选择",
    "prompt.costEstimate": "估算费用",
    "prompt.generateDialogue": "生成对话",
    "prompt.loadPrompt": "加载此提示词",
    "prompt.category": "分类",

    // Psychologist Evaluation
    "psych.title": "心理学家评估系统",
    "psych.dialogue": "对话",
    "psych.evaluationRecords": "评估记录",
    "psych.dialogueList": "对话列表",
    "psych.completionProgress": "完成进度",
    "psych.dimensions": "个维度",
    "psych.session": "会话",

    // Leaderboard
    "leaderboard.title": "全球排行榜",
    "leaderboard.topPerformers": "各类别顶尖表现者",
    "leaderboard.promptEngineering": "提示词工程",
    "leaderboard.psychologyEvaluation": "心理学评估",
    "leaderboard.totalParticipants": "总参与者",
    "leaderboard.averageScore": "平均分数",
    "leaderboard.topScore": "最高分数",
    "leaderboard.filterByModel": "按模型筛选",
    "leaderboard.allModels": "所有模型",
    "leaderboard.rank": "排名",
    "leaderboard.user": "用户",
    "leaderboard.score": "分数",
    "leaderboard.model": "模型",
    "leaderboard.specialty": "专长",
  },
} as const

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [language, setLanguage] = useState<Locale>(initialLocale || getLocaleFromPathname(pathname))

  useEffect(() => {
    const currentLocale = getLocaleFromPathname(pathname)
    setLanguage(currentLocale)
  }, [pathname])

  const toggleLanguage = () => {
    const newLanguage: Locale = language === "en" ? "zh" : "en"
    const pathWithoutLocale = removeLocaleFromPathname(pathname)
    router.push(`/${newLanguage}${pathWithoutLocale}`)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
