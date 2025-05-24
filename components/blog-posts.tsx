import Link from "next/link"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  featured?: boolean
  img?:string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "تقنية IP over DWDM (IPoDWDM) - الأسباب والماهية",
    excerpt:
      "نحن نعمل على تطوير مهندس الاتصالات العربي ليتمكن من النهوض ببلده في المجال التكنولوجي. إذ يكفي أن تمتلك العزيمة والإصرار على التعلم",
    author: "فريق التحرير",
    date: "24 سبتمبر، 2024",
    readTime: "5 دقائق",
    category: "تقنيات الشبكات",
    featured: true,
    img:"/11.png"
  },
  {
    id: "2",
    title: "تحليل البيانات باستخدام Python في هندسة الاتصالات",
    excerpt: "دليل شامل لاستخدام لغة البايثون في تحليل بيانات الشبكات وتحسين الأداء",
    author: "د. أحمد محمد",
    date: "18 سبتمبر، 2024",
    readTime: "8 دقائق",
    category: "برمجة",
    img:"/data-analysis-python02.jpeg.webp"

  },
  {
    id: "3",
    title: "الخطوة الأولى نحو تصميم مواقع احترافية",
    excerpt: "تعلم أساسيات تصميم المواقع الإلكترونية وأفضل الممارسات في التطوير",
    author: "سارة أحمد",
    date: "24 أغسطس، 2024",
    readTime: "6 دقائق",
    category: "تطوير الويب",
    img:"/images (1).jpeg"

  },
]

export function BlogPosts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أحدث المقالات</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث المقالات والدروس في عالم الاتصالات والتكنولوجيا
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <Card key={post.id} className="mb-8 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline">مقال مميز</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm">
                        اقرأ المزيد
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        اقرأ المقال
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
            عرض المزيد من المقالات
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
