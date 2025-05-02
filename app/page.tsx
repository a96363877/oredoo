import Image from "next/image"
import Link from "next/link"
import { Menu, ChevronUp, Shield, CreditCard } from "lucide-react"

export default function OoredooPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-gray-700" />
          <span className="text-red-600 font-medium">English</span>
        </div>
        <div className="w-32">
          <Image
            src="/next.svg"
            alt="Ooredoo Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Hero section with background image and overlay text */}
        <div className="relative w-full h-[500px]">
        <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-4 gap-8 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-gray-300 text-5xl flex items-center justify-center">
              {i % 5 === 0 && "💬"}
              {i % 5 === 1 && "📱"}
              {i % 5 === 2 && "📶"}
              {i % 5 === 3 && "🔖"}
              {i % 5 === 4 && "❓"}
            </div>
          ))}
        </div>
      </div>

          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ direction: "rtl" }}>
              احتضان التنوع في Ooredoo الكويت
            </h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ direction: "rtl" }}>
              في Ooredoo ، نشجع التنوع باعتباره حجر الزاوية في نجاحنا وقوتنا. نحن نؤمن بأن القوى العاملة المتنوعة
              والشاملة تغذي الابتكار وتعزز الإبداع وتدفع أعمالنا إلى الأمام. إن التزامنا بالتنوع يتجاوز مجرد الاعتراف؛
              إنها متأصلة في ثقافتنا وممارساتنا
            </p>
            <Link href="https://www.ooredoo.com.kw/" className="mt-6">
              <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
                لمعرفة المزيد
              </button>
            </Link>
          </div>
        </div>

        {/* Prices Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <CreditCard className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-center">الأسعار والباقات</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-center">الباقة الأساسية</h3>
                <div className="text-3xl font-bold text-center text-red-600 mb-4">
                  5 د.ك<span className="text-sm text-gray-500">/شهرياً</span>
                </div>
                <ul className="space-y-2 mb-6" style={{ direction: "rtl" }}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>500 دقيقة محلية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>2 جيجابايت إنترنت</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>100 رسالة نصية</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors">
                  اشترك الآن
                </button>
              </div>

              {/* Standard Plan */}
              <div className="border border-gray-200 rounded-lg p-6 bg-red-50 hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-xs">الأكثر شعبية</div>
                <h3 className="text-xl font-bold mb-2 text-center">الباقة القياسية</h3>
                <div className="text-3xl font-bold text-center text-red-600 mb-4">
                  10 د.ك<span className="text-sm text-gray-500">/شهرياً</span>
                </div>
                <ul className="space-y-2 mb-6" style={{ direction: "rtl" }}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>لا محدود دقائق محلية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>10 جيجابايت إنترنت</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>500 رسالة نصية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>اشتراك مجاني في خدمات الترفيه</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors">
                  اشترك الآن
                </button>
              </div>

              {/* Premium Plan */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-center">الباقة المتميزة</h3>
                <div className="text-3xl font-bold text-center text-red-600 mb-4">
                  20 د.ك<span className="text-sm text-gray-500">/شهرياً</span>
                </div>
                <ul className="space-y-2 mb-6" style={{ direction: "rtl" }}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>لا محدود دقائق محلية ودولية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>إنترنت لا محدود</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>رسائل نصية لا محدودة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>تجوال دولي مجاني</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>خدمة عملاء VIP</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Shield className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-center">سياسة الخصوصية</h2>
            </div>

            <div className="prose max-w-none" style={{ direction: "rtl" }}>
              <p className="mb-4">
                في Ooredoo، نحن ملتزمون بحماية خصوصيتك وأمان بياناتك الشخصية. تصف سياسة الخصوصية هذه كيفية جمعنا
                واستخدامنا وحمايتنا لمعلوماتك عند استخدام خدماتنا.
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2">المعلومات التي نجمعها</h3>
              <p className="mb-4">
                نجمع معلومات شخصية مثل الاسم والعنوان ورقم الهاتف وعنوان البريد الإلكتروني عند التسجيل في خدماتنا. كما
                نجمع معلومات حول استخدامك لخدماتنا، بما في ذلك سجلات المكالمات واستخدام البيانات والموقع الجغرافي.
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2">كيف نستخدم معلوماتك</h3>
              <p className="mb-4">
                نستخدم معلوماتك لتقديم وتحسين خدماتنا، ومعالجة المدفوعات، والتواصل معك بشأن الخدمات والعروض الترويجية،
                وتلبية التزاماتنا القانونية.
              </p>

              <h3 className="text-lg font-bold mt-6 mb-2">حماية البيانات</h3>
              <p className="mb-4">
                نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو الإفصاح عنها. نحن نستخدم تقنيات
                التشفير ونقيد الوصول إلى المعلومات الشخصية للموظفين المصرح لهم فقط.
              </p>

              <div className="mt-8 text-center">
                <Link href="#">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
                    قراءة السياسة الكاملة
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Go Up button */}
      <div className="flex justify-center my-6">
        <button className="flex items-center gap-1 border border-gray-300 rounded-full px-4 py-2 text-sm">
          <ChevronUp className="h-4 w-4" />
          Go Up
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center">
        <p className="text-sm" style={{ direction: "rtl" }}>
          © 2025 - جميع الحقوق لدى Ooredoo
        </p>
      </footer>
    </div>
  )
}
