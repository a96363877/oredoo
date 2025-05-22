import { Receipt } from "lucide-react"

interface PaymentSummaryProps {
  amount: string
  isloading: boolean
}

export default function PaymentSummary({ amount, isloading }: PaymentSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-700">
          <img src='/vercel.svg' className="w-5 h-5 text-red-500 mr-2" />
          <div className="text-lg font-medium">إعادة التعبئة / دفع الفواتير</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">د.ك {Number.parseFloat(amount).toFixed(3)}</div>
        <div className="text-lg font-medium">الإجمالي:</div>
      </div>
    </div>
  )
}
