import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-lg font-semibold">مدونة الأتصالات</div>
        <nav>
          <Link href="/" className="px-4 py-2 uppercase">
            HOME
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gray-400 z-0">
          <div className="w-full h-full bg-[url(https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg)] bg-cover opacity-80"></div>
        </div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold mb-2">اهلا بكم</h1>
          <p className="text-xl">المدونة المتخصصة بشركات الشحن والاتصالات</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto py-8 px-4">
        <article className="border-b border-gray-200 py-6">
          <h2 className="text-xl font-semibold mb-2">
            نحن نعمل على تطوير مهندس الإتصالات العربي ليتمكن من النهوض ببلده في المجال التكنولوجي. إذ يكفي أن تمتلك
            العزيمة والإصرار على التعلم
          </h2>
          <h3 className="text-lg mb-2">؟ أسباب ظهور و ماهيةIP over DWDM (IPoDWDM) Technology هي تقنية</h3>
          <p className="text-sm text-gray-600">
            Posted by <span className="text-blue-600">Start Bootstrap</span> on September 24, 2018
          </p>
        </article>

        <article className="border-b border-gray-200 py-6">
          <h2 className="text-xl font-semibold mb-2">في هندسة الاتصالات Python تحليل البيانات باستخدام بايثون</h2>
          <p className="text-sm text-gray-600">
            Posted by <span className="text-blue-600">Start Bootstrap</span> on September 18, 2018
          </p>
        </article>

        <article className="border-b border-gray-200 py-6">
          <h2 className="text-xl font-semibold mb-2">الخطوة الأولى نحو تصميم مواقع احترافية</h2>
          <p className="text-sm text-gray-600">
            Posted by <span className="text-blue-600">Start Bootstrap</span> on August 24, 2018
          </p>
        </article>

        <div className="flex justify-center mt-8">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">OLDER POSTS =</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="#" className="bg-gray-800 text-white p-2 rounded-full">
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
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </Link>
          <Link href="#" className="bg-gray-800 text-white p-2 rounded-full">
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
              className="h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </Link>
          <Link href="#" className="bg-gray-800 text-white p-2 rounded-full">
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
              className="h-5 w-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </Link>
        </div>
        <p className="text-gray-600">Copyright © 2025 مدونة الأتصالات</p>
      </footer>
    </main>
  )
}
