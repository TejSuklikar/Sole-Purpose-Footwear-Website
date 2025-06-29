"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Phone, FileText, AlertCircle, Upload } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// Function to determine shipping cost based on size
function getShippingForSize(size: string): number {
  if (size.toUpperCase().includes("C") || size.toUpperCase().includes("Y")) {
    return 15
  }
  return 20
}

// Helper to read file as base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function PaymentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items: cartItems, total: subtotal, clearCart } = useCart()
  const [isBayArea, setIsBayArea] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [proofError, setProofError] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const customOrderItem = cartItems.find((item) => item.type === "custom" && item.customDetails?.email)
    if (customOrderItem && customOrderItem.customDetails) {
      setCustomerEmail(customOrderItem.customDetails.email)
    }
  }, [cartItems])

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required.")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.")
      return false
    }
    setEmailError("")
    return true
  }

  const validateProof = () => {
    if (!paymentProof) {
      setProofError("Payment proof is required.")
      return false
    }
    setProofError("")
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerEmail(e.target.value)
    if (emailError) {
      validateEmail(e.target.value)
    }
  }

  const handlePaymentProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPaymentProof(file)
      setProofError("") // Clear error when file is selected
    }
  }

  const shippingCost = isBayArea
    ? 0
    : cartItems.length > 0
      ? Math.max(...cartItems.map((item) => getShippingForSize(item.size)))
      : 0

  const total = subtotal + shippingCost

  const handleSubmitOrder = async () => {
    const isEmailValid = validateEmail(customerEmail)
    const isProofValid = validateProof()
    if (!isEmailValid || !isProofValid) {
      return
    }

    setIsLoading(true)

    try {
      const paymentProofBase64 = paymentProof ? await toBase64(paymentProof) : null

      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          cartItems,
          subtotal,
          shippingCost,
          total,
          isBayArea,
          paymentProof: paymentProofBase64
            ? {
                filename: paymentProof.name,
                content: paymentProofBase64,
              }
            : null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send confirmation email.")
      }

      toast({
        title: "Order Submitted!",
        description: "Your confirmation is on its way. Please check your email.",
        variant: "default",
      })

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Error submitting order:", error)
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your order. Please contact us directly.",
        variant: "destructive",
      })
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
              <CardTitle className="text-white">Payment & Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Confirmation Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={customerEmail}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(customerEmail)}
                  required
                  className={`bg-neutral-800 border-neutral-700 text-white focus:border-purple-500 focus:ring-purple-500 ${
                    emailError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {emailError && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                <Checkbox
                  id="bayArea"
                  checked={isBayArea}
                  onCheckedChange={(checked) => setIsBayArea(Boolean(checked))}
                />
                <Label htmlFor="bayArea" className="text-green-300 text-sm cursor-pointer">
                  I'm in the Bay Area (FREE pickup/dropoff)
                </Label>
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="paymentProof" className="text-white font-medium">
                  Upload Payment Proof <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`border-2 border-dashed border-neutral-600 rounded-lg p-4 text-center ${
                    proofError ? "border-red-500" : ""
                  }`}
                >
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
                {proofError && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {proofError}
                  </p>
                )}
              </div>

              <Button
                onClick={handleSubmitOrder}
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-neutral-200 py-3 disabled:bg-neutral-400 disabled:cursor-not-allowed"
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
