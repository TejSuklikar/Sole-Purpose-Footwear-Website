"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface FilterState {
  selectedSizes: string[]
  priceRanges: { min: number; max: number }[]
}

interface ShoesFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function ShoesFilters({ filters, onFiltersChange, onClearFilters }: ShoesFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const sizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]
  const priceRanges = [
    { label: "Under $300", min: 0, max: 300 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "Over $500", min: 500, max: 1000 },
  ]

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleSizeToggle = (size: string) => {
    const newSelectedSizes = localFilters.selectedSizes.includes(size)
      ? localFilters.selectedSizes.filter((s) => s !== size)
      : [...localFilters.selectedSizes, size]

    const newFilters = { ...localFilters, selectedSizes: newSelectedSizes }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceRangeToggle = (range: { min: number; max: number }) => {
    const isSelected = localFilters.priceRanges.some((r) => r.min === range.min && r.max === range.max)
    const newPriceRanges = isSelected
      ? localFilters.priceRanges.filter((r) => !(r.min === range.min && r.max === range.max))
      : [...localFilters.priceRanges, range]

    const newFilters = { ...localFilters, priceRanges: newPriceRanges }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = localFilters.selectedSizes.length > 0 || localFilters.priceRanges.length > 0

  return (
    <div className="space-y-6 bg-neutral-900/50 p-4 sm:p-6 rounded-lg border border-neutral-800">
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`
                px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-center font-medium transition-colors text-sm sm:text-base
                ${
                  localFilters.selectedSizes.includes(size)
                    ? "bg-white text-black border-2 border-white"
                    : "bg-neutral-800 text-white border border-neutral-600 hover:bg-neutral-700"
                }
              `}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => {
            const isSelected = localFilters.priceRanges.some((r) => r.min === range.min && r.max === range.max)
            return (
              <div key={range.label} className="flex items-center space-x-3">
                <Checkbox
                  id={range.label}
                  checked={isSelected}
                  onCheckedChange={() => handlePriceRangeToggle(range)}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor={range.label} className="text-sm sm:text-base text-neutral-300 cursor-pointer">
                  {range.label}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      <Button
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Filters
        {hasActiveFilters && (
          <span className="ml-2 bg-white text-black rounded-full px-2 py-0.5 text-xs">
            {localFilters.selectedSizes.length + localFilters.priceRanges.length}
          </span>
        )}
      </Button>

      {hasActiveFilters && (
        <div className="text-xs text-neutral-400">
          <p>Active filters:</p>
          {localFilters.selectedSizes.length > 0 && <p>Sizes: {localFilters.selectedSizes.join(", ")}</p>}
          {localFilters.priceRanges.length > 0 && (
            <p>Price: {localFilters.priceRanges.map((r) => `$${r.min}-${r.max}`).join(", ")}</p>
          )}
        </div>
      )}
    </div>
  )
}
