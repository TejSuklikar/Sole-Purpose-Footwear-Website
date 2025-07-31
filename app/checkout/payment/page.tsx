"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PaymentPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isBayArea: false,
  })

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)

  // Determine shipping cost
  const getShippingCost = () => {
    if (formData.isBayArea) return 0

    // Find the highest shipping rate among all items
    const shippingRates = items.map((item) => {
      if (item.sizeCategory === "Kids") return 15
      return 20 // Men's/Women's
    })

    return Math.max(...shippingRates, 0)
  }

  const shipping = getShippingCost()
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    // Basic phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number")
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        customer: formData,
        items,
        subtotal,
        shipping,
        total,
        orderDate: new Date().toISOString(),
      }

      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to process order")
      }

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/checkout/success?orderId=${Date.now()}&total=${total}`)
    } catch (error) {
      console.error("Order submission error:", error)
      toast.error("Failed to process order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => router.push("/shoes")} className="bg-white text-black hover:bg-gray-200">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-neutral-400">
                      Size: {item.size} ({item.sizeCategory})
                    </p>
                    {item.customization && <p className="text-sm text-neutral-400">Custom: {item.customization}</p>}
                  </div>
                  <span className="font-medium text-white">${item.price}</span>
                </div>
              ))}

              <Separator className="bg-neutral-700" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Shipping</span>
                  <span className="text-white">${shipping}</span>
                </div>
                <Separator className="bg-neutral-700" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-white">${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Customer Information</CardTitle>
              <CardDescription className="text-neutral-400">
                Please provide your details for order processing and shipping.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 123-4567"
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white">
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-white">
                    ZIP Code *
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isBayArea"
                    name="isBayArea"
                    checked={formData.isBayArea}
                    onChange={handleInputChange}
                    className="rounded border-neutral-700"
                  />
                  <Label htmlFor="isBayArea" className="text-white">
                    I'm located in the Bay Area (Free shipping!)
                  </Label>
                </div>

                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Payment Instructions</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-neutral-300 text-sm mb-1">
                        <strong>Zelle (Preferred):</strong> +1 (415) 939-8270
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-300 text-sm mb-1">
                        <strong>Venmo:</strong> @solepurposefootwear
                      </p>
                    </div>
                    <p className="text-neutral-300 text-sm">
                      Amount: <strong>${total}</strong>
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3"
                >
                  {isSubmitting ? "Processing Order..." : "Submit Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
