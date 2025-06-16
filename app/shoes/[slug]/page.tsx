import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"

const allSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]

const shoes = [
  // Featured shoes (first 3 from hero section)
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    images: ["/images/kuffiyeh-side-sunset.png", "/images/kuffiyeh-heel-sunset.png"],
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
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
    images: ["/images/mexican-side-view.png", "/images/mexican-box-top.png", "/images/mexican-box-angle.png"],
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    description:
      "Detailed Mexican flag design featuring the iconic eagle and serpent coat of arms. Hand-painted artwork celebrates Mexican heritage with vibrant colors, intricate national emblem details, and flag-colored swoosh elements.",
    details: [
      "Hand-painted Mexican coat of arms (eagle and serpent)",
      "Mexican flag colors on swoosh and AIR branding",
      "Premium white leather base with detailed artwork",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    images: ["/images/black-red-af1.png"],
    slug: "black-red-geometric",
    sizes: allSizes,
    description:
      "Sleek black forces with striking red geometric patterns. Modern design meets traditional craftsmanship in this bold statement piece.",
    details: [
      "All-black leather base",
      "Hand-painted red geometric patterns",
      "Matte finish for sophisticated look",
      "Ready to ship within 1-2 business days",
    ],
  },
  // Other shoes
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    images: ["/images/jordanian-side-view.jpg", "/images/jordanian-heel-view.jpg"],
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    description:
      "Jordanian flag design with traditional colors and patterns. Celebrates Jordanian heritage with hand-painted flag elements and cultural motifs including the iconic seven-pointed star and Kuffiyeh patterns.",
    details: [
      "Hand-painted Jordanian flag design with seven-pointed star",
      "Traditional red, black, white, and green colors",
      "Kuffiyeh pattern details on swoosh and heel",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    images: ["/images/geometric-checkered-side.jpg"],
    slug: "geometric-checkered",
    sizes: allSizes,
    description:
      "Clean geometric checkered pattern in black and white. Minimalist design with maximum impact, perfect for those who appreciate subtle artistry and Palestinian heritage elements.",
    details: [
      "Hand-painted checkered geometric pattern",
      "Black and white minimalist design",
      "Palestinian flag colors on AIR branding",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    images: ["/images/chinese-side-sunset.png", "/images/chinese-heel-view.png"],
    slug: "chinese-flag-af1",
    sizes: allSizes,
    description:
      "Chinese flag design featuring the iconic red and gold color scheme with hand-painted five-pointed stars. Celebrates Chinese heritage with authentic flag elements integrated into the swoosh and Nike branding.",
    details: [
      "Hand-painted Chinese flag design with five-pointed stars",
      "Authentic red and gold colors throughout",
      "Flag elements integrated into swoosh design",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    images: ["/images/checkered-drip-sunset.png", "/images/checkered-drip-pair.png"],
    slug: "checkered-drip-af1",
    sizes: allSizes,
    description:
      "Bold checkered pattern with artistic paint drip design in Palestinian flag colors. Street art meets cultural heritage in this eye-catching custom piece that celebrates identity through contemporary art.",
    details: [
      "Hand-painted checkered swoosh pattern",
      "Artistic paint drip effect in Palestinian flag colors",
      "Premium white leather base with street art aesthetic",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 380,
    images: ["/images/palestine-map-side.jpg", "/images/palestine-map-angle.jpg"],
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    description:
      "Hand-painted map of Palestine in traditional flag colors with intricate Kuffiyeh geometric patterns. A powerful statement piece that honors Palestinian heritage and identity through detailed cartographic artistry.",
    details: [
      "Hand-painted map of Palestine in red and green",
      "Traditional Kuffiyeh geometric border patterns",
      "Palestinian flag colors throughout design",
      "Ready to ship within 1-2 business days",
    ],
  },
  // New shoes added at the bottom
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 410,
    images: ["/images/lebanese-side-view.jpg", "/images/lebanese-heel-view.jpg"],
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    description:
      "Lebanese flag design featuring the iconic cedar tree symbol with traditional red and white horizontal stripes. Celebrates Lebanese heritage with hand-painted national emblems and flag-colored Nike branding.",
    details: [
      "Hand-painted Lebanese cedar tree emblem",
      "Traditional red and white flag stripes",
      "Lebanese flag colors on Nike and AIR branding",
      "Ready to ship within 1-2 business days",
    ],
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 420,
    images: ["/images/filipino-side-view.jpg", "/images/filipino-heel-view.jpg"],
    slug: "filipino-sun-af1",
    sizes: allSizes,
    description:
      "Filipino flag design featuring the golden sun symbol with blue triangle and red stripe elements. Celebrates Filipino heritage with authentic flag colors and the iconic eight-rayed sun integrated into the swoosh design.",
    details: [
      "Hand-painted Filipino golden sun symbol",
      "Authentic blue, red, and yellow flag colors",
      "Traditional eight-rayed sun design",
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
