# Payment Gateway Integration

This document describes the TutorMe payment integration: data model, gateway layer, API routes, frontend usage, and configuration. It also includes recommendations for future improvement.

---

## 1. Overview

The app supports **paid clinic bookings**. Students book a class; if the class requires payment, they are redirected to a gateway checkout (HitPay or Airwallex). After payment, webhooks update the `Payment` and booking state. Tutors can enable paid classes and set an hourly rate and gateway preference in settings.

**Supported gateways:** HitPay, Airwallex. Default currency is SGD (tutor can set Profile.currency).

---

## 2. Data Model

### 2.1 Core Tables

| Model | Purpose |
|-------|---------|
| **Payment** | One per clinic booking payment. Links to `ClinicBooking`, stores amount, currency, gateway, gateway IDs, status, timestamps. |
| **Refund** | One per refund; links to `Payment`. Stores amount, reason, gateway refund id, status. |
| **WebhookEvent** | Log of every webhook received (gateway, eventType, payload, processed). Optional link to `Payment`. |

### 2.2 Enums

- **PaymentStatus:** `PENDING` \| `PROCESSING` \| `COMPLETED` \| `FAILED` \| `REFUNDED` \| `CANCELLED`
- **PaymentGateway:** `AIRWALLEX` \| `HITPAY`
- **RefundStatus:** `PENDING` \| `PROCESSING` \| `COMPLETED` \| `FAILED`

### 2.3 Related Models

- **ClinicBooking:** `requiresPayment Boolean`, optional `payment Payment?`
- **Clinic:** `requiresPayment Boolean` (class-level)
- **Profile (tutor):** `hourlyRate Float?`, `paidClassesEnabled Boolean`, `paymentGatewayPreference String?` ('HITPAY' \| 'AIRWALLEX'), `currency String?` (e.g. 'SGD', 'USD').
- **Payment.metadata:** For Airwallex, `payment_attempt_id` is stored here on payment_intent.succeeded and used for refunds.

---

## 3. Gateway Service Layer

Location: `src/lib/payments/`.

### 3.1 Types (`types.ts`)

- **CreatePaymentRequest:** amount, currency, bookingId, studentEmail, description, metadata?
- **PaymentResponse:** paymentId, checkoutUrl, status
- **WebhookResult:** success, paymentId?, eventType, status?, error?
- **RefundResponse:** refundId, status, amountRefunded?, error?
- **PaymentGateway (interface):** createPayment, verifyWebhook, processWebhook, refundPayment

### 3.2 Implementations

| File | Gateway | Auth | Create | Webhook verify | Refund |
|------|---------|------|--------|----------------|--------|
| `airwallex.ts` | Airwallex | OAuth-style token (login with x-client-id, x-api-key) | Payment intent | HMAC-SHA256(timestamp + rawBody), headers x-timestamp, x-signature | POST refunds/create (needs payment_attempt_id) |
| `hitpay.ts` | HitPay | X-BUSINESS-API-KEY | POST /v1/payment-requests | HMAC-SHA256(rawBody, HITPAY_SALT), header Hitpay-Signature | POST /v1/refund |

### 3.3 Factory (`factory.ts`)

```ts
import { getPaymentGateway } from '@/lib/payments'

const gateway = getPaymentGateway('HITPAY')  // or 'AIRWALLEX'
const result = await gateway.createPayment(request)
```

Gateway choice: when creating a payment for a clinic, the tutor’s **Profile.paymentGatewayPreference** is used if set ('HITPAY' or 'AIRWALLEX'); otherwise **PAYMENT_DEFAULT_GATEWAY** (env). Currency comes from **Profile.currency** or defaults to SGD.

---

## 4. API Routes

### 4.1 Create Payment

**POST /api/payments/create**

- **Body:** `{ bookingId: string }`
- **Auth:** Required (student).
- **Checks:** Booking exists, current user is the student; booking not already paid; tutor has hourly rate.
- **Logic:** Amount = tutor hourly rate × (clinic duration / 60). Currency from tutor Profile.currency or SGD. Gateway from tutor Profile.paymentGatewayPreference or PAYMENT_DEFAULT_GATEWAY. Creates or reuses Payment (PENDING), calls gateway, saves gatewayPaymentId and gatewayCheckoutUrl.
- **Response:** `{ checkoutUrl: string, paymentId: string }`

Used by the "Pay now" button on My bookings for unpaid bookings.

### 4.2 Book Class (includes payment for paid classes)

**POST /api/classes**

- **Body:** `{ classId: string }` (classId is the clinic id).
- **Auth:** Required (student).
- **Logic:** If clinic.requiresPayment and tutor has hourly rate, creates booking with requiresPayment: true. Currency and gateway from tutor profile (or env default). Creates Payment, calls gateway, returns **checkoutUrl** in the response.
- **Response (paid):** `{ success, requiresPayment: true, booking, checkoutUrl, message }`
- **Response (free):** `{ success, booking, message }`

Frontend should redirect to `checkoutUrl` when present.

### 4.3 Webhooks

**POST /api/payments/webhooks/airwallex**

- **Headers:** x-timestamp, x-signature (raw body used for verification).
- **Logic:** Verify HMAC(timestamp + rawBody). Idempotency: if payload.id exists and a processed WebhookEvent with that id exists, return 200 and skip. Log to WebhookEvent. On payment_intent.succeeded: set Payment COMPLETED, paidAt, and store data.payment_attempt_id in Payment.metadata (for refunds). Send payment confirmation and tutor-notification emails. Mark WebhookEvent processed.

**POST /api/payments/webhooks/hitpay**

- **Headers:** Hitpay-Signature (raw body used for verification).
- **Logic:** Verify HMAC(rawBody, HITPAY_SALT). Idempotency: if payload.id exists and a processed WebhookEvent with that id exists, return 200 and skip. Log to WebhookEvent. On completed/succeeded set Payment COMPLETED and paidAt; send emails. Mark WebhookEvent processed.

Configure these URLs in each gateway’s dashboard (see Environment below).

### 4.4 Refund

**POST /api/payments/refund**

- **Body:** `{ paymentId: string, amount?: number, reason?: string }`
- **Auth:** TUTOR or ADMIN. Tutor may only refund payments for their own clinic.
- **Logic:** Load Payment. For Airwallex, use Payment.metadata.payment_attempt_id if present (required for refund API), else gatewayPaymentId. Call gateway.refundPayment(refundPaymentId, amount); create Refund; set Payment to REFUNDED if full refund.

### 4.5 Admin (ADMIN only)

- **GET /api/admin/payments** — List payments. Query: `status`, `gateway`, `limit` (max 100).
- **GET /api/admin/webhook-events** — List webhook events. Query: `gateway`, `processed`, `limit` (max 100).
- **Page:** `/admin/payments` — Tabs: Payments table, Webhook events table. Redirects non-ADMIN to home.

---

## 5. Frontend Usage

### 5.1 Pages

| Route | Purpose |
|-------|---------|
| `/payment/success` | Shown after successful payment; links to "My bookings" and dashboard. |
| `/payment/cancel` | Shown when payment is cancelled or fails; links to classes and dashboard. |

Redirect URLs for gateways should point to these (e.g. PAYMENT_SUCCESS_URL, PAYMENT_CANCEL_URL).

### 5.2 Student: Booking a paid class

1. **Dashboard** (`/student/dashboard`): Upcoming classes show price (SGD X.XX) when the class has a price. On "Book", POST /api/classes; if response has checkoutUrl, redirect to it.
2. **Classes page** (`/student/classes`): Same: show price, on "Book" POST /api/classes and redirect to checkoutUrl if returned.

No direct call to `/api/payments/create` is required for the initial book flow; the server creates the payment when creating the booking for a paid class.

### 5.3 Pay for an existing unpaid booking

**Implemented.** On **My bookings** (`/student/classes`, “My Bookings” tab), each unpaid booking (requiresPayment and paymentStatus ≠ COMPLETED) shows a **Pay now** button. Clicking it calls **POST /api/payments/create** with the bookingId (or redirects to existing paymentCheckoutUrl if any) and then redirects the user to the returned checkoutUrl.

### 5.4 Tutor settings

**Tutor Settings** (`/tutor/settings`):

- **Paid classes:** Toggle to enable/disable offering paid classes.
- **Default hourly rate (SGD):** Used to compute amount (hourly rate × duration/60).
- **Payment gateway preference:** HitPay or Airwallex (used when creating payments for the tutor’s classes).
- **Currency:** Default currency for paid classes (SGD, USD, EUR, GBP, CNY). Stored in Profile.currency.

### 5.5 Payment gateway selector component

**Component:** `src/components/payment-gateway-selector.tsx`

- Props: value (`'HITPAY' | 'AIRWALLEX'`), onChange, className, disabled.
- Use wherever the user or tutor should choose gateway (e.g. tutor settings, or future checkout step).

---

## 6. Environment Configuration

### 6.1 Airwallex

| Variable | Description |
|----------|-------------|
| AIRWALLEX_CLIENT_ID | From Airwallex dashboard |
| AIRWALLEX_API_KEY | From Airwallex dashboard |
| AIRWALLEX_ENV | `sandbox` or `production` |
| AIRWALLEX_WEBHOOK_SECRET | Webhook signing secret (for x-signature verification) |

Webhook URL to register: `https://<your-domain>/api/payments/webhooks/airwallex`

### 6.2 HitPay

| Variable | Description |
|----------|-------------|
| HITPAY_API_KEY | X-BUSINESS-API-KEY from HitPay |
| HITPAY_SALT | Used for HMAC webhook verification |
| HITPAY_ENV | `sandbox` or `production` |
| HITPAY_WEBHOOK_URL | Optional. Full URL of your webhook. If unset, fallback is `NEXT_PUBLIC_APP_URL + '/api/payments/webhooks/hitpay'`. |

Webhook URL to register: `https://<your-domain>/api/payments/webhooks/hitpay`

### 6.3 App

| Variable | Description |
|----------|-------------|
| PAYMENT_DEFAULT_GATEWAY | `HITPAY` or `AIRWALLEX` (used when tutor has no paymentGatewayPreference) |
| PAYMENT_SUCCESS_URL | Redirect after success (e.g. `https://<your-domain>/payment/success`) |
| PAYMENT_CANCEL_URL | Redirect after cancel/failure |
| NEXT_PUBLIC_APP_URL | Base URL for app (used in fallbacks) |

### 6.4 Email (optional)

| Variable | Description |
|----------|-------------|
| RESEND_API_KEY | If set, payment confirmation and tutor “payment received” emails are sent via Resend. If unset, a log line is written instead. |
| PAYMENT_EMAIL_FROM | From address for payment emails (e.g. `TutorMe <noreply@yourdomain.com>`). Defaults to `TutorMe <noreply@tutorme.com>`. |

---

## 7. Flow Summary

1. **Tutor:** Enables paid classes, hourly rate, gateway preference, and currency in Settings. When creating a clinic, sets requiresPayment (e.g. from a “paid class” checkbox when that exists).
2. **Student:** Sees price on class; clicks Book → POST /api/classes → receives checkoutUrl → redirected to gateway. For an existing unpaid booking, clicks “Pay now” on My bookings → POST /api/payments/create → redirect to checkoutUrl.
3. **Gateway:** User pays; gateway sends webhook to /api/payments/webhooks/{airwallex|hitpay}.
4. **Server:** Verifies webhook; skips if duplicate (idempotency). Logs WebhookEvent. Sets Payment COMPLETED and paidAt; for Airwallex, stores payment_attempt_id in metadata. Sends confirmation emails (if RESEND_API_KEY set).
5. **Student:** Lands on /payment/success or /payment/cancel.
6. **Refunds:** Tutor/Admin calls POST /api/payments/refund with paymentId (and optional amount). Airwallex refunds use metadata.payment_attempt_id when available.

---

## 8. Implemented Improvements

The following are already in place:

- **HitPay webhook URL:** Default fallback is `NEXT_PUBLIC_APP_URL + '/api/payments/webhooks/hitpay'`.
- **Tutor gateway preference:** Payments/create and POST /api/classes use Profile.paymentGatewayPreference when set; otherwise PAYMENT_DEFAULT_GATEWAY.
- **Airwallex payment_attempt_id:** Stored in Payment.metadata on payment_intent.succeeded; refund route uses it for Airwallex refunds.
- **Webhook idempotency:** Before processing, both webhooks check for an existing processed WebhookEvent with the same payload.id; if found, return 200 and skip.
- **Email notifications:** `src/lib/notifications/payment-email.ts` sends payment confirmation (student) and payment received (tutor) via Resend when RESEND_API_KEY is set; otherwise logs.
- **Pay now:** My bookings tab on `/student/classes` shows “Pay now” for unpaid bookings; calls POST /api/payments/create and redirects to checkoutUrl (or uses existing paymentCheckoutUrl).
- **Currency:** Profile.currency (tutor settings); used in payment creation. Default SGD.
- **Admin:** GET /api/admin/payments and GET /api/admin/webhook-events (ADMIN only); `/admin/payments` page with Payments and Webhook events tabs.

## 9. Remaining Recommendations

- **Default clinic.requiresPayment:** When adding a “Create clinic” flow (e.g. for scheduled clinics separate from live rooms), default requiresPayment from Profile.paidClassesEnabled.
- **Webhook retry:** Admin UI or API to retry a failed webhook or manually set Payment status after verifying with the gateway.
- **Stronger verification:** Keep using raw request body only for signature verification (current behavior).

---

## 10. File Reference

| Path | Purpose |
|------|---------|
| prisma/schema.prisma | Payment, Refund, WebhookEvent, Clinic.requiresPayment, ClinicBooking.payment, Profile.paidClassesEnabled, paymentGatewayPreference, currency |
| src/lib/payments/types.ts | Shared types and PaymentGateway interface |
| src/lib/payments/airwallex.ts | Airwallex implementation |
| src/lib/payments/hitpay.ts | HitPay implementation (webhook URL fallback: /api/payments/webhooks/hitpay) |
| src/lib/payments/factory.ts | getPaymentGateway(gateway) |
| src/lib/payments/index.ts | Re-exports |
| src/lib/notifications/payment-email.ts | sendPaymentConfirmation, sendTutorPaymentReceived (Resend or log) |
| src/app/api/payments/create/route.ts | POST create payment (tutor gateway + currency) |
| src/app/api/payments/webhooks/airwallex/route.ts | Airwallex webhook (idempotency, payment_attempt_id, email) |
| src/app/api/payments/webhooks/hitpay/route.ts | HitPay webhook (idempotency, email) |
| src/app/api/payments/refund/route.ts | POST refund (Airwallex uses metadata.payment_attempt_id) |
| src/app/api/admin/payments/route.ts | GET list payments (ADMIN) |
| src/app/api/admin/webhook-events/route.ts | GET list webhook events (ADMIN) |
| src/app/api/classes/route.ts | GET classes (with price, paymentStatus for myBookings), POST book (gateway + currency, checkoutUrl) |
| src/app/api/user/profile/route.ts | GET/PUT profile (hourlyRate, paidClassesEnabled, paymentGatewayPreference, currency) |
| src/app/payment/success/page.tsx | Success page |
| src/app/payment/cancel/page.tsx | Cancel page |
| src/app/student/dashboard/page.tsx | Book flow + redirect to checkout |
| src/app/student/dashboard/components/UpcomingClasses.tsx | Shows price |
| src/app/student/classes/page.tsx | Book flow, price, My bookings “Pay now” |
| src/app/tutor/settings/page.tsx | Paid classes toggle, hourly rate, gateway preference, currency |
| src/app/admin/payments/page.tsx | Admin payments and webhook events view (ADMIN) |
| src/components/payment-gateway-selector.tsx | Gateway dropdown UI |
