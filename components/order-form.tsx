"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, ShoppingCart, Truck, MapPin } from "lucide-react"
import { useCart } from "./cart-provider"

const shoeModels = [
  "Air Force 1 Style",
  "High-Top Canvas",
  "Low-Top Leather",
  "Slip-On Style",
  "Athletic Runner",
  "Custom Base (Specify in description)",
]

const allSizes = [
  // Men's sizes (7-15, including 14.5)
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
  // Infant sizes (1C-7.5C)
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
  // Toddler sizes (8C-13.5C)
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
  // Youth (1Y-5.5Y)
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
  // Big Kids (6Y-8Y)
  "6Y",
  "6.5Y",
  "7Y",
  "7.5Y",
  "8Y",
]

// Base pricing function (before shipping) - UPDATED
const getBasePriceForSize = (size: string): number => {
  // Infant sizes (1C-7.5C): $120
  if (size.includes("C")) {
    const num = Number.parseFloat(size)
    if (num >= 1 && num <= 7.5) {
      return 120
    }
    // Toddler sizes (8C-13.5C): $130
    if (num >= 8 && num <= 13.5) {
      return 130
    }
  }

  // Youth and Big Kids (1Y-8Y)
  if (size.includes("Y")) {
    const num = Number.parseFloat(size)
    // Youth (1Y-5.5Y): $130
    if (num >= 1 && num <= 5.5) {
      return 130
    }
    // Big Kids (6Y-8Y): $160
    if (num >= 6 && num <= 8) {
      return 160
    }
  }

  // Women's and Men's: $210
  return 210
}

const getShippingForSize = (size: string): number => {
  // Kids and toddlers: $15 shipping
  if (size.includes("C") || size.includes("Y")) {
    return 15
  }
  // Adults: $20 shipping
  return 20
}

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBayArea, setIsBayArea] = useState(false)
  const { state } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shoeModel: "",
    size: "",
    designDescription: "",
    address: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Calculate base price and shipping based on selected size
    const basePrice = formData.size ? getBasePriceForSize(formData.size) : 160
    const shipping = isBayArea ? 0 : formData.size ? getShippingForSize(formData.size) : 15
    const totalPrice = basePrice + shipping

    // Create custom order data
    const customOrderData = {
      ...formData,
      basePrice,
      shipping,
      price: totalPrice,
      isBayArea,
      orderId: `SP-CUSTOM-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: "custom_order",
      hasExistingCartItems: state.items.length > 0,
      existingCartItems: state.items,
    }

    // Store in localStorage and redirect to payment page
    localStorage.setItem("customOrder", JSON.stringify(customOrderData))

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to custom order payment page
    window.location.href = "/checkout/custom-payment"

    setIsSubmitting(false)
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.shoeModel &&
    formData.size &&
    formData.designDescription &&
    formData.address

  const cartTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const selectedBasePrice = formData.size ? getBasePriceForSize(formData.size) : null
  const selectedShipping = isBayArea ? 0 : formData.size ? getShippingForSize(formData.size) : null
  const selectedTotal = selectedBasePrice && selectedShipping !== null ? selectedBasePrice + selectedShipping : null

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cart Items Warning */}
      {state.items.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Items in Your Cart</h3>
                <p className="text-xs sm:text-sm text-blue-800 mb-3">
                  You have {state.items.length} item(s) in your cart (${cartTotal}). These will be processed separately
                  from your custom order.
                </p>
                <div className="space-y-1">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="text-xs sm:text-sm text-blue-700">
                      • {item.name} (Size {item.size}) x{item.quantity} - ${item.price * item.quantity}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  After completing your custom order, you can checkout your cart items separately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="font-playfair text-xl sm:text-2xl text-white">Custom Order Details</CardTitle>

          {/* Pricing Display */}
          <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-base sm:text-lg font-semibold text-neutral-600">Custom Design Price:</span>
                <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {selectedTotal ? `$${selectedTotal}` : "Starting at $135"}
                </span>
              </div>

              {formData.size && selectedBasePrice && selectedShipping !== null && (
                <div className="bg-white p-3 rounded border">
                  <h4 className="font-semibold text-neutral-800 mb-2">Price Breakdown for {formData.size}</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>${selectedBasePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className={isBayArea ? "text-green-600 font-medium" : ""}>
                        ${selectedShipping} {isBayArea && "(FREE!)"}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-neutral-900 border-t pt-1">
                      <span>Total:</span>
                      <span>${selectedTotal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bay Area Option */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="bayAreaCustom"
                    checked={isBayArea}
                    onCheckedChange={(checked) => setIsBayArea(checked as boolean)}
                  />
                  <Label htmlFor="bayAreaCustom" className="text-sm font-medium cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">Yes, I'm in the Bay Area (Free pickup/dropoff)</span>
                    </div>
                  </Label>
                </div>
                {isBayArea && (
                  <p className="text-xs text-green-700 ml-6">
                    We'll contact you to arrange free pickup or dropoff in the Bay Area!
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              All custom designs are hand-painted and made to order. Price includes shipping unless Bay Area pickup is
              selected.
            </p>
          </div>

          {/* Shipping Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Shipping Options</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>
                      <strong className="text-green-700">Bay Area Special:</strong> Free pickup/dropoff available
                    </span>
                  </div>
                  <div>
                    <strong>Standard Shipping:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Kids & Toddlers: $15</li>
                      <li>• Adults: $20</li>
                      <li>• Processing time: 2-4 weeks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="firstName" className="text-neutral-900 text-sm sm:text-base font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-neutral-900 text-sm sm:text-base font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="email" className="text-neutral-900 text-sm sm:text-base font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-neutral-900 text-sm sm:text-base font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="shoeModel" className="text-neutral-900 text-sm sm:text-base font-medium">
                Shoe Model
              </Label>
              <Select
                name="shoeModel"
                value={formData.shoeModel}
                onValueChange={(value) => handleInputChange("shoeModel", value)}
                required
              >
                <SelectTrigger className="mt-1 text-sm sm:text-base">
                  <SelectValue placeholder="Select a base model" />
                </SelectTrigger>
                <SelectContent>
                  {shoeModels.map((model) => (
                    <SelectItem key={model} value={model} className="text-sm sm:text-base">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size" className="text-neutral-900 text-sm sm:text-base font-medium">
                Shoe Size
              </Label>
              <Select
                name="size"
                value={formData.size}
                onValueChange={(value) => handleInputChange("size", value)}
                required
              >
                <SelectTrigger className="mt-1 text-sm sm:text-base">
                  <SelectValue placeholder="Select your size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectLabel>Men's Sizes - $210 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $210
                      </SelectItem>
                    ))}

                  <SelectLabel>Women's Sizes - $210 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => size.includes("W"))
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $210
                      </SelectItem>
                    ))}

                  <SelectLabel>Big Kids (6Y-8Y) - $160 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => {
                      if (!size.includes("Y")) return false
                      const num = Number.parseFloat(size)
                      return num >= 6 && num <= 8
                    })
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $160
                      </SelectItem>
                    ))}

                  <SelectLabel>Youth (1Y-5.5Y) - $130 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => {
                      if (!size.includes("Y")) return false
                      const num = Number.parseFloat(size)
                      return num >= 1 && num <= 5.5
                    })
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $130
                      </SelectItem>
                    ))}

                  <SelectLabel>Toddler (8C-13.5C) - $130 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => {
                      if (!size.includes("C")) return false
                      const num = Number.parseFloat(size)
                      return num >= 8 && num <= 13.5
                    })
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $130
                      </SelectItem>
                    ))}

                  <SelectLabel>Infant (1C-7.5C) - $120 + shipping</SelectLabel>
                  {allSizes
                    .filter((size) => {
                      if (!size.includes("C")) return false
                      const num = Number.parseFloat(size)
                      return num >= 1 && num <= 7.5
                    })
                    .map((size) => (
                      <SelectItem key={size} value={size} className="text-sm sm:text-base pl-4">
                        {size} - $120
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="designDescription" className="text-neutral-900 text-sm sm:text-base font-medium">
                Design Description
              </Label>
              <Textarea
                id="designDescription"
                name="designDescription"
                placeholder="Describe your vision in detail. Include colors, themes, inspiration, or any specific elements you'd like incorporated..."
                rows={4}
                value={formData.designDescription}
                onChange={(e) => handleInputChange("designDescription", e.target.value)}
                required
                className="mt-1 text-sm sm:text-base resize-none"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-neutral-900 text-sm sm:text-base font-medium">
                {isBayArea ? "Address for Pickup/Dropoff Coordination" : "Shipping Address"}
              </Label>
              <Textarea
                id="address"
                name="address"
                placeholder={
                  isBayArea
                    ? "Address for pickup/dropoff coordination in the Bay Area"
                    : "Full shipping address including postal code"
                }
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
                className="mt-1 text-sm sm:text-base resize-none"
              />
            </div>

            <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm sm:text-base">What happens next?</h3>
              <ul className="text-xs sm:text-sm text-neutral-600 space-y-1">
                <li>• Proceed to payment using Zelle or Venmo</li>
                <li>• We'll review your design request within 24 hours</li>
                <li>• Our team will contact you to discuss details and timeline</li>
                <li>• Creation takes 2-4 weeks depending on complexity</li>
                <li>• We'll send progress photos throughout the process</li>
                {isBayArea && (
                  <li className="text-green-600 font-medium">• Free Bay Area pickup/dropoff will be arranged</li>
                )}
                {state.items.length > 0 && (
                  <li className="text-blue-600 font-medium">
                    • Your cart items will remain saved for separate checkout
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700"
                size="lg"
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Proceed to Payment - {selectedTotal ? `$${selectedTotal}` : "Select Size"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
