"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, ShoppingCart } from "lucide-react"
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

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
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

    // Create custom order data
    const customOrderData = {
      ...formData,
      price: 350,
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
          <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-base sm:text-lg font-semibold text-neutral-600">Custom Design Price:</span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-900">$350</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              All custom designs are hand-painted and made to order
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white text-sm sm:text-base">
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
                <Label htmlFor="lastName" className="text-white text-sm sm:text-base">
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
                <Label htmlFor="email" className="text-white text-sm sm:text-base">
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
                <Label htmlFor="phone" className="text-white text-sm sm:text-base">
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
              <Label htmlFor="shoeModel" className="text-white text-sm sm:text-base">
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
              <Label htmlFor="size" className="text-white text-sm sm:text-base">
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
                  {allSizes.map((size) => (
                    <SelectItem key={size} value={size} className="text-sm sm:text-base">
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="designDescription" className="text-white text-sm sm:text-base">
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
              <Label htmlFor="address" className="text-white text-sm sm:text-base">
                Shipping Address
              </Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Full shipping address including postal code"
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
                    Proceed to Custom Order Payment
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
