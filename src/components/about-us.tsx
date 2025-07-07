"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export default function AboutUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div className="lg:col-span-8" variants={itemVariants}>
              <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8" variants={itemVariants}>
                About Us
              </motion.h2>

              <motion.div className="space-y-6 text-gray-600 leading-relaxed" variants={containerVariants}>
                <motion.p className="text-lg" variants={itemVariants}>
                  At LegalCo, we are committed to providing exceptional legal services that prioritize
                  <strong className="text-blue-900"> security, simplicity, and efficiency</strong>. Our firm has built a
                  reputation for delivering comprehensive intellectual property solutions that protect our clients' most
                  valuable assets while ensuring a seamless experience throughout the legal process.
                </motion.p>

                <motion.p className="text-lg" variants={itemVariants}>
                  Our mission is to bridge the gap between complex legal requirements and practical business needs. We
                  believe that legal services should be accessible, transparent, and results-driven. With our team of
                  experienced attorneys and cutting-edge technology, we streamline traditional legal processes to
                  deliver faster, more cost-effective solutions without compromising on quality.
                </motion.p>

                <motion.p className="text-lg" variants={itemVariants}>
                  We value integrity, innovation, and client satisfaction above all else. Our professional approach
                  combines deep legal expertise with modern efficiency, ensuring that every client receives personalized
                  attention and strategic guidance tailored to their unique needs. Trust LegalCo to secure your legal
                  future with confidence and peace of mind.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-4 flex justify-center" variants={itemVariants}>
              <motion.div
                className="bg-blue-50 rounded-full p-8"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="h-24 w-24 text-blue-900" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
