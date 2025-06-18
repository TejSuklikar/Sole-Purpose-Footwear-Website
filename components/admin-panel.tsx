"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Star, Trash2 } from "lucide-react"
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

const allSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]

export function AdminPanel() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingShoe, setEditingShoe] = useState<Shoe | null>(null)
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
      const defaultShoes = [
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
      ]
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

  const featuredShoes = shoes.filter((shoe) => shoe.isFeatured)

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
              <Label className="text-white">Available Sizes</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {allSizes.map((size) => (
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
                    className={shoe.isFeatured ? "bg-yellow-500 text-black" : ""}
                  >
                    <Star className="h-4 w-4" />
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
