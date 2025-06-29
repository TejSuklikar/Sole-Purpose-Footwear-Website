"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Phone, Mail, Upload, FileText } from "lucide-react"
import Image from "next/image"

// Function to determine shipping cost based on size
function getShippingForSize(size: string): number {
  if (size.toUpperCase().includes("C") || size.toUpperCase().includes("Y")) {
    return 15
  }
  return 20
}

export default function PaymentPage() {
  const router = useRouter()
  const { items: cartItems, total: subtotal, clearCart } = useCart()
  const [isBayArea, setIsBayArea] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate shipping - use the highest shipping rate in the order
  const shippingCost = isBayArea
    ? 0
    : cartItems.length > 0
      ? Math.max(...cartItems.map((item) => getShippingForSize(item.size)))
      : 0

  const total = subtotal + shippingCost

  const handlePaymentProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPaymentProof(file)
    }
  }

  const handleSubmitOrder = async () => {
    setIsLoading(true)

    try {
      const emailSubject = `New Order - ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} - $${total.toFixed(2)}`

      let emailBody = `New order received!\n\n`
      emailBody += `Order Details:\n`
      emailBody += `=============\n\n`

      cartItems.forEach((item, index) => {
        emailBody += `${index + 1}. ${item.name}\n`
        emailBody += `   Size: ${item.size}, Qty: ${item.quantity}\n`
        emailBody += `   Price: $${(item.price * item.quantity).toFixed(2)}\n`
        if (item.type === "custom" && item.customDetails) {
          emailBody += `   --- Custom Details ---\n`
          Object.entries(item.customDetails).forEach(([key, value]) => {
            emailBody += `   ${key}: ${value}\n`
          })
        }
        emailBody += `\n`
      })

      emailBody += `Order Summary:\n`
      emailBody += `=============\n`
      emailBody += `Subtotal: $${subtotal.toFixed(2)}\n`
      emailBody += `Shipping: ${isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}\n`
      emailBody += `Total: $${total.toFixed(2)}\n\n`

      if (paymentProof) {
        emailBody += `Payment proof attached: ${paymentProof.name}\n\n`
      }

      emailBody += `Please process this order and contact the customer for next steps.\n`
      emailBody += `Order placed at: ${new Date().toLocaleString()}`

      const mailtoLink = `mailto:solepurposefootwear813@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink)

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("There was an error submitting your order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No items in cart</h1>
          <Button onClick={() => router.push("/shoes")} className="bg-white text-black">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-neutral-400">Review your items and submit your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center space-x-4 p-3 bg-neutral-800 rounded-lg"
                  >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-neutral-400 text-sm">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-neutral-700" />

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping</span>
                  <span>{isBayArea ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <Separator className="bg-neutral-700" />
                <div className="flex justify-between text-white text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {cartItems.some((item) => item.type === "custom") && (
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <p className="text-blue-300 text-sm flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Custom designs include consultation and 2-4 week creation time
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cartItems.some((item) => item.type === "custom") && (
                <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <Checkbox
                    id="bayArea"
                    checked={isBayArea}
                    onCheckedChange={(checked) => setIsBayArea(Boolean(checked))}
                  />
                  <Label htmlFor="bayArea" className="text-green-300 text-sm cursor-pointer">
                    I'm in the Bay Area (FREE pickup/dropoff for custom orders)
                  </Label>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-white font-semibold">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-neutral-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Zelle (Preferred)</h4>
                    <p className="text-neutral-300 text-sm mb-2">Send ${total.toFixed(2)} to:</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-mono">+1 (415) 939-8270</span>
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Venmo</h4>
                    <p className="text-neutral-300 text-sm mb-2">Send ${total.toFixed(2)} to:</p>
                    <a
                      href="https://venmo.com/u/Drew-Alaraj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <span className="font-mono">@Drew-Alaraj</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="paymentProof" className="text-white font-medium">
                  Upload Payment Proof (Optional)
                </Label>
                <div className="border-2 border-dashed border-neutral-600 rounded-lg p-4 text-center">
                  <input
                    id="paymentProof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handlePaymentProofUpload}
                    className="hidden"
                  />
                  <Label htmlFor="paymentProof" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-400 text-sm">
                      {paymentProof ? paymentProof.name : "Click to upload screenshot or receipt"}
                    </p>
                  </Label>
                </div>
              </div>

              <div className="p-3 bg-neutral-800 rounded-lg">
                <h4 className="text-white font-medium mb-2">Questions?</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-neutral-400" />
                    <span className="text-neutral-300">(415) 939-8270</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    <span className="text-neutral-300">solepurposefootwear813@gmail.com</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitOrder}
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-neutral-200 py-3"
              >
                {isLoading ? "Submitting Order..." : "Submit Order"}
              </Button>

              <p className="text-neutral-400 text-xs text-center">
                By submitting, you agree to our terms and confirm payment will be sent within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
