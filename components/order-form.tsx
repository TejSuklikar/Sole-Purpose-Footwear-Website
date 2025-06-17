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

const allSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]

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
    <div className="space-y-6">
      {/* Cart Items Warning */}
      {state.items.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <ShoppingCart className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Items in Your Cart</h3>
                <p className="text-sm text-blue-800 mb-3">
                  You have {state.items.length} item(s) in your cart (${cartTotal}). These will be processed separately
                  from your custom order.
                </p>
                <div className="space-y-1">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="text-sm text-blue-700">
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
        <CardHeader>
          <CardTitle className="font-playfair text-2xl text-white">Custom Order Details</CardTitle>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-neutral-600">Custom Design Price:</span>
              <span className="text-2xl font-bold text-neutral-900">$350</span>
            </div>
            <p className="text-sm text-neutral-600 mt-2">All custom designs are hand-painted and made to order</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="placeholder:text-neutral-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="placeholder:text-neutral-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="shoeModel" className="text-white">
                Shoe Model
              </Label>
              <Select
                name="shoeModel"
                value={formData.shoeModel}
                onValueChange={(value) => handleInputChange("shoeModel", value)}
                required
              >
                <SelectTrigger className="text-black">
                  <SelectValue placeholder="Select a base model" />
                </SelectTrigger>
                <SelectContent>
                  {shoeModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size" className="text-white">
                Shoe Size
              </Label>
              <Select
                name="size"
                value={formData.size}
                onValueChange={(value) => handleInputChange("size", value)}
                required
              >
                <SelectTrigger className="text-black">
                  <SelectValue placeholder="Select your size" />
                </SelectTrigger>
                <SelectContent>
                  {allSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="designDescription" className="text-white">
                Design Description
              </Label>
              <Textarea
                id="designDescription"
                name="designDescription"
                placeholder="Describe your vision in detail. Include colors, themes, inspiration, or any specific elements you'd like incorporated..."
                rows={6}
                value={formData.designDescription}
                onChange={(e) => handleInputChange("designDescription", e.target.value)}
                required
                className="placeholder:text-neutral-500"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-white">
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
                className="placeholder:text-neutral-500"
              />
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-neutral-600 space-y-1">
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

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !isFormValid}>
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
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
