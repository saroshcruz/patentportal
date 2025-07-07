"use client"

import { useState, useEffect, useRef } from "react"

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
    <div ref={counterRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 font-medium text-lg">{label}</div>
    </div>
  )
}

export default function MilestoneCounter() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Track Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter end={1500} label="Cases Won" suffix="+" />
            <Counter end={20} label="Years Experience" suffix="+" />
            <Counter end={98} label="Client Satisfaction" suffix="%" />
          </div>
        </div>
      </div>
    </section>
  )
}
