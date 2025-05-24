import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=400&width=1200"
          alt="خلفية تكنولوجية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-teal-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">أهلاً بكم في مدونة الاتصالات</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
          المدونة المتخصصة في شركات الشحن والاتصالات
        </p>
        <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
          نعمل على تطوير مهندس الاتصالات العربي ليتمكن من النهوض ببلده في المجال التكنولوجي
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            استكشف المقالات
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8"
          >
            تعرف علينا
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
