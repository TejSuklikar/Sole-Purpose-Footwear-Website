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
import { CheckCircle, Phone, AlertCircle, Upload, Home } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const MAX_FILE_SIZE_MB = 8
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function getShippingForSize(size: string): number {
  if (size.toUpperCase().includes("C") || size.toUpperCase().includes("Y")) {
    return 15
  }
  return 20
}

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
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  })
  const [addressError, setAddressError] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const customOrderItem = cartItems.find((item) => item.type === "custom" && item.customDetails?.email)
    if (customOrderItem && customOrderItem.customDetails) {
      setCustomerEmail(customOrderItem.customDetails.email)
    }
  }, [cartItems])

  const validate = () => {
    let isValid = true
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      setEmailError("A valid email is required.")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!paymentProof) {
      setProofError("Payment proof is required.")
      isValid = false
    } else if (paymentProof.size > MAX_FILE_SIZE_BYTES) {
      setProofError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`)
      isValid = false
    } else {
      setProofError("")
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
      setAddressError("Please complete all address fields.")
      isValid = false
    } else {
      setAddressError("")
    }

    return isValid
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePaymentProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setPaymentProof(file)
  }

  const shippingCost = isBayArea
    ? 0
    : cartItems.length > 0
      ? Math.max(...cartItems.map((item) => getShippingForSize(item.size)))
      : 0

  const total = subtotal + shippingCost

  const handleSubmitOrder = async () => {
    if (!validate()) {
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append("customerEmail", customerEmail)
    formData.append("cartItems", JSON.stringify(cartItems))
    formData.append("subtotal", subtotal.toString())
    formData.append("shippingCost", shippingCost.toString())
    formData.append("total", total.toString())
    formData.append("isBayArea", isBayArea.toString())
    formData.append("shippingAddress", JSON.stringify(shippingAddress))
    if (paymentProof) {
      formData.append("paymentProof", paymentProof)
    }

    try {
      const response = await fetch("/api/send-order-email", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "An unknown error occurred.")
      }

      toast({
        title: "Order Submitted!",
        description: "Your confirmation is on its way. Please check your email.",
        variant: "default",
      })

      clearCart()
      router.push("/checkout/success")
    } catch (error: any) {
      console.error("Error submitting order:", error)
      toast({
        title: "Submission Error",
        description: error.message || "There was a problem submitting your order. Please contact us directly.",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-8">
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
                        <p className="text-neutral-400 text-sm">
                          Size: {item.size} {item.sizeCategory ? `(${item.sizeCategory})` : ""}
                        </p>
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
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Confirmation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  Shipping Address <span className="text-red-500 ml-1">*</span>
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="street" className="text-sm text-neutral-400">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm text-neutral-400">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm text-neutral-400">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-sm text-neutral-400">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={shippingAddress.zip}
                      onChange={handleAddressChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>
                {addressError && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {addressError}
                  </p>
                )}
              </div>

              <Separator className="bg-neutral-700" />

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Confirmation Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className={`bg-neutral-800 border-neutral-700 text-white ${emailError ? "border-red-500" : ""}`}
                />
                {emailError && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Bay Area Checkbox */}
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

              {/* Payment Proof */}
              <div className="space-y-2">
                <Label htmlFor="paymentProof" className="text-white font-medium">
                  Upload Payment Proof <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`border-2 border-dashed border-neutral-600 rounded-lg p-4 text-center ${proofError ? "border-red-500" : ""}`}
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
                    <p className="text-xs text-neutral-500 mt-1">Max file size: {MAX_FILE_SIZE_MB}MB</p>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
