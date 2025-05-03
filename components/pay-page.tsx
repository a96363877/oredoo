"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Star } from "lucide-react"
import Link from "next/link"

// Define a type for phone numbers
type PhoneNumber = {
  id: number
  number: string
  price: number
  provider: string
  isFeatured: boolean
  type: "Standard" | "Premium" | "Vanity"
}

export default function PhoneNumbersGrid() {
  const initialPhoneNumbers = [
    { id: 1, number: "5001 2345", price: 29, provider: "Zain", isFeatured: true, type: "Standard" },
    { id: 2, number: "5009 8765", price: 45, provider: "Zain", isFeatured: false, type: "Premium" },
    { id: 3, number: "5555 5155", price: 99, provider: "Zain", isFeatured: true, type: "Vanity" },
    { id: 4, number: "6001 1122", price: 25, provider: "Ooredoo", isFeatured: false, type: "Standard" },
    { id: 5, number: "6007 7777", price: 79, provider: "Ooredoo", isFeatured: true, type: "Vanity" },
    { id: 6, number: "6508 8899", price: 35, provider: "Ooredoo", isFeatured: false, type: "Premium" },
    { id: 7, number: "6501 1222", price: 24, provider: "Ooredoo", isFeatured: false, type: "Standard" },
    { id: 8, number: "7003 3444", price: 29, provider: "STC", isFeatured: false, type: "Standard" },
    { id: 9, number: "7002 2222", price: 89, provider: "STC", isFeatured: true, type: "Vanity" },
    { id: 10, number: "9009 8765", price: 32, provider: "STC", isFeatured: false, type: "Premium" },
    { id: 11, number: "9004 5678", price: 24, provider: "STC", isFeatured: false, type: "Standard" },
    { id: 12, number: "5566 7777", price: 129, provider: "Zain", isFeatured: true, type: "Vanity" },
  ]
  
  

  const [searchQuery, setSearchQuery] = useState("")
  const [areaCodeFilter, setAreaCodeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [cart, setCart] = useState<PhoneNumber[]>([])

  const areaCodes = [...new Set(initialPhoneNumbers.map((phone) => phone.provider))]

  const filteredPhoneNumbers = initialPhoneNumbers.filter((phone) => {
    const matchesSearch = phone.number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAreaCode = areaCodeFilter === "all" || phone.provider === areaCodeFilter
    const matchesType = typeFilter === "all" || phone.type === typeFilter
    return matchesSearch && matchesAreaCode && matchesType
  })

  const addToCart = (phoneNumber: PhoneNumber) => {
    if (!cart.some((item) => item.id === phoneNumber.id)) {
      setCart([...cart, phoneNumber])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      <h1 className="text-3xl font-bold mb-2">أرقام هواتف مميزة</h1>
      <p className="text-muted-foreground mb-8">اختر رقم الهاتف المثالي من مجموعتنا المختارة</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن رقم هاتف..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={areaCodeFilter} onValueChange={setAreaCodeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="تصفية حسب رمز المنطقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل رموز المناطق</SelectItem>
            {areaCodes.map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="تصفية حسب النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأنواع</SelectItem>
            <SelectItem value="Standard">عادي</SelectItem>
            <SelectItem value="Premium">مميز</SelectItem>
            <SelectItem value="Vanity">راقي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhoneNumbers.map((phone ) => {
          const inCart = cart.some((item) => item.id === phone.id)

          return (
            <Card key={phone.id} className={`overflow-hidden د.ك {phone.isFeatured ? "border-amber-400 border-2" : ""}`}>
              <CardContent className="p-4">
                {phone.isFeatured && (
                  <Badge className="absolute top-2 left-2 bg-amber-400 text-black flex items-center gap-1">
                    <Star className="h-3 w-3" /> مميز
                  </Badge>
                )}
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold mb-2" dir="ltr">{phone.number}</h3>
                  <div className="flex justify-center gap-2 mb-2">
                    <Badge variant="outline">{phone.provider}</Badge>
                    <Badge variant="secondary">
                      {phone.type === "Standard"
                        ? "عادي"
                        : phone.type === "Premium"
                        ? "مميز"
                        : "راقي"}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary">د.ك {phone.price}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link  className="w-full" href={'https://api.whatsapp.com/send?phone=96552222255'} >
                  <Button variant="ghost" className="w-full bg-green-500 hover:bg-green-700 hover:text-white text-white " >
                    
                  <img src="/vercel.svg"alt="" className="mx-2 " width={30}/>

شراء
                  </Button>
                  </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {filteredPhoneNumbers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد أرقام تطابق معايير البحث.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setAreaCodeFilter("all")
              setTypeFilter("all")
            }}
          >
            إعادة تعيين التصفية
          </Button>
        </div>
      )}
    </div>
  )
}
