"use client"
import { useState } from "react"
import { ShoesGrid } from "@/components/shoes-grid"
import { ShoesFilters } from "@/components/shoes-filters"

interface FilterState {
  selectedSizes: string[]
  priceRanges: { min: number; max: number }[]
}

export default function ShoesPage() {
  const [filters, setFilters] = useState<FilterState>({
    selectedSizes: [],
    priceRanges: [],
  })

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      selectedSizes: [],
      priceRanges: [],
    })
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
            <ShoesFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={clearFilters} />
          </aside>
          <main className="flex-1">
            <ShoesGrid filters={filters} />
          </main>
        </div>
      </div>
    </div>
  )
}
