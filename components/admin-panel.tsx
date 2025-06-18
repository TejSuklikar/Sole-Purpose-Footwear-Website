"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Star, Trash2, StarOff } from "lucide-react"
import Image from "next/image"

interface Shoe {
  id: number
  name: string
  price: number
  image: string
  slug: string
  sizes: string[]
  description?: string
  details?: string[]
  isFeatured?: boolean
}

// Nike-style sizing system
const allSizes = [
  // Men's sizes (starting from 7, as youth 7Y = men's 7)
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
  "15",
  // Women's sizes
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
  // Babies and Toddlers (1C-10C)
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
  "8C",
  "8.5C",
  "9C",
  "9.5C",
  "10C",
  // Little Kids (8C-3Y) - includes overlap with toddlers
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  "1Y",
  "1.5Y",
  "2Y",
  "2.5Y",
  "3Y",
  // Big Kids (1Y-7Y) - includes overlap with little kids
  "3.5Y",
  "4Y",
  "4.5Y",
  "5Y",
  "5.5Y",
  "6Y",
  "6.5Y",
  "7Y",
]

// All available shoes in the system
const defaultShoes: Shoe[] = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
    description: "Traditional Kuffiyeh patterns hand-painted in bold red on premium white canvas.",
    details: [
      "Hand-painted with premium acrylic paints",
      "Sealed with protective coating",
      "Based on Nike Air Force 1",
    ],
    isFeatured: true,
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 425,
    image: "/images/mexican-side-view.png",
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    description: "Detailed Mexican flag design featuring the iconic eagle and serpent coat of arms.",
    details: ["Hand-painted Mexican coat of arms", "Mexican flag colors on swoosh", "Premium white leather base"],
    isFeatured: true,
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    image: "/images/black-red-geometric-hero.jpg",
    slug: "black-red-geometric",
    sizes: allSizes,
    description: "Sleek black forces with striking red geometric patterns.",
    details: ["All-black leather base", "Hand-painted red geometric patterns", "Matte finish"],
    isFeatured: true,
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    image: "/images/jordanian-side-view.jpg",
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    description: "Jordanian flag design with traditional colors and patterns.",
    details: [
      "Hand-painted Jordanian flag design",
      "Traditional red, black, white, and green colors",
      "Kuffiyeh pattern details",
    ],
    isFeatured: false,
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    image: "/images/geometric-checkered-side.jpg",
    slug: "geometric-checkered",
    sizes: allSizes,
    description: "Clean geometric checkered pattern in black and white.",
    details: [
      "Hand-painted checkered pattern",
      "Black and white minimalist design",
      "Palestinian flag colors on branding",
    ],
    isFeatured: false,
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    image: "/images/chinese-side-sunset.png",
    slug: "chinese-flag-af1",
    sizes: allSizes,
    description: "Chinese flag design featuring the iconic red and gold color scheme.",
    details: [
      "Hand-painted Chinese flag design",
      "Authentic red and gold colors",
      "Flag elements integrated into swoosh",
    ],
    isFeatured: false,
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    image: "/images/checkered-drip-sunset.png",
    slug: "checkered-drip-af1",
    sizes: allSizes,
    description: "Bold checkered pattern with artistic paint drip design.",
    details: ["Hand-painted checkered swoosh", "Artistic paint drip effect", "Street art aesthetic"],
    isFeatured: false,
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 380,
    image: "/images/palestine-map-side.jpg",
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    description: "Hand-painted map of Palestine in traditional flag colors.",
    details: [
      "Hand-painted map of Palestine",
      "Traditional Kuffiyeh geometric patterns",
      "Palestinian flag colors throughout",
    ],
    isFeatured: false,
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 410,
    image: "/images/lebanese-side-view.jpg",
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    description: "Lebanese flag design featuring the iconic cedar tree symbol.",
    details: [
      "Hand-painted Lebanese cedar tree",
      "Traditional red and white flag stripes",
      "Lebanese flag colors on branding",
    ],
    isFeatured: false,
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 420,
    image: "/images/filipino-side-view.jpg",
    slug: "filipino-sun-af1",
    sizes: allSizes,
    description: "Filipino flag design featuring the golden sun symbol.",
    details: [
      "Hand-painted Filipino golden sun",
      "Authentic blue, red, and yellow colors",
      "Traditional eight-rayed sun design",
    ],
    isFeatured: false,
  },
]

export function AdminPanel() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newShoe, setNewShoe] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    details: "",
    sizes: [] as string[],
  })

  // Load shoes from localStorage on mount
  useEffect(() => {
    const savedShoes = localStorage.getItem("sp_shoes")
    if (savedShoes) {
      setShoes(JSON.parse(savedShoes))
    } else {
      // Initialize with default shoes
      setShoes(defaultShoes)
      localStorage.setItem("sp_shoes", JSON.stringify(defaultShoes))
    }
  }, [])

  const saveShoes = (updatedShoes: Shoe[]) => {
    setShoes(updatedShoes)
    localStorage.setItem("sp_shoes", JSON.stringify(updatedShoes))
  }

  const handleAddShoe = () => {
    if (!newShoe.name || !newShoe.price || !newShoe.image) return

    const shoe: Shoe = {
      id: Date.now(),
      name: newShoe.name,
      price: Number.parseInt(newShoe.price),
      image: newShoe.image,
      slug: newShoe.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      sizes: newShoe.sizes.length > 0 ? newShoe.sizes : allSizes,
      description: newShoe.description,
      details: newShoe.details ? newShoe.details.split("\n").filter((d) => d.trim()) : [],
      isFeatured: false,
    }

    const updatedShoes = [...shoes, shoe]
    saveShoes(updatedShoes)

    // Reset form
    setNewShoe({
      name: "",
      price: "",
      image: "",
      description: "",
      details: "",
      sizes: [],
    })
    setShowAddForm(false)
  }

  const handleDeleteShoe = (id: number) => {
    if (confirm("Are you sure you want to delete this shoe?")) {
      const updatedShoes = shoes.filter((shoe) => shoe.id !== id)
      saveShoes(updatedShoes)
    }
  }

  const toggleFeatured = (id: number) => {
    const featuredCount = shoes.filter((shoe) => shoe.isFeatured).length
    const shoe = shoes.find((s) => s.id === id)

    if (shoe?.isFeatured) {
      // Removing from featured
      const updatedShoes = shoes.map((s) => (s.id === id ? { ...s, isFeatured: false } : s))
      saveShoes(updatedShoes)
    } else if (featuredCount < 3) {
      // Adding to featured (max 3)
      const updatedShoes = shoes.map((s) => (s.id === id ? { ...s, isFeatured: true } : s))
      saveShoes(updatedShoes)
    } else {
      alert("You can only have 3 featured shoes. Remove one first.")
    }
  }

  const handleSizeToggle = (size: string) => {
    const updatedSizes = newShoe.sizes.includes(size)
      ? newShoe.sizes.filter((s) => s !== size)
      : [...newShoe.sizes, size]

    setNewShoe({ ...newShoe, sizes: updatedSizes })
  }

  const selectAllSizes = () => {
    setNewShoe({ ...newShoe, sizes: [...allSizes] })
  }

  const clearAllSizes = () => {
    setNewShoe({ ...newShoe, sizes: [] })
  }

  const selectSizeCategory = (category: "men" | "women" | "babies-toddlers" | "little-kids" | "big-kids") => {
    let categorySizes: string[] = []

    if (category === "men") {
      categorySizes = allSizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
    } else if (category === "women") {
      categorySizes = allSizes.filter((size) => size.includes("W"))
    } else if (category === "babies-toddlers") {
      categorySizes = allSizes.filter((size) => {
        if (!size.includes("C")) return false
        const num = Number.parseFloat(size)
        return num >= 1 && num <= 10
      })
    } else if (category === "little-kids") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("C")) {
          const num = Number.parseFloat(size)
          return num >= 8 && num <= 13.5
        }
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 1 && num <= 3
        }
        return false
      })
    } else if (category === "big-kids") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 1 && num <= 7
        }
        return false
      })
    }

    // Add to existing selection (don't replace)
    const newSizes = [...new Set([...newShoe.sizes, ...categorySizes])]
    setNewShoe({ ...newShoe, sizes: newSizes })
  }

  const featuredShoes = shoes.filter((shoe) => shoe.isFeatured)

  // Group sizes for better display
  const mensSizes = allSizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
  const womensSizes = allSizes.filter((size) => size.includes("W"))
  const babiesToddlerSizes = allSizes.filter((size) => {
    if (!size.includes("C")) return false
    const num = Number.parseFloat(size)
    return num >= 1 && num <= 10
  })
  const littleKidsSizes = allSizes.filter((size) => {
    if (size.includes("C")) {
      const num = Number.parseFloat(size)
      return num >= 8 && num <= 13.5
    }
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 1 && num <= 3
    }
    return false
  })
  const bigKidsSizes = allSizes.filter((size) => {
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 1 && num <= 7
    }
    return false
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-white text-black">
          <Plus className="mr-2 h-4 w-4" />
          Add New Shoe
        </Button>
      </div>

      {/* Featured Shoes Section */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Featured Shoes ({featuredShoes.length}/3)
          </CardTitle>
          <p className="text-neutral-400 text-sm">
            These shoes appear on the homepage. Click the star on any shoe below to feature/unfeature it.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredShoes.map((shoe) => (
              <div key={shoe.id} className="bg-neutral-800 rounded-lg p-4">
                <div className="aspect-square relative mb-2 rounded-lg overflow-hidden">
                  <Image
                    src={shoe.image || "/placeholder.svg"}
                    alt={shoe.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <h3 className="text-white font-semibold">{shoe.name}</h3>
                <p className="text-neutral-400">${shoe.price}</p>
              </div>
            ))}
            {Array.from({ length: 3 - featuredShoes.length }).map((_, i) => (
              <div key={i} className="bg-neutral-800 rounded-lg p-4 border-2 border-dashed border-neutral-600">
                <div className="aspect-square flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <Star className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Empty Slot</p>
                    <p className="text-xs text-neutral-600">Click ⭐ on shoes below</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Shoe Form */}
      {showAddForm && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Shoe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Shoe Name
                </Label>
                <Input
                  id="name"
                  value={newShoe.name}
                  onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
                  placeholder="e.g., Red Kuffiyeh AF1"
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-white">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newShoe.price}
                  onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })}
                  placeholder="350"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image" className="text-white">
                Image URL
              </Label>
              <Input
                id="image"
                value={newShoe.image}
                onChange={(e) => setNewShoe({ ...newShoe, image: e.target.value })}
                placeholder="/images/shoe-name.png"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={newShoe.description}
                onChange={(e) => setNewShoe({ ...newShoe, description: e.target.value })}
                placeholder="Describe the shoe design..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-white">
                Details (one per line)
              </Label>
              <Textarea
                id="details"
                value={newShoe.details}
                onChange={(e) => setNewShoe({ ...newShoe, details: e.target.value })}
                placeholder="Hand-painted with premium paints&#10;Sealed with protective coating&#10;Based on Nike Air Force 1"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-white">Available Sizes (Nike Sizing System)</Label>

              {/* Size Selection Controls */}
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                <Button type="button" onClick={selectAllSizes} size="sm" variant="outline" className="text-xs">
                  Select All ({allSizes.length})
                </Button>
                <Button type="button" onClick={clearAllSizes} size="sm" variant="outline" className="text-xs">
                  Clear All
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("men")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Men's ({mensSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("women")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Women's ({womensSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("babies-toddlers")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Babies/Toddlers ({babiesToddlerSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("little-kids")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Little Kids ({littleKidsSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("big-kids")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Big Kids ({bigKidsSizes.length})
                </Button>
              </div>

              {/* Men's Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Men's Sizes (7-15)</h4>
                <div className="grid grid-cols-6 gap-2">
                  {mensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Women's Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Women's Sizes</h4>
                <div className="grid grid-cols-6 gap-2">
                  {womensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Babies and Toddlers */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Babies and Toddlers (1C-10C)</h4>
                <div className="grid grid-cols-6 gap-2">
                  {babiesToddlerSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Little Kids */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Little Kids (8C-3Y)</h4>
                <div className="grid grid-cols-6 gap-2">
                  {littleKidsSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Kids */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Big Kids (1Y-7Y)</h4>
                <p className="text-xs text-neutral-400 mb-2">
                  Note: Big Kids 7Y = Men's 7 (same size, different construction)
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {bigKidsSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-neutral-400 text-sm mt-1">
                {newShoe.sizes.length === 0 ? "All sizes will be available" : `${newShoe.sizes.length} sizes selected`}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddShoe} className="bg-white text-black">
                Add Shoe
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Shoes List */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">All Shoes ({shoes.length})</CardTitle>
          <p className="text-neutral-400 text-sm">
            Click the star to feature/unfeature shoes. Only 3 can be featured at a time.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoes.map((shoe) => (
              <div key={shoe.id} className="bg-neutral-800 rounded-lg p-4">
                <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={shoe.image || "/placeholder.svg"}
                    alt={shoe.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                  {shoe.isFeatured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded">
                      <Star className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h3 className="text-white font-semibold mb-1">{shoe.name}</h3>
                <p className="text-neutral-400 mb-3">${shoe.price}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleFeatured(shoe.id)}
                    size="sm"
                    variant={shoe.isFeatured ? "default" : "outline"}
                    className={shoe.isFeatured ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
                    title={shoe.isFeatured ? "Remove from featured" : "Add to featured"}
                  >
                    {shoe.isFeatured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => handleDeleteShoe(shoe.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
