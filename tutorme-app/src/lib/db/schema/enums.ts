/**
 * Drizzle enums (generated from Prisma schema).
 */
import { pgEnum } from 'drizzle-orm/pg-core'

export const pollTypeEnum = pgEnum('PollType', ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'RATING', 'SHORT_ANSWER', 'WORD_CLOUD'])

export const pollStatusEnum = pgEnum('PollStatus', ['DRAFT', 'ACTIVE', 'CLOSED'])

export const roleEnum = pgEnum('Role', ['STUDENT', 'TUTOR', 'PARENT', 'ADMIN'])

export const sessionTypeEnum = pgEnum('SessionType', ['CLINIC', 'GROUP', 'ONE_ON_ONE'])

export const messageSourceEnum = pgEnum('MessageSource', ['AI', 'TUTOR', 'STUDENT'])

export const tierEnum = pgEnum('Tier', ['FREE', 'PRO', 'ELITE'])

export const paymentStatusEnum = pgEnum('PaymentStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'])

export const paymentGatewayEnum = pgEnum('PaymentGateway', ['AIRWALLEX', 'HITPAY'])

export const refundStatusEnum = pgEnum('RefundStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'])

export const eventTypeEnum = pgEnum('EventType', ['LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER'])

export const eventStatusEnum = pgEnum('EventStatus', ['CONFIRMED', 'TENTATIVE', 'CANCELLED'])

export const mathSessionStatusEnum = pgEnum('MathSessionStatus', ['ACTIVE', 'PAUSED', 'ENDED', 'ARCHIVED'])

export const mathAIInteractionTypeEnum = pgEnum('MathAIInteractionType', ['SOLVE', 'HINT', 'CHECK', 'EXPLAIN', 'RECOGNIZE'])

