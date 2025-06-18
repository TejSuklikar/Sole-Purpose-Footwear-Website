"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface FiltersProps {
  onFiltersChange: (filters: { sizes: string[]; priceRanges: { min: number; max: number }[] }) => void
}

export function ShoesFilters({ onFiltersChange }: FiltersProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  const sizes = [
    // Men's sizes (starting from 7, as youth 7 = men's 7)
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "13.5",
    "14",
    "15",
    // Women's sizes
    "5W",
    "5.5W",
    "6W",
    "6.5W",
    "7W",
    "7.5W",
    "8W",
    "8.5W",
    "9W",
    "9.5W",
    "10W",
    "10.5W",
    "11W",
    "11.5W",
    "12W",
    // Toddler sizes (0-13)
    "0C",
    "1C",
    "2C",
    "3C",
    "4C",
    "5C",
    "6C",
    "7C",
    "8C",
    "9C",
    "10C",
    "11C",
    "12C",
    "13C",
    // Youth sizes (1-7, where 7Y = 7 Men's)
    "1Y",
    "1.5Y",
    "2Y",
    "2.5Y",
    "3Y",
    "3.5Y",
    "4Y",
    "4.5Y",
    "5Y",
    "5.5Y",
    "6Y",
    "6.5Y",
    "7Y",
  ]
  const priceRanges = [
    { label: "Under $300", min: 0, max: 300 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "Over $500", min: 500, max: 1000 },
  ]

  const handleSizeChange = (size: string) => {
    const newSizes = selectedSizes.includes(size) ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size]

    setSelectedSizes(newSizes)

    const activePriceRanges = priceRanges.filter((range) => selectedPriceRanges.includes(range.label))

    onFiltersChange({ sizes: newSizes, priceRanges: activePriceRanges })
  }

  const handlePriceRangeChange = (rangeLabel: string) => {
    const newPriceRanges = selectedPriceRanges.includes(rangeLabel)
      ? selectedPriceRanges.filter((r) => r !== rangeLabel)
      : [...selectedPriceRanges, rangeLabel]

    setSelectedPriceRanges(newPriceRanges)

    const activePriceRanges = priceRanges.filter((range) => newPriceRanges.includes(range.label))

    onFiltersChange({ sizes: selectedSizes, priceRanges: activePriceRanges })
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedPriceRanges([])
    onFiltersChange({ sizes: [], priceRanges: [] })
  }

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
              onClick={() => handleSizeChange(size)}
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
              <Checkbox
                id={range.label}
                checked={selectedPriceRanges.includes(range.label)}
                onCheckedChange={() => handlePriceRangeChange(range.label)}
              />
              <label htmlFor={range.label} className="text-sm text-neutral-300">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-full px-4 py-2 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition-colors"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}
