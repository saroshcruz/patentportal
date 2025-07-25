//components>services-section.tsx
"use client"

import { easeOut, motion } from "framer-motion"
<<<<<<< HEAD
import { Search, FileText, Lightbulb } from "lucide-react"
=======
import { Search, PenTool, FileText, Gavel } from "lucide-react"
>>>>>>> 7da33eb (updated for discount and new page check if my idea is patentable)
import EnhancedServiceCard from "@/components/enhanced-service-card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const services = [
  {
    title: "Patentability Search",
    description: "Comprehensive prior art search to determine the patentability of your invention before filing.",
    icon: Search,
    href: "/services/patentability-search",
    features: [
      "Global patent database search",
      "Technical literature review",
      "Detailed patentability report",
      "Strategic recommendations",
    ],
  },
  {
    title: "Patent Drafting",
    description:
      "Professional patent application drafting with precise technical specifications and optimal claim structure.",
    icon: PenTool,
    href: "/services/patent-drafting",
    features: [
      "Technical specification writing",
      "Claims drafting and optimization",
      "Detailed drawings preparation",
      "Abstract and summary creation",
    ],
  },
  {
    title: "Patent Filing",
    description: "Expert assistance in preparing and filing patent applications with maximum protection scope.",
    icon: FileText,
    href: "/services/patent-filing",
    features: [
      "Multi-jurisdiction filing",
      "Priority claim management",
      "Filing strategy consultation",
      "Documentation preparation",
    ],
  },
  {
    title: "Patent Prosecution",
    description: "Comprehensive patent prosecution services to navigate the examination process successfully.",
    icon: Gavel,
    href: "/services/patent-prosecution",
    features: ["Office action responses", "Examiner interviews", "Appeal proceedings", "Patent grant management"],
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                Our Services
              </span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Comprehensive Patent Solutions
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-6"
            />
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From initial search to final grant, we provide end-to-end patent services to protect your innovations and
              secure your intellectual property rights.
            </motion.p>
          </motion.div>

          {/* Services Grid - 4 columns */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <EnhancedServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.p className="text-lg text-gray-600 mb-8" variants={itemVariants}>
              Ready to protect your intellectual property?
            </motion.p>
            <motion.button
              className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


