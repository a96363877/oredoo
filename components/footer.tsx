import Link from "next/link"
import { Mail, Phone, Twitter, Facebook, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    main: [
      { href: "/", label: "الرئيسية" },
      { href: "/about", label: "من نحن" },
      { href: "/categories", label: "التصنيفات" },
      { href: "/contact", label: "اتصل بنا" },
    ],
    categories: [
      { href: "/category/networks", label: "شبكات الاتصالات" },
      { href: "/category/programming", label: "البرمجة" },
      { href: "/category/web-development", label: "تطوير الويب" },
      { href: "/category/technology", label: "التكنولوجيا" },
    ],
    legal: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/terms", label: "شروط الاستخدام" },
      { href: "/sitemap", label: "خريطة الموقع" },
    ],
  }

  const socialLinks = [
    { href: "#", icon: Twitter, label: "تويتر" },
    { href: "#", icon: Facebook, label: "فيسبوك" },
    { href: "#", icon: Linkedin, label: "لينكد إن" },
    { href: "#", icon: Youtube, label: "يوتيوب" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ت</span>
              </div>
              <span className="text-xl font-bold">مدونة الاتصالات</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              نعمل على تطوير مهندس الاتصالات العربي ليتمكن من النهوض ببلده في المجال التكنولوجي
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@telecom-blog.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+966 50 123 4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">التصنيفات</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">النشرة البريدية</h3>
            <p className="text-gray-300 mb-4">اشترك في نشرتنا البريدية لتصلك أحدث المقالات</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-right"
                dir="rtl"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">اشتراك</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">© {currentYear} مدونة الاتصالات. جميع الحقوق محفوظة.</div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && <span className="text-gray-600">|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
