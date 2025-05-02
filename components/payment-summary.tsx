import { Shield } from "lucide-react"

interface PaymentSummaryProps {
  amount: string
  isloading: boolean
}

export default function PaymentSummary({ amount, isloading }: PaymentSummaryProps) {
  // Clean the amount value to ensure it's a valid number
  const cleanAmount = amount.replace(/[^\d.]/g, "")
  const numericAmount = Number.parseFloat(cleanAmount) || 0

  // Calculate fees (example: 2% of the amount)
  const fees = numericAmount * 0.02
  const total = numericAmount + fees

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 text-right">ملخص الدفع</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">د.ك {numericAmount.toFixed(2)}</span>
          <span className="text-gray-700">المبلغ</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">د.ك {fees.toFixed(2)}</span>
          <span className="text-gray-700">رسوم الخدمة</span>
        </div>

        <div className="h-px bg-gray-200 my-2"></div>

        <div className="flex justify-between items-center font-bold">
          <span className="text-gray-800">د.ك {total.toFixed(2)}</span>
          <span className="text-gray-800">الإجمالي</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
        <Shield className="w-4 h-4" />
        <span>مدفوعات آمنة ومشفرة</span>
      </div>
    </div>
  )
}
