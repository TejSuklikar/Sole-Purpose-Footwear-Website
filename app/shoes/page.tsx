import { ShoesGrid } from "@/components/shoes-grid"
import { ShoesFilters } from "@/components/shoes-filters"

export default function ShoesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
          <p className="text-neutral-400 text-lg">
            Discover our handcrafted custom sneakers, each piece telling a unique story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ShoesFilters />
          </div>
          <div className="lg:col-span-3">
            <ShoesGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
