/*
"use client"

import { useEffect, useState } from "react"

export default function EstimateCalculator({
  onEstimateChange,
}: {
  onEstimateChange?: (data: any) => void
}) {
  const [keywords, setKeywords] = useState(5)
  const [complexity, setComplexity] = useState("Medium")

  useEffect(() => {
    const baseCost = keywords * 50
    const complexityMultiplier = {
      Low: 1.0,
      Medium: 1.5,
      High: 2.0,
    }

    const estimatedCost =
      baseCost * complexityMultiplier[complexity as keyof typeof complexityMultiplier]

    // Emit to parent
    if (onEstimateChange) {
      onEstimateChange({ keywords, complexity, estimatedCost })
    }
  }, [keywords, complexity, onEstimateChange])

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
            onChange={(e) => setKeywords(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low - Simple mechanical inventions</option>
            <option value="Medium">Medium - Electronic or software inventions</option>
            <option value="High">High - Complex biotechnology or pharmaceutical</option>
          </select>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-300 mt-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Estimated Cost</p>
            <p className="text-3xl font-bold text-blue-900">
              ${((keywords * 50) * (complexity === "Low" ? 1 : complexity === "Medium" ? 1.5 : 2)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">*Final cost may vary based on specific requirements</p>
          </div>
        </div>
      </div>
    </div>
  )
}
*/

"use client";

import { useEffect, useState } from "react";

export default function EstimateCalculator({
  onEstimateChange,
}: {
  onEstimateChange?: (data: any) => void;
}) {
  const [keywords, setKeywords] = useState(5);
  const [complexity, setComplexity] = useState("Medium");
  const [discountedCost, setDiscountedCost] = useState<number | null>(null);
  const [baseCost, setBaseCost] = useState(0);
  const [finalCost, setFinalCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Read from environment variables (must start with NEXT_PUBLIC_)
  const enableDiscount = process.env.NEXT_PUBLIC_ENABLE_DISCOUNT === "true";
  const discountPercentage = parseFloat(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE || '0');
  const discountExpiryDate = new Date(process.env.NEXT_PUBLIC_DISCOUNT_EXPIRY_DATE || '1970-01-01');
  const offerType = process.env.NEXT_PUBLIC_OFFER_TYPE || '';
  const showEarlyBird = process.env.NEXT_PUBLIC_SHOW_EARLY_BIRD_OFFER === 'true';
  const showIncentives = process.env.NEXT_PUBLIC_SHOW_INCENTIVES === 'true';  
  const isDiscountActive = new Date() <= discountExpiryDate;

  useEffect(() => {
    const base = keywords * 50;
    const multiplier = {
      Low: 1.0,
      Medium: 1.5,
      High: 2.0,
    };

    const multiplierValue = multiplier[complexity as keyof typeof multiplier] || 1;
    const cost = base * multiplierValue;
    const discount = isDiscountActive ? (cost * discountPercentage) / 100 : 0;
    const total = cost - discount;

    setBaseCost(cost);
    setDiscountAmount(discount);
    setFinalCost(total);
    setDiscountedCost(isDiscountActive ? total : null);

    if (onEstimateChange) {
      onEstimateChange({ keywords, complexity, estimatedCost: total });
    }
  }, [keywords, complexity, isDiscountActive, discountPercentage, onEstimateChange]);

  return (
    <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Estimate Your Cost</h3>
      <p className="text-gray-600 mb-8">Get an instant estimate for your patentability search.</p>

      {isDiscountActive && (
        <div className="bg-yellow-100 text-yellow-900 px-4 py-3 mb-4 rounded-lg border border-yellow-300">
          <strong className="block text-lg font-semibold">
            {offerType === "inaugural"
              ? "Don't miss our early bird inaugural offer!"
              : "Announcing special seasonal incentives!"}
          </strong>
          <span>Get {discountPercentage}% off until {discountExpiryDate.toDateString()}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Keyword Input */}
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
            onChange={(e) => setKeywords(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Complexity Selector */}
        <div>
          <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-2">
            Complexity Level
          </label>
          <select
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low - Simple mechanical inventions</option>
            <option value="Medium">Medium - Electronic or software inventions</option>
            <option value="High">High - Complex biotechnology or pharmaceutical</option>
          </select>
        </div>

        {/* Display Pricing */}
        <div className="bg-white rounded-lg p-6 border-2 border-blue-300 mt-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Cost</p>
            <p className="text-3xl font-bold text-blue-900">
              {discountedCost !== null ? (
                <>
                  <span className="line-through text-gray-400 mr-2">
                    ₹{baseCost.toLocaleString()}
                  </span>
                  ₹{discountedCost.toLocaleString()}
                </>
              ) : (
                <>₹{baseCost.toLocaleString()}</>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">*Final cost may vary based on specific requirements</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div className="text-xl font-semibold text-gray-800">Estimate Summary</div>

          <div className="flex justify-between text-gray-700">
            <span>Estimated Cost</span>
            <span>₹{baseCost.toLocaleString()}</span>
          </div>

          {isDiscountActive && (
            <div className="flex justify-between text-green-700">
              <span>Discount ({discountPercentage}%)</span>
              <span>- ₹{discountAmount.toLocaleString()}</span>
            </div>
          )}

          <hr />

          <div className="flex justify-between font-bold text-blue-900 text-lg">
            <span>Total Cost</span>
            <span>₹{finalCost.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
