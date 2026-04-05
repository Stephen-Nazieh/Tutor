/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
  uniqueIndex,
  index,
  uuid,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'

export const userGamification = pgTable('UserGamification', {
  gamificationId: text('gamificationId').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  level: integer('level').notNull(),
  xp: integer('xp').notNull(),
  streakDays: integer('streakDays').notNull(),
  longestStreak: integer('longestStreak').notNull(),
  lastLogin: timestamp('lastLogin', { withTimezone: true }).notNull().defaultNow(),
  lastActiveDate: timestamp('lastActiveDate', { withTimezone: true }),
  totalStudyMinutes: integer('totalStudyMinutes').notNull(),
  grammarScore: integer('grammarScore').notNull(),
  vocabularyScore: integer('vocabularyScore').notNull(),
  speakingScore: integer('speakingScore').notNull(),
  listeningScore: integer('listeningScore').notNull(),
  confidenceScore: integer('confidenceScore').notNull(),
  fluencyScore: integer('fluencyScore').notNull(),
  unlockedWorlds: text('unlockedWorlds').array().notNull(),
})

export const achievement = pgTable(
  'Achievement',
  {
    achievementId: text('achievementId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    unlockedAt: timestamp('unlockedAt', { withTimezone: true }).notNull().defaultNow(),
    xpAwarded: integer('xpAwarded').notNull(),
  },
  table => ({
    Achievement_userId_idx: index('Achievement_userId_idx').on(table.userId),
  })
)

export const mission = pgTable('Mission', {
  missionId: text('missionId').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  xpReward: integer('xpReward').notNull(),
  requirement: jsonb('requirement').notNull(),
  isActive: boolean('isActive').notNull(),
})

export const missionProgress = pgTable(
  'MissionProgress',
  {
    progressId: text('progressId').primaryKey().notNull(),
    missionId: text('missionId').notNull(),
    studentId: text('studentId').notNull(),
    progress: integer('progress').notNull(),
    completed: boolean('completed').notNull(),
    completedAt: timestamp('completedAt', { withTimezone: true }),
  },
  table => ({
    MissionProgress_studentId_idx: index('MissionProgress_studentId_idx').on(table.studentId),
    MissionProgress_missionId_studentId_key: uniqueIndex(
      'MissionProgress_missionId_studentId_key'
    ).on(table.missionId, table.studentId),
  })
)

export const userDailyQuest = pgTable(
  'UserDailyQuest',
  {
    questId: text('questId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    missionId: text('missionId').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
    completed: boolean('completed').notNull(),
  },
  table => ({
    UserDailyQuest_userId_idx: index('UserDailyQuest_userId_idx').on(table.userId),
    UserDailyQuest_userId_missionId_date_key: uniqueIndex(
      'UserDailyQuest_userId_missionId_date_key'
    ).on(table.userId, table.missionId, table.date),
  })
)

export const badge = pgTable('Badge', {
  badgeId: text('badgeId').primaryKey().notNull(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  category: text('category').notNull(),
  rarity: text('rarity').notNull(),
  xpBonus: integer('xpBonus').notNull(),
  requirement: jsonb('requirement').notNull(),
  isSecret: boolean('isSecret').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
})

export const userBadge = pgTable(
  'UserBadge',
  {
    userBadgeId: text('userBadgeId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    badgeId: text('badgeId').notNull(),
    earnedAt: timestamp('earnedAt', { withTimezone: true }).notNull().defaultNow(),
    progress: integer('progress').notNull(),
  },
  table => ({
    UserBadge_userId_idx: index('UserBadge_userId_idx').on(table.userId),
    UserBadge_badgeId_idx: index('UserBadge_badgeId_idx').on(table.badgeId),
    UserBadge_userId_badgeId_key: uniqueIndex('UserBadge_userId_badgeId_key').on(
      table.userId,
      table.badgeId
    ),
  })
)

export const leaderboardEntry = pgTable(
  'LeaderboardEntry',
  {
    entryId: text('entryId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    periodStart: timestamp('periodStart', { withTimezone: true }),
    periodEnd: timestamp('periodEnd', { withTimezone: true }),
    score: integer('score').notNull(),
    rank: integer('rank'),
  },
  table => ({
    LeaderboardEntry_type_score_idx: index('LeaderboardEntry_type_score_idx').on(
      table.type,
      table.score
    ),
    LeaderboardEntry_userId_idx: index('LeaderboardEntry_userId_idx').on(table.userId),
    LeaderboardEntry_userId_type_periodStart_key: uniqueIndex(
      'LeaderboardEntry_userId_type_periodStart_key'
    ).on(table.userId, table.type, table.periodStart),
  })
)
