import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"

const shoes = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    images: ["/images/kuffiyeh-side-sunset.png", "/images/kuffiyeh-heel-sunset.png"],
    slug: "red-kuffiyeh-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    description:
      "Traditional Kuffiyeh patterns hand-painted in bold red on premium white canvas. Each pair celebrates Palestinian heritage with intricate geometric designs that honor cultural identity.",
    details: [
      "Hand-painted with premium acrylic paints",
      "Sealed with protective coating for durability",
      "Based on Nike Air Force 1 silhouette",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 425,
    images: ["/images/mexican-af1.png"],
    slug: "mexican-eagle-af1",
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    description:
      "Detailed Mexican flag design featuring the iconic eagle and serpent. Hand-painted artwork celebrates Mexican heritage with vibrant colors and intricate detailing.",
    details: [
      "Hand-painted Mexican flag artwork",
      "Detailed eagle and serpent design",
      "Premium leather base with custom painting",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    images: ["/images/black-red-af1.png"],
    slug: "black-red-geometric",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "11"],
    description:
      "Sleek black forces with striking red geometric patterns. Modern design meets traditional craftsmanship in this bold statement piece.",
    details: [
      "All-black leather base",
      "Hand-painted red geometric patterns",
      "Matte finish for sophisticated look",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    images: ["/images/jordanian-af1.png"],
    slug: "jordanian-flag-af1",
    sizes: ["6", "7", "8", "9", "10"],
    description:
      "Jordanian flag design with traditional colors and patterns. Celebrates Jordanian heritage with hand-painted flag elements and cultural motifs.",
    details: [
      "Hand-painted Jordanian flag design",
      "Traditional red, black, white, and green colors",
      "Cultural pattern details",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    images: ["/images/geometric-af1.png"],
    slug: "geometric-checkered",
    sizes: ["7.5", "8", "8.5", "9", "9.5"],
    description:
      "Clean geometric checkered pattern in black and white. Minimalist design with maximum impact, perfect for those who appreciate subtle artistry.",
    details: [
      "Hand-painted checkered pattern",
      "Black and white geometric design",
      "Clean, minimalist aesthetic",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    images: ["/images/chinese-af1.png"],
    slug: "chinese-flag-af1",
    sizes: ["8", "9", "10", "11", "12"],
    description:
      "Chinese flag design featuring the iconic red and gold color scheme with hand-painted stars. Celebrates Chinese heritage with authentic cultural elements.",
    details: [
      "Hand-painted Chinese flag design",
      "Authentic red and gold colors",
      "Detailed star placement",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    images: ["/images/checkered-drip-af1.png", "/images/checkered-drip-heel.png"],
    slug: "checkered-drip-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10"],
    description:
      "Bold checkered pattern with artistic red drip design. Street art meets high fashion in this eye-catching custom piece that makes a statement.",
    details: [
      "Hand-painted checkered swoosh design",
      "Artistic red drip paint effect",
      "Premium white leather base",
      "Ready to ship within 1-2 business days",
    ],
  },
]

export function generateStaticParams() {
  return shoes.map((shoe) => ({
    slug: shoe.slug,
  }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const shoe = shoes.find((s) => s.slug === params.slug)

  if (!shoe) {
    notFound()
  }

  return <ProductDetail shoe={shoe} />
}
