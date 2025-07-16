"use client"

import { useState, useEffect } from "react"

export default function EstimateCalculator() {
  const [keywords, setKeywords] = useState(5)
  const [complexity, setComplexity] = useState("Medium")
  const [estimatedCost, setEstimatedCost] = useState(0)

  const calculateCost = () => {
    const baseCost = keywords * 50 // $50 per keyword

    const complexityMultiplier = {
      Low: 1.0,
      Medium: 1.5,
      High: 2.0,
    }

    const finalCost = baseCost * complexityMultiplier[complexity as keyof typeof complexityMultiplier]
    setEstimatedCost(finalCost)
  }

  useEffect(() => {
    calculateCost()
  }, [keywords, complexity])

  return (
    <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Estimate Your Cost</h3>
      <p className="text-gray-600 mb-8">Get an instant estimate for your patentability search.</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Keywords to Search
          </label>
          <input
            type="number"
            id="keywords"
            min="1"
            max="50"
            value={keywords}
            onChange={(e) => setKeywords(Number.parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-2">
            Complexity Level
          </label>
          <select
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="Low">Low - Simple mechanical inventions</option>
            <option value="Medium">Medium - Electronic or software inventions</option>
            <option value="High">High - Complex biotechnology or pharmaceutical</option>
          </select>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Estimated Cost</p>
            <p className="text-3xl font-bold text-blue-900">${estimatedCost.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">*Final cost may vary based on specific requirements</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Calculation:</strong>
          </p>
          <p>
            • Base cost: {keywords} keywords × $50 = ${(keywords * 50).toLocaleString()}
          </p>
          <p>
            • Complexity multiplier: {complexity} (
            {complexity === "Low" ? "1.0x" : complexity === "Medium" ? "1.5x" : "2.0x"})
          </p>
          <p>
            • <strong>Total: ${estimatedCost.toLocaleString()}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
