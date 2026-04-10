/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'
import { user } from './auth'
import { courseEnrollment } from './curriculum'

export const payment = pgTable(
  'Payment',
  {
    paymentId: text('id').primaryKey().notNull(),
    bookingId: text('bookingId').unique(),
    amount: doublePrecision('amount').notNull(),
    currency: text('currency').notNull(),
    status: enums.paymentStatusEnum('status').notNull(),
    gateway: enums.paymentGatewayEnum('gateway').notNull(),
    gatewayPaymentId: text('gatewayPaymentId'),
    gatewayCheckoutUrl: text('gatewayCheckoutUrl'),
    paidAt: timestamp('paidAt', { withTimezone: true }),
    refundedAt: timestamp('refundedAt', { withTimezone: true }),
    metadata: jsonb('metadata').default({}),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    enrollmentId: text('enrollmentId').references(() => courseEnrollment.enrollmentId, {
      onDelete: 'set null',
    }),
    tutorId: text('tutorId').references(() => user.userId, { onDelete: 'set null' }),
  },
  table => ({
    Payment_status_idx: index('Payment_status_idx').on(table.status),
    Payment_gateway_idx: index('Payment_gateway_idx').on(table.gateway),
    Payment_gatewayPaymentId_idx: index('Payment_gatewayPaymentId_idx').on(table.gatewayPaymentId),
    Payment_tutorId_idx: index('Payment_tutorId_idx').on(table.tutorId),
    idx_payment_tutor_status_created: index('idx_payment_tutor_status_created').on(
      table.tutorId,
      table.status,
      table.createdAt
    ),
    idx_payment_enrollment_status: index('idx_payment_enrollment_status').on(
      table.enrollmentId,
      table.status
    ),
  })
)

export const refund = pgTable(
  'Refund',
  {
    refundId: text('id').primaryKey().notNull(),
    paymentId: text('paymentId')
      .notNull()
      .references(() => payment.paymentId, { onDelete: 'cascade' }),
    amount: doublePrecision('amount').notNull(),
    reason: text('reason'),
    status: enums.refundStatusEnum('status').notNull(),
    gatewayRefundId: text('gatewayRefundId'),
    processedAt: timestamp('processedAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    Refund_paymentId_idx: index('Refund_paymentId_idx').on(table.paymentId),
  })
)

export const webhookEvent = pgTable(
  'WebhookEvent',
  {
    eventId: text('id').primaryKey().notNull(),
    paymentId: text('paymentId').references(() => payment.paymentId, { onDelete: 'set null' }),
    gateway: enums.paymentGatewayEnum('gateway').notNull(),
    eventType: text('eventType').notNull(),
    payload: jsonb('payload').notNull(),
    processed: boolean('processed').notNull(),
    processedAt: timestamp('processedAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    WebhookEvent_gateway_eventType_idx: index('WebhookEvent_gateway_eventType_idx').on(
      table.gateway,
      table.eventType
    ),
    WebhookEvent_processed_idx: index('WebhookEvent_processed_idx').on(table.processed),
  })
)

export const payout = pgTable(
  'Payout',
  {
    payoutId: text('id').primaryKey().notNull(),
    tutorId: text('tutorId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    amount: doublePrecision('amount').notNull(),
    currency: text('currency').notNull(),
    status: text('status').notNull(),
    method: text('method').notNull(),
    details: jsonb('details'),
    notes: text('notes'),
    requestedAt: timestamp('requestedAt', { withTimezone: true }).notNull().defaultNow(),
    processedAt: timestamp('processedAt', { withTimezone: true }),
    completedAt: timestamp('completedAt', { withTimezone: true }),
    transactionReference: text('transactionReference'),
  },
  table => ({
    Payout_tutorId_idx: index('Payout_tutorId_idx').on(table.tutorId),
    Payout_status_idx: index('Payout_status_idx').on(table.status),
    Payout_requestedAt_idx: index('Payout_requestedAt_idx').on(table.requestedAt),
  })
)

export const paymentOnPayout = pgTable(
  'PaymentOnPayout',
  {
    paymentOnPayoutId: text('id').primaryKey().notNull(),
    paymentId: text('paymentId')
      .notNull()
      .references(() => payment.paymentId, { onDelete: 'cascade' }),
    payoutId: text('payoutId')
      .notNull()
      .references(() => payout.payoutId, { onDelete: 'cascade' }),
    amount: doublePrecision('amount').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    PaymentOnPayout_payoutId_idx: index('PaymentOnPayout_payoutId_idx').on(table.payoutId),
    PaymentOnPayout_paymentId_idx: index('PaymentOnPayout_paymentId_idx').on(table.paymentId),
    PaymentOnPayout_paymentId_payoutId_key: uniqueIndex(
      'PaymentOnPayout_paymentId_payoutId_key'
    ).on(table.paymentId, table.payoutId),
  })
)

export const platformRevenue = pgTable(
  'PlatformRevenue',
  {
    revenueId: text('id').primaryKey().notNull(),
    paymentId: text('paymentId')
      .notNull()
      .references(() => payment.paymentId, { onDelete: 'cascade' }),
    amount: doublePrecision('amount').notNull(),
    month: text('month').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    PlatformRevenue_paymentId_idx: index('PlatformRevenue_paymentId_idx').on(table.paymentId),
    PlatformRevenue_month_idx: index('PlatformRevenue_month_idx').on(table.month),
    PlatformRevenue_createdAt_idx: index('PlatformRevenue_createdAt_idx').on(table.createdAt),
  })
)
