import { Button } from "@/components/ui/button"
import { Receipt, ChevronLeft } from "lucide-react"

interface PaymentSummaryProps {
  amount: string
}

export default function PaymentSummary({ amount }: PaymentSummaryProps) {
  return (
    <div className="mt-auto pt-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex items-start mb-4">
          <Receipt className="text-gray-400 w-5 h-5 mt-1" />
          <div className="mr-3 flex-1">
            <h3 className="text-right text-lg font-semibold text-gray-800">ملخص الدفع</h3>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 border-t border-dashed">
          <div className="text-xl font-semibold text-gray-900">د.ك {amount}</div>
          <div className="text-right text-lg font-medium text-gray-700">الإجمالي: </div>
        </div>

        <div className="text-right text-sm text-gray-500 mt-1">إعادة التعبئة / دفع الفواتير</div>
      </div>

      <Button className="w-full py-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-lg font-medium transition-all duration-200 flex items-center justify-center group">
        <span>استمرار</span>
        <ChevronLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  )
}
