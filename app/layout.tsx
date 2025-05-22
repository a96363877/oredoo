import type React from "react"
import "@/app/globals.css"
import { Tajawal } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import MetricsScript from "@/components/matric"

// Use Tajawal font which supports both Latin and Arabic scripts
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

export const metadata = {
  title: "Smart Pay ",
  description: "احصل على أحدث الاجهزة بأقل الأسعار الآن. ادفع شهرياً بالتقسيط السهل  ",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=AW-17067408622`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17067408622');
          `}
        </Script>
        <MetricsScript/>
      </body>
    </html>
  )
}
