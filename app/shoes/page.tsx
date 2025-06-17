"use client"

import { useState } from "react"
import { ShoesGrid } from "@/components/shoes-grid"
import { ShoesFilters } from "@/components/shoes-filters"

// Note: Since we're using client component, we can't export metadata
// The metadata would need to be in a parent server component or layout

export default function ShoesPage() {
  const [filters, setFilters] = useState<{
    sizes: string[]
    priceRanges: { min: number; max: number }[]
  }>({
    sizes: [],
    priceRanges: [],
  })

  const handleFiltersChange = (newFilters: { sizes: string[]; priceRanges: { min: number; max: number }[] }) => {
    setFilters(newFilters)
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">Our Collection</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Explore our gallery of custom designs, from bold geometric patterns to intricate artistic narratives.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ShoesFilters onFiltersChange={handleFiltersChange} />
          </aside>
          <main className="flex-1">
            <ShoesGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  )
}
