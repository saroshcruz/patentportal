"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const countries = ["India", "US", "Japan"]

  const getNavigationItems = () => {
    const baseItems = ["Services", "About Us", "Contact"]

    if (selectedCountry === "US" || selectedCountry === "India") {
      return [...baseItems, "Client Login"]
    } else if (selectedCountry === "Japan") {
      return [...baseItems, "IP Consulting"]
    }

    return baseItems
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-blue-900">LegalCo Logo</div>
          </div>

          {/* Right side - Country Dropdown and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Country Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200"
              >
                <span className="font-medium">{selectedCountry}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country)
                        setIsDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {getNavigationItems().map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-900 font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-blue-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
