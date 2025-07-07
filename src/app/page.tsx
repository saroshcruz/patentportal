"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import HeroBanner from "@/components/hero-banner"
import ServicesSection from "@/components/services-section"
import AboutUs from "@/components/about-us"
import MilestoneCounter from "@/components/milestone-counter"

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Hero Banner */}
        <motion.div variants={sectionVariants}>
          <HeroBanner />
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ServicesSection />
        </motion.div>

        {/* About Us Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AboutUs />
        </motion.div>

        {/* Milestone Counter Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <MilestoneCounter />
        </motion.div>
      </motion.div>
    </div>
  )
}
