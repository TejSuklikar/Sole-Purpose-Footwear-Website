"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function ShoesFilters() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const sizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]
  const priceRanges = [
    { label: "Under $300", min: 0, max: 300 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "Over $500", min: 500, max: 1000 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`
                px-4 py-3 rounded-lg text-center font-medium transition-colors
                ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white border border-neutral-600"
                    : "bg-white text-black border border-neutral-300"
                }
              `}
              onClick={() => {
                setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox id={range.label} />
              <label htmlFor={range.label} className="text-sm text-neutral-300">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full px-4 py-2 border border-neutral-600 text-white rounded-lg">Clear Filters</button>
    </div>
  )
}
