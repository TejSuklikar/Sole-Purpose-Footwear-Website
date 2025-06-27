"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { Palette } from "lucide-react"

const sizeCategories = [
  {
    category: "Men's/Women's - $210",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "14", "15"],
    price: 210,
  },
  {
    category: "Big Kids (6Y-8Y) - $160",
    sizes: ["6Y", "6.5Y", "7Y", "7.5Y", "8Y"],
    price: 160,
  },
  {
    category: "Youth (1Y-5.5Y) - $130",
    sizes: ["1Y", "1.5Y", "2Y", "2.5Y", "3Y", "3.5Y", "4Y", "4.5Y", "5Y", "5.5Y"],
    price: 130,
  },
  {
    category: "Toddler (8C-13.5C) - $130",
    sizes: ["8C", "8.5C", "9C", "9.5C", "10C", "10.5C", "11C", "11.5C", "12C", "12.5C", "13C", "13.5C"],
    price: 130,
  },
  {
    category: "Infant (1C-7.5C) - $120",
    sizes: ["1C", "1.5C", "2C", "2.5C", "3C", "3.5C", "4C", "4.5C", "5C", "5.5C", "6C", "6.5C", "7C", "7.5C"],
    price: 120,
  },
]

export function OrderForm() {
  const { addItem } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shoeModel: "",
    size: "",
    designDescription: "",
    additionalNotes: "",
  })

  const getSelectedPrice = () => {
    if (!formData.size) return 0

    for (const category of sizeCategories) {
      if (category.sizes.includes(formData.size)) {
        return category.price
      }
    }
    return 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const price = getSelectedPrice()

      // Add custom order to cart
      const customOrderItem = {
        id: `custom-${Date.now()}`,
        name: `Custom ${formData.shoeModel}`,
        price: price,
        size: formData.size,
        quantity: 1,
        type: "custom",
        customDetails: formData,
      }

      addItem(customOrderItem)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        shoeModel: "",
        size: "",
        designDescription: "",
        additionalNotes: "",
      })
    } catch (error) {
      console.error("Error submitting custom order:", error)
      alert("There was an error submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Custom Order Form
            </CardTitle>
            <CardDescription className="text-lg text-neutral-600 mt-2">
              Create your unique pair of custom sneakers
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Shoe Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shoeModel">Base Shoe Model</Label>
                  <Select value={formData.shoeModel} onValueChange={(value) => handleInputChange("shoeModel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select base model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Air Force 1">Air Force 1</SelectItem>
                      <SelectItem value="Nike Dunk">Nike Dunk</SelectItem>
                      <SelectItem value="Custom">Custom (Specify in description)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeCategories.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-1 text-sm font-semibold text-neutral-600">{category.category}</div>
                          {category.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Design Description */}
              <div>
                <Label htmlFor="designDescription" className="mb-3 block">
                  Design Description
                </Label>
                <Textarea
                  id="designDescription"
                  placeholder="Describe your vision in detail. Include colors, themes, inspiration, or any specific elements you'd like incorporated. If you selected 'Custom' base, please specify the shoe model here."
                  value={formData.designDescription}
                  onChange={(e) => handleInputChange("designDescription", e.target.value)}
                  rows={6}
                  required
                  className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Any additional requests, timeline preferences, or special instructions..."
                  rows={3}
                  className="border-neutral-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Pricing Info */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Custom Order Information</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Design consultation included</li>
                  <li>• 2-4 week creation timeline</li>
                  <li>• Progress updates provided</li>
                  <li>• Satisfaction guaranteed</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || !formData.size}>
                {isSubmitting ? "Adding to Cart..." : `Add to Cart - $${getSelectedPrice()}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderForm
