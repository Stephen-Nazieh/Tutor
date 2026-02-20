/**
 * Student dashboard copy – en / zh-CN (primary per AGENTS.md).
 */

export type DashboardLang = 'en' | 'zh'

export const dashboardStrings = {
  en: {
    welcomeTitle: 'Welcome back,',
    welcomeSubtitle: 'Ready to continue your learning journey?',
    continueLearning: 'Continue Learning',
    browseSubjects: 'Browse subjects',
    noCoursesInProgress: 'No courses in progress',
    browseSubjectsEmpty: 'Browse subjects and start learning.',
    recommendedForYou: 'Recommended for you',
    noRecommendationsYet: 'No recommendations yet',
    noRecommendationsHint: 'Complete lessons and quizzes to get personalized suggestions.',
    dailyQuests: 'Daily Quests',
    noDailyQuests: 'No daily quests today',
    noDailyQuestsHint: 'Complete lessons to unlock quests and earn XP.',
    goToMissions: 'Go to Missions',
    learningWorlds: 'Learning Worlds',
    noWorldsYet: 'No worlds unlocked yet',
    noWorldsHint: 'Level up to unlock learning worlds.',
    viewWorlds: 'View Worlds',
    upcomingClasses: 'Upcoming Classes',
    viewAll: 'View All',
    noUpcomingClasses: 'No upcoming classes',
    noUpcomingClassesHint: 'View available classes to book.',
    viewClasses: 'View classes',
    skills: 'Skills',
    skillsEmpty: 'Skills will appear as you learn',
    skillsEmptyHint: 'Complete lessons and quizzes to build your skill profile.',
    studyGroups: 'Study Groups',
    noStudyGroupsYet: 'No study groups yet',
    noStudyGroupsHint: 'Join or create a group to study with others.',
    browseStudyGroups: 'Browse study groups',
    quickActions: 'Quick actions',
    aiTutor: 'AI Tutor',
    missions: 'Missions',
    myClasses: 'My classes',
    errorLoading: 'Something went wrong loading your dashboard.',
    retry: 'Retry',
    loadingDashboard: 'Loading your dashboard...',
  },
  zh: {
    welcomeTitle: '欢迎回来，',
    welcomeSubtitle: '继续你的学习之旅吧。',
    continueLearning: '继续学习',
    browseSubjects: '浏览科目',
    noCoursesInProgress: '暂无进行中的课程',
    browseSubjectsEmpty: '浏览科目并开始学习。',
    recommendedForYou: '为你推荐',
    noRecommendationsYet: '暂无推荐',
    noRecommendationsHint: '完成课程和测验后可获得个性化推荐。',
    dailyQuests: '每日任务',
    noDailyQuests: '今日暂无每日任务',
    noDailyQuestsHint: '完成课程以解锁任务并赚取经验。',
    goToMissions: '前往任务',
    learningWorlds: '学习世界',
    noWorldsYet: '尚未解锁世界',
    noWorldsHint: '升级以解锁学习世界。',
    viewWorlds: '查看世界',
    upcomingClasses: '即将开始的课',
    viewAll: '查看全部',
    noUpcomingClasses: '暂无即将开始的课',
    noUpcomingClassesHint: '查看可预约的课程。',
    viewClasses: '查看课程',
    skills: '技能',
    skillsEmpty: '学习过程中将显示技能',
    skillsEmptyHint: '完成课程和测验以建立技能档案。',
    studyGroups: '学习小组',
    noStudyGroupsYet: '暂无学习小组',
    noStudyGroupsHint: '加入或创建小组与大家一起学习。',
    browseStudyGroups: '浏览学习小组',
    quickActions: '快捷操作',
    aiTutor: 'AI 辅导',
    missions: '任务',
    myClasses: '我的课程',
    errorLoading: '加载仪表盘时出错。',
    retry: '重试',
    loadingDashboard: '正在加载仪表盘...',
  },
} as const

export type DashboardStringKey = keyof typeof dashboardStrings.en

/** Get dashboard strings for a locale (default zh for zh-CN). */
export function getDashboardStrings(lang: DashboardLang = 'zh') {
  return dashboardStrings[lang]
}

/** Detect dashboard language from document or param. */
export function getDashboardLang(): DashboardLang {
  if (typeof document === 'undefined') return 'zh'
  const lang = document.documentElement?.getAttribute?.('lang') ?? ''
  return lang.startsWith('zh') ? 'zh' : 'en'
}
