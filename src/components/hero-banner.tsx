//components>hero-banner.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    headline: "Secure Your Legal Future",
    subheadline:
      "Protect your innovations with our comprehensive IP services and expert legal guidance. From patents to trademarks, we safeguard what matters most to your business.",
    id: 1,
  },
  {
    headline: "Corporate Law Excellence",
    subheadline:
      "Navigate complex business transactions with confidence. Our corporate attorneys provide strategic counsel for mergers, acquisitions, and regulatory compliance.",
    id: 2,
  },
  {
    headline: "Litigation & Dispute Resolution",
    subheadline:
      "Resolve conflicts efficiently with our experienced trial attorneys. We deliver aggressive representation while exploring cost-effective settlement opportunities.",
    id: 3,
  },
  {
    headline: "Employment Law Expertise",
    subheadline:
      "Protect your workforce and business interests. From employment contracts to workplace compliance, we ensure your HR practices meet all legal requirements.",
    id: 4,
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentSlide(index)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    },
    [isTransitioning],
  )

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % slides.length
    goToSlide(nextIndex)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(prevIndex)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide, isTransitioning])

  return (
    <section className="relative w-full h-96 md:h-[500px] bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="min-w-full h-full flex items-center justify-center flex-shrink-0">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{slide.headline}</h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                  {slide.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                    Get Started
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentSlide ? "bg-white scale-110 shadow-lg" : "bg-white/50 hover:bg-white/70 hover:scale-105"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}