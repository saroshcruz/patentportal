/*
"use client"

import { useState, useEffect, useRef } from "react"
import { easeOut, motion } from "framer-motion"

interface CounterProps {
  end: number
  label: string
  suffix?: string
}

function Counter({ end, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, end])

  return (
    <motion.div
      ref={counterRef}
      className="text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="text-5xl md:text-6xl font-bold text-blue-900 mb-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        {count.toLocaleString()}
        {suffix}
      </motion.div>
      <div className="text-gray-600 font-medium text-lg">{label}</div>
    </motion.div>
  )
}

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
      ease: easeOut
    },
  },
}

export default function MilestoneCounter() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-4xl font-bold text-center text-gray-900 mb-12" variants={itemVariants}>
            Our Track Record
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Counter end={1500} label="Cases Won" suffix="+" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Counter end={20} label="Years Experience" suffix="+" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Counter end={98} label="Client Satisfaction" suffix="%" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
*/

//components>milestone-counter.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface CounterProps {
  end: number
  label: string
  suffix?: string
  description?: string
}

function Counter({ end, label, suffix = "", description }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2500 // 2.5 seconds for smoother animation
    const steps = 100 // More steps for smoother counting
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, end])

  return (
    <motion.div
      ref={counterRef}
      className="text-center group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="text-5xl md:text-6xl font-bold text-blue-900 mb-3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </motion.div>

      <motion.div
        className="text-gray-800 font-semibold text-xl mb-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        {label}
      </motion.div>

      {description && (
        <motion.p
          className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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

export default function MilestoneCounter() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              Our Track Record
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
              Decades of legal excellence with proven results that speak for themselves. Our commitment to client
              success drives everything we do.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Counter
                end={1500}
                label="Cases Won"
                suffix="+"
                description="Successfully resolved legal matters across multiple practice areas with favorable outcomes for our clients"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Counter
                end={25}
                label="Years Experience"
                suffix="+"
                description="Decades of combined legal expertise serving individuals and businesses with dedication and professionalism"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Counter
                end={98}
                label="Client Satisfaction"
                suffix="%"
                description="Consistently high client satisfaction ratings reflecting our commitment to exceptional legal service and results"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gray-500 text-sm italic">
              {"*"} Results based on cases handled from 2000-2024. Individual results may vary.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
