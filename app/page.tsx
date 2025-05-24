import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BlogPosts } from "@/components/blog-posts"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "مدونة الاتصالات - المدونة المتخصصة في شركات الشحن والاتصالات",
  description: "نعمل على تطوير مهندس الاتصالات العربي ليتمكن من النهوض ببلده في المجال التكنولوجي",
  keywords: ["اتصالات", "تكنولوجيا", "هندسة", "شحن", "عربي"],
  authors: [{ name: "مدونة الاتصالات" }],
  openGraph: {
    title: "مدونة الاتصالات",
    description: "المدونة المتخصصة في شركات الشحن والاتصالات",
    type: "website",
    locale: "ar_SA",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BlogPosts />
      </main>
      <Footer />
    </div>
  )
}
