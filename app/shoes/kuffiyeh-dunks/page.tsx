import { ProductDetail } from "@/components/product-detail"

// CORRECTED sizing system - exactly 73 sizes INCLUDING 7.5C
const allSizes = [
  // Men's sizes (17 sizes: 7-15, including half sizes)
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
  "14.5",
  "15",
  // Women's sizes (15 sizes: 5W-12W, including half sizes)
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
  // Infant sizes (14 sizes: 1C-7.5C, including half sizes) - INCLUDES 7.5C
  "1C",
  "1.5C",
  "2C",
  "2.5C",
  "3C",
  "3.5C",
  "4C",
  "4.5C",
  "5C",
  "5.5C",
  "6C",
  "6.5C",
  "7C",
  "7.5C",
  // Toddler sizes (12 sizes: 8C-13.5C, including half sizes)
  "8C",
  "8.5C",
  "9C",
  "9.5C",
  "10C",
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  // Youth (10 sizes: 1Y-5.5Y, including half sizes)
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
  // Big Kids (5 sizes: 6Y-8Y, including 8Y to get exactly 73 total)
  "6Y",
  "6.5Y",
  "7Y",
  "7.5Y",
  "8Y",
]

const shoe = {
  id: 11,
  name: "Kuffiyeh Dunks",
  price: 160,
  image: "/images/kuffiyeh-dunk-single.jpeg",
  images: ["/images/kuffiyeh-dunk-single.jpeg", "/images/kuffiyeh-dunk-pair.jpeg"],
  slug: "kuffiyeh-dunks",
  sizes: allSizes,
  inStockSizes: allSizes,
  description: "Traditional Kuffiyeh patterns on black Nike Dunks featuring the iconic Palestinian checkered design.",
  details: [
    "Sticker price: $160",
    "Traditional Kuffiyeh pattern design",
    "Black base with white geometric patterns",
    "Nike Dunk silhouette",
    "Premium materials and craftsmanship",
    "Available in all sizes from infant to adult",
  ],
  isFeatured: false,
}

export default function KuffiyehDunksPage() {
  return (
    <div className="min-h-screen bg-black">
      <ProductDetail shoe={shoe} />
    </div>
  )
}
