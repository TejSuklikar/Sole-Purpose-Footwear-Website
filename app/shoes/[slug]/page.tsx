import { notFound } from "next/navigation"
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
  "7.5C", // THIS IS THE MISSING ONE!
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

const shoes = [
  // Featured shoes (first 3 from hero section)
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 160,
    images: ["/images/kuffiyeh-side-sunset.png", "/images/kuffiyeh-heel-sunset.png"],
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
    description:
      "Traditional Kuffiyeh patterns hand-painted in bold red on premium white canvas. Each pair celebrates Jordanian heritage with intricate geometric designs that honor cultural pride and identity.",
    details: [
      "Hand-painted with premium acrylic paints",
      "Sealed with protective coating for durability",
      "Based on Nike Air Force 1 silhouette",
    ],
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 160,
    images: ["/images/mexican-side-view.png", "/images/mexican-box-top.png", "/images/mexican-box-angle.png"],
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    description:
      "Detailed Mexican flag design featuring the iconic eagle and serpent coat of arms. Hand-painted artwork celebrates Mexican heritage with vibrant colors, intricate national emblem details, and flag-colored swoosh elements.",
    details: [
      "Hand-painted Mexican coat of arms (eagle and serpent)",
      "Mexican flag colors on swoosh and AIR branding",
      "Premium white leather base with detailed artwork",
    ],
  },
  {
    id: 3,
    name: "Black & Red Kuffiyeh",
    price: 160,
    images: ["/images/black-red-af1.png"],
    slug: "black-red-geometric",
    sizes: allSizes,
    description:
      "Sleek black Forces with striking red Kuffiyeh detailing. Modern design meets traditional craftsmanship in this bold statement piece.",
    details: ["All-black leather base", "Hand-painted red Kuffiyeh", "Matte finish for sophisticated look"],
  },
  // Other shoes
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 160,
    images: ["/images/jordanian-side-view.jpg", "/images/jordanian-heel-view.jpg"],
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    description:
      "Jordanian flag design with traditional colors and patterns. Celebrates Jordanian heritage with hand-painted flag elements and cultural motifs including the iconic seven-pointed star and Kuffiyeh patterns.",
    details: [
      "Hand-painted Jordanian flag design with seven-pointed star",
      "Traditional red, black, white, and green colors",
      "Kuffiyeh pattern details on swoosh and heel",
    ],
  },
  {
    id: 5,
    name: "Black & White Checkered",
    price: 160,
    images: ["/images/geometric-checkered-side.jpg"],
    slug: "geometric-checkered",
    sizes: allSizes,
    description:
      "Clean checkered pattern in black and white. Minimalist design with maximum impact, perfect for those who appreciate subtle artistry and Palestinian heritage elements.",
    details: [
      "Hand-painted checkered pattern",
      "Black and white minimalist design",
      "Palestinian flag colors on AIR branding",
    ],
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 160,
    images: ["/images/chinese-side-sunset.png", "/images/chinese-heel-view.png"],
    slug: "chinese-flag-af1",
    sizes: allSizes,
    description:
      "Chinese flag design featuring the iconic red and gold color scheme with hand-painted five-pointed stars. Celebrates Chinese heritage with authentic flag elements integrated into the swoosh and Nike branding.",
    details: [
      "Hand-painted Chinese flag design with five-pointed stars",
      "Authentic red and gold colors throughout",
      "Flag elements integrated into swoosh design",
    ],
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 160,
    images: ["/images/checkered-drip-sunset.png", "/images/checkered-drip-pair.png"],
    slug: "checkered-drip-af1",
    sizes: allSizes,
    description:
      "Bold Kufiyyeh pattern with a striking paint drip design in the colors of the Palestinian flag. The red drips resemble the blood of martyrs and the struggle of the Palestinian people, a powerful blend of street art and cultural resistance. This custom piece honors identity, sacrifice, and unshaken pride.",
    details: [
      "Hand-painted checkered swoosh pattern",
      "Artistic paint drip effect in Palestinian flag colors",
      "Premium white leather base with street art aesthetic",
    ],
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 160,
    images: ["/images/palestine-map-side.jpg", "/images/palestine-map-angle.jpg"],
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    description:
      "HHand-painted map of Palestine in traditional flag colors with intricate Kufiyyeh patterns. A powerful statement piece that honors Palestinian heritage and identity through detailed cartographic artistry.",
    details: [
      "Hand-painted map of Palestine in red and green",
      "Traditional Kuffiyeh border patterns",
      "Palestinian flag colors throughout design",
    ],
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 160,
    images: ["/images/lebanese-side-view.jpg", "/images/lebanese-heel-view.jpg"],
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    description:
      "Lebanese flag design featuring the iconic cedar tree symbol with traditional red and white horizontal stripes. Celebrates Lebanese heritage with hand-painted national emblems and flag-colored Nike branding.",
    details: [
      "Hand-painted Lebanese cedar tree emblem",
      "Traditional red and white flag stripes",
      "Lebanese flag colors on Nike and AIR branding",
    ],
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 160,
    images: ["/images/filipino-side-view.jpg", "/images/filipino-heel-view.jpg"],
    slug: "filipino-sun-af1",
    sizes: allSizes,
    description:
      "Filipino flag design featuring the golden sun symbol with blue triangle and red stripe elements. Celebrates Filipino heritage with authentic flag colors and the iconic eight-rayed sun integrated into the swoosh design.",
    details: [
      "Hand-painted Filipino golden sun symbol",
      "Authentic blue, red, and yellow flag colors",
      "Traditional eight-rayed sun design",
    ],
  },
  {
    id: 11,
    name: "Palestine AF1",
    price: 160,
    images: ["/images/palestine-af1-side-v3.jpeg", "/images/palestine-af1-pair-v3.jpeg"],
    slug: "palestine-af1",
    sizes: allSizes,
    description: "White Nike Air Force 1s featuring a Palestinian flag and kuffiyeh design on the swoosh.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Air Force 1 silhouette"],
  },
  {
    id: 12,
    name: "Palestine Flag Dunks",
    price: 160,
    images: ["/images/palestine-flag-dunks.jpeg"],
    slug: "palestine-flag-dunks",
    sizes: allSizes,
    description:
      "Nike Dunks featuring a Palestinian flag design on the swoosh and a traditional kuffiyeh pattern on the heel. A powerful statement of solidarity and style.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Dunk silhouette"],
  },
  {
    id: 13,
    name: "Traditional Kuffiyeh Dunks",
    price: 160,
    images: ["/images/traditional-kuffiyeh-dunks-single.jpeg", "/images/traditional-kuffiyeh-dunks-pair.jpeg"],
    slug: "traditional-kuffiyeh-dunks",
    sizes: allSizes,
    description: "Classic black and white Nike Dunks featuring a traditional black kuffiyeh pattern on the swoosh.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Dunk silhouette"],
  },
  {
    id: 14,
    name: "Palestine Heel Kuffiyeh AF1",
    price: 160,
    images: ["/images/palestine-heel-kuffiyeh-af1-side.jpeg", "/images/palestine-heel-kuffiyeh-af1-back.jpeg"],
    slug: "palestine-heel-kuffiyeh-af1",
    sizes: allSizes,
    description: "White Nike Air Force 1s with a Palestinian flag swoosh and kuffiyeh details on the heel.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Air Force 1 silhouette"],
  },
  {
    id: 15,
    name: "Traditional Kuffiyeh AF1",
    price: 160,
    images: ["/images/traditional-kuffiyeh-af1-side.jpeg", "/images/traditional-kuffiyeh-af1-heel.jpeg"],
    slug: "traditional-kuffiyeh-af1",
    sizes: allSizes,
    description:
      "Classic white Nike Air Force 1s featuring a traditional black kuffiyeh pattern on the swoosh and heel.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Air Force 1 silhouette"],
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

  if (!shoe?.images || shoe.images.length === 0) {
    console.error(`No images found for shoe with slug: ${params.slug}`)
    return notFound()
  }

  return <ProductDetail shoe={shoe} />
}
