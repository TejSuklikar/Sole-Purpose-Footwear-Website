"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function ShoesFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
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
        <h3 className="font-semibold text-lg mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
              }}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox id={range.label} />
              <label htmlFor={range.label} className="text-sm">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  )
}
