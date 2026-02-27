/**
 * Drizzle enums (generated from Prisma schema).
 */
import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('Role', ['STUDENT', 'TUTOR', 'PARENT', 'ADMIN'])
export type Role = (typeof roleEnum.enumValues)[number]

export const pollTypeEnum = pgEnum('PollType', ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'RATING', 'SHORT_ANSWER', 'WORD_CLOUD'])
export type PollType = (typeof pollTypeEnum.enumValues)[number]

export const pollStatusEnum = pgEnum('PollStatus', ['DRAFT', 'ACTIVE', 'CLOSED'])
export type PollStatus = (typeof pollStatusEnum.enumValues)[number]

export const sessionTypeEnum = pgEnum('SessionType', ['CLINIC', 'GROUP', 'ONE_ON_ONE'])
export type SessionType = (typeof sessionTypeEnum.enumValues)[number]

export const messageSourceEnum = pgEnum('MessageSource', ['AI', 'TUTOR', 'STUDENT'])
export type MessageSource = (typeof messageSourceEnum.enumValues)[number]

export const tierEnum = pgEnum('Tier', ['FREE', 'PRO', 'ELITE'])
export type Tier = (typeof tierEnum.enumValues)[number]

export const paymentStatusEnum = pgEnum('PaymentStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'])
export type PaymentStatus = (typeof paymentStatusEnum.enumValues)[number]

export const paymentGatewayEnum = pgEnum('PaymentGateway', ['AIRWALLEX', 'HITPAY'])
export type PaymentGateway = (typeof paymentGatewayEnum.enumValues)[number]

export const refundStatusEnum = pgEnum('RefundStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'])
export type RefundStatus = (typeof refundStatusEnum.enumValues)[number]

export const eventTypeEnum = pgEnum('EventType', ['LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER'])
export type EventType = (typeof eventTypeEnum.enumValues)[number]

export const eventStatusEnum = pgEnum('EventStatus', ['CONFIRMED', 'TENTATIVE', 'CANCELLED'])
export type EventStatus = (typeof eventStatusEnum.enumValues)[number]

export const mathSessionStatusEnum = pgEnum('MathSessionStatus', ['ACTIVE', 'PAUSED', 'ENDED', 'ARCHIVED'])
export type MathSessionStatus = (typeof mathSessionStatusEnum.enumValues)[number]

export const mathAIInteractionTypeEnum = pgEnum('MathAIInteractionType', ['SOLVE', 'HINT', 'CHECK', 'EXPLAIN', 'RECOGNIZE'])
export type MathAIInteractionType = (typeof mathAIInteractionTypeEnum.enumValues)[number]
