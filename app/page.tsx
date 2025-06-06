"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Users, Network, ChevronRight, BarChart3, Signal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GlobalTelecommunications() {
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [activeTab, setActiveTab] = useState("overview")

  const globalMetrics = [
    {
      title: "Total Connections",
      value: "9.2B",
      change: "+4.8%",
      icon: <Network className="h-5 w-5" />,
      description: "Active mobile connections worldwide",
    },
    {
      title: "5G Deployment",
      value: "42%",
      change: "+18%",
      icon: <Signal className="h-5 w-5" />,
      description: "Global 5G network coverage",
    },
    {
      title: "Digital Users",
      value: "5.44B",
      change: "+2.1%",
      icon: <Users className="h-5 w-5" />,
      description: "Active internet users globally",
    },
    {
      title: "Revenue Growth",
      value: "$1.9T",
      change: "+5.2%",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Global telecom market size",
    },
  ]

  const regions = [
    {
      id: "global",
      name: "Worldwide",
      flag: "🌍",
      connections: "9.2B",
      growth: "+4.8%",
      infrastructure: "Advanced",
      marketShare: "100%",
    },
    {
      id: "asia",
      name: "Asia Pacific",
      flag: "🌏",
      connections: "4.8B",
      growth: "+6.2%",
      infrastructure: "Leading",
      marketShare: "52%",
    },
    {
      id: "europe",
      name: "Europe",
      flag: "🇪🇺",
      connections: "1.3B",
      growth: "+2.1%",
      infrastructure: "Mature",
      marketShare: "14%",
    },
    {
      id: "americas",
      name: "Americas",
      flag: "🌎",
      connections: "1.9B",
      growth: "+3.4%",
      infrastructure: "Advanced",
      marketShare: "21%",
    },
    {
      id: "africa",
      name: "Africa",
      flag: "🌍",
      connections: "1.0B",
      growth: "+8.7%",
      infrastructure: "Emerging",
      marketShare: "11%",
    },
    {
      id: "oceania",
      name: "Oceania",
      flag: "🇦🇺",
      connections: "200M",
      growth: "+1.8%",
      infrastructure: "Developed",
      marketShare: "2%",
    },
  ]

  const topOperators = [
    {
      name: "China Mobile",
      region: "Asia Pacific",
      subscribers: "984M",
      revenue: "$115B",
      technology: "5G SA",
      rank: 1,
      specialty: "Network Scale",
    },
    {
      name: "Reliance Jio",
      region: "Asia Pacific",
      subscribers: "450M",
      revenue: "$25B",
      technology: "Digital Services",
      rank: 2,
      specialty: "Innovation",
    },
    {
      name: "Verizon",
      region: "North America",
      subscribers: "118M",
      revenue: "$140B",
      technology: "mmWave 5G",
      rank: 3,
      specialty: "Premium Services",
    },
    {
      name: "AT&T",
      region: "North America",
      subscribers: "210M",
      revenue: "$168B",
      technology: "Fiber + 5G",
      rank: 4,
      specialty: "Enterprise",
    },
    {
      name: "Orange",
      region: "Europe/Africa",
      subscribers: "266M",
      revenue: "$45B",
      technology: "Multi-region",
      rank: 5,
      specialty: "Convergence",
    },
    {
      name: "T-Mobile",
      region: "Global",
      subscribers: "315M",
      revenue: "$80B",
      technology: "Un-carrier",
      rank: 6,
      specialty: "Customer Experience",
    },
  ]

  const technologyTrends = [
    {
      name: "5G Standalone",
      adoption: "28%",
      growth: "+35%",
      impact: "High",
      timeline: "2024-2026",
      description: "Full 5G architecture deployment",
      keyFeatures: ["Ultra-low latency", "Network slicing", "Edge computing", "Massive IoT"],
    },
    {
      name: "Open RAN",
      adoption: "15%",
      growth: "+120%",
      impact: "Transformative",
      timeline: "2024-2027",
      description: "Open radio access network standards",
      keyFeatures: ["Vendor interoperability", "Cost reduction", "Innovation acceleration", "Supply chain diversity"],
    },
    {
      name: "Private Networks",
      adoption: "8%",
      growth: "+85%",
      impact: "Significant",
      timeline: "2024-2025",
      description: "Enterprise-dedicated cellular networks",
      keyFeatures: ["Enhanced security", "Customized coverage", "Industry 4.0", "Critical communications"],
    },
    {
      name: "Satellite Integration",
      adoption: "5%",
      growth: "+200%",
      impact: "Revolutionary",
      timeline: "2025-2030",
      description: "Terrestrial-satellite network convergence",
      keyFeatures: ["Global coverage", "Disaster resilience", "Rural connectivity", "IoT backhauling"],
    },
  ]

  const emergingTech = [
    {
      title: "6G Research",
      status: "Development",
      timeline: "2030+",
      investment: "$50B+",
      leaders: ["Nokia", "Ericsson", "Samsung"],
      capabilities: "Terahertz frequencies, AI-native, holographic communications",
    },
    {
      title: "Quantum Communications",
      status: "Pilot",
      timeline: "2027+",
      investment: "$12B+",
      leaders: ["IBM", "Google", "Huawei"],
      capabilities: "Unhackable security, quantum internet, distributed computing",
    },
    {
      title: "AI Network Orchestration",
      status: "Deployment",
      timeline: "2024+",
      investment: "$25B+",
      leaders: ["Cisco", "Juniper", "VMware"],
      capabilities: "Self-healing networks, predictive maintenance, automated optimization",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">Global Telecom Intelligence</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real-time insights into worldwide telecommunications infrastructure, market dynamics, and emerging
              technologies
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {globalMetrics.map((metric, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-slate-100 rounded-lg">{metric.icon}</div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900">{metric.value}</h3>
                  <p className="text-sm font-medium text-slate-700">{metric.title}</p>
                  <p className="text-xs text-slate-500">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Regional Analysis */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Regional Market Analysis</h2>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "overview" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </Button>
              <Button
                variant={activeTab === "growth" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("growth")}
              >
                Growth
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region) => (
              <Card
                key={region.id}
                className={`border cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedRegion === region.id ? "border-slate-900 shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{region.name}</h3>
                      <p className="text-sm text-slate-500">Market Share: {region.marketShare}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Connections</span>
                      <span className="font-medium">{region.connections}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Growth Rate</span>
                      <Badge variant="outline" className="text-xs">
                        {region.growth}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Infrastructure</span>
                      <span className="text-sm font-medium">{region.infrastructure}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Top Operators */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Leading Global Operators</h2>
          <div className="space-y-4">
            {topOperators.map((operator, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                        {operator.rank}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{operator.name}</h3>
                        <p className="text-sm text-slate-500">{operator.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-slate-900">{operator.subscribers}</div>
                        <div className="text-slate-500">Subscribers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-900">{operator.revenue}</div>
                        <div className="text-slate-500">Revenue</div>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">{operator.technology}</Badge>
                        <div className="text-slate-500 mt-1">{operator.specialty}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Technology Trends */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Technology Adoption Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technologyTrends.map((tech, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {tech.timeline}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          tech.impact === "High"
                            ? "text-orange-600 border-orange-200"
                            : tech.impact === "Transformative"
                              ? "text-purple-600 border-purple-200"
                              : tech.impact === "Significant"
                                ? "text-blue-600 border-blue-200"
                                : "text-red-600 border-red-200"
                        }`}
                      >
                        {tech.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{tech.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Adoption Rate</span>
                        <span className="font-medium">{tech.adoption}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-slate-900 h-2 rounded-full" style={{ width: tech.adoption }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Growth</div>
                      <div className="font-semibold text-green-600">{tech.growth}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tech.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Emerging Technologies */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Emerging Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergingTech.map((tech, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{tech.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {tech.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{tech.capabilities}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timeline</span>
                      <span className="font-medium">{tech.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Investment</span>
                      <span className="font-medium">{tech.investment}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Key Players</span>
                      <div className="flex flex-wrap gap-1">
                        {tech.leaders.map((leader, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {leader}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="border border-gray-200 bg-slate-50">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Stay Connected to Innovation</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Access comprehensive market intelligence, technology insights, and strategic analysis to navigate the
                evolving telecommunications landscape.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Get Market Report
                </Button>
                <Button size="lg" variant="outline">
                  Technology Roadmap
                </Button>
                <Button size="lg" variant="outline">
                   Industry Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
