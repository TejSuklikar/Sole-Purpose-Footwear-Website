import type { Metadata } from "next"
import { ShoesGrid } from "@/components/shoes-grid"
import { ShoesFilters } from "@/components/shoes-filters"

export const metadata: Metadata = {
  title: "Shoes - Soul Purpose Footwear",
  description: "Browse our collection of custom sneaker designs and artistry.",
}

export default function ShoesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Our Collection</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our gallery of custom designs, from bold geometric patterns to intricate artistic narratives.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ShoesFilters />
          </aside>
          <main className="flex-1">
            <ShoesGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
