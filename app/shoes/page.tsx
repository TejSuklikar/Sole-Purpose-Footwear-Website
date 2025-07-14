"use client"

import { ShoesGrid } from "@/components/shoes-grid"

export default function ShoesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">Our Collection</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Explore our gallery of custom designs, from bold geometric patterns to intricate artistic narratives.
          </p>
        </div>

        <main>
          <ShoesGrid />
        </main>
      </div>
    </div>
  )
}
