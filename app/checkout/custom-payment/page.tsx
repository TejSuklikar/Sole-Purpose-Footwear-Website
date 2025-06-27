"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, CreditCard, MapPin, Phone, Mail } from "lucide-react"

interface CustomOrderData {
  firstName: string
  lastName: string
  email: string
  phone: string
  shoeModel: string
  size: string
  designDescription: string
  address: string
  price: number
  orderId: string
  timestamp: string
  type: string
  hasExistingCartItems?: boolean
  existingCartItems?: any[]
}

export default function CustomPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // Get order data from URL params or localStorage
    const orderDataParam = searchParams.get("orderData")
    if (orderDataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(orderDataParam))
        setOrderData(data)
      } catch (error) {
        console.error("Error parsing order data:", error)
        router.push("/order")
      }
    } else {
      // Try to get from localStorage as fallback
      const savedOrder = localStorage.getItem("customOrderData")
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder))
      } else {
        router.push("/order")
      }
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    // Add order details to form data
    if (orderData) {
      formData.append("Order_ID", `SP-CUSTOM-${Date.now()}`)
      formData.append("Customer", `${formData.get("firstName")} ${formData.get("lastName")}`)
      formData.append("Total", `$${orderData.total || 135}`)
      formData.append("Shoe_Model", orderData.shoeModel || "Custom Design")
      formData.append("Shoe_Size", orderData.shoeSize || "Not specified")
      formData.append("Design_Description", orderData.designDescription || "Custom design request")
      formData.append("Phone", formData.get("phone") || "")
      formData.append("Email", formData.get("email") || "")
    }

    try {
      // Submit to FormSubmit
      const response = await fetch("https://formsubmit.co/solepurposefootwear813@gmail.com", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Clear stored order data
        localStorage.removeItem("customOrderData")

        // Redirect to success page
        router.push("/checkout/success?type=custom")
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("There was an error submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-white mb-4">Complete Your Custom Order</h1>
          <p className="text-neutral-300">Review your order details and provide payment information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-neutral-300">
                <span>Custom Design</span>
                <span>${orderData.total || 135}</span>
              </div>
              <div className="text-sm text-neutral-400">
                <p>
                  <strong>Shoe Model:</strong> {orderData.shoeModel || "Custom Design"}
                </p>
                <p>
                  <strong>Size:</strong> {orderData.size || "Not specified"}
                </p>
                <p>
                  <strong>Design:</strong> {orderData.designDescription?.substring(0, 100) || "Custom design request"}
                  ...
                </p>
              </div>
              <Separator className="bg-neutral-700" />
              <div className="flex justify-between text-white font-semibold">
                <span>Total</span>
                <span>${orderData.total || 135}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Contact & Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_next" value={`${window.location.origin}/checkout/success?type=custom`} />
                <input type="hidden" name="_subject" value="New Custom Shoe Order - SolePurpose" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-white flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Shipping Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="Full shipping address"
                  />
                </div>

                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Payment Instructions</h3>
                  <p className="text-neutral-300 text-sm">
                    After submitting this form, you will receive an email with payment instructions. We accept Venmo,
                    Zelle, and cash for Bay Area pickups.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-neutral-100"
                >
                  {isSubmitting ? "Submitting Order..." : "Submit Custom Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
