"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { type LucideIcon, ArrowRight } from "lucide-react"

interface EnhancedServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  features: string[]
}

export default function EnhancedServiceCard({
  title,
  description,
  icon: Icon,
  href,
  features,
}: EnhancedServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
            <Icon className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{description}</p>

        {/* Features */}
        <div className="mb-8">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Link href={href} className="mt-auto">
          <motion.button
            className="w-full bg-blue-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">Get Started</span>
            <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}
