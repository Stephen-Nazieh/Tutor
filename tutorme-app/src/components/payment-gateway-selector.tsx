'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export type GatewayOption = 'HITPAY' | 'AIRWALLEX'

interface PaymentGatewaySelectorProps {
  value?: GatewayOption
  onChange?: (value: GatewayOption) => void
  className?: string
  disabled?: boolean
}

const options: { value: GatewayOption; label: string; description: string }[] = [
  { value: 'HITPAY', label: 'HitPay', description: 'Card, PayNow, and more' },
  { value: 'AIRWALLEX', label: 'Airwallex', description: 'Global payments' }
]

export function PaymentGatewaySelector({
  value = 'HITPAY',
  onChange,
  className,
  disabled = false
}: PaymentGatewaySelectorProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label>Payment method</Label>
      <Select
        value={value}
        onValueChange={(v) => onChange?.(v as GatewayOption)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label} — {opt.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
