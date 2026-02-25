/**
* POST /api/payments/chinese-gateways
* Enterprise Chinese payment gateway - WeChat Pay & Alipay
*/

import { NextRequest, NextResponse } from "next/server"
import { withAuth, ValidationError, withRateLimitPreset } from "@/lib/api/middleware"
import { WeChatPayClient } from "@/lib/payments/wechat-pay-client"
import { AlipayClient } from "@/lib/payments/alipay-client"
import { CHINESE_CURRENCY, getChineseErrorMessage, isValidChineseAmount } from "@/lib/payments/chinese-gateways"

const GATEWAYS = ["WECHAT_PAY", "ALIPAY"] as const
type GatewayParam = (typeof GATEWAYS)[number]

function getClient(gateway: GatewayParam) {
  switch (gateway) {
    case "WECHAT_PAY": return new WeChatPayClient()
    case "ALIPAY": return new AlipayClient()
    default: throw new ValidationError(getChineseErrorMessage("PAYMENT_SYSTEM_ERROR"))
  }
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, "paymentCreate")
  if (rateLimitResponse) return rateLimitResponse

  let body: { gateway?: string; amount?: number; description?: string; currency?: string; successUrl?: string; cancelUrl?: string; metadata?: Record<string, unknown> }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: getChineseErrorMessage("PAYMENT_SYSTEM_ERROR") }, { status: 400 })
  }

  const { gateway, amount, description, currency, successUrl, cancelUrl, metadata } = body

  if (!gateway || !GATEWAYS.includes(gateway as GatewayParam)) {
    return NextResponse.json({ error: getChineseErrorMessage("PAYMENT_SYSTEM_ERROR") }, { status: 400 })
  }

  const amt = typeof amount === "number" ? amount : parseFloat(String(amount ?? 0))
  if (!isValidChineseAmount(amt)) {
    return NextResponse.json({ error: getChineseErrorMessage("PAYMENT_AMOUNT_INVALID") }, { status: 400 })
  }

  const desc = typeof description === "string" && description.trim() ? description.trim() : "课程/服务支付"
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
  const user = await import("@/lib/db").then(m => m.db.user.findUnique({ where: { id: session.user.id }, select: { email: true } }))
  const studentEmail = user?.email ?? ""

  const startTime = Date.now()
  try {
    const client = getClient(gateway as GatewayParam)
    const response = await client.createPayment({
      amount: amt,
      currency: currency ?? CHINESE_CURRENCY,
      studentEmail,
      description: desc,
      metadata,
      successUrl: successUrl ?? baseUrl + "/payment/success",
      cancelUrl: cancelUrl ?? baseUrl + "/payment/cancel",
    })
    return NextResponse.json({ paymentId: response.paymentId, checkoutUrl: response.checkoutUrl, status: response.status, isQrCode: gateway === "WECHAT_PAY" })
  } catch (err) {
    const msg = err instanceof Error ? err.message : getChineseErrorMessage("PAYMENT_SYSTEM_ERROR")
    return NextResponse.json({ error: msg }, { status: 500 })
  }
})
