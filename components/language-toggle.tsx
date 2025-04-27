"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "ar">("ar")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 px-4 py-2 h-auto"
      onClick={toggleLanguage}
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
        <Globe className="w-4 h-4 text-gray-700" />
      </span>
      <span className="font-medium text-gray-800">{language === "en" ? "English" : "دفع"}</span>
    </Button>
  )
}
