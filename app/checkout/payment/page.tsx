"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CreditCard,
  Upload,
  ExternalLink,
  Palette,
} from "lucide-react"

interface OrderItem {
  id: string | number
  name: string
  price: number
  size: string
  quantity: number
  type?: "regular" | "custom"
  customDetails?: {
    firstName: string
    lastName: string
    email: string
    phone: string
    shoeModel: string
    designDescription: string
    isBayArea: boolean
  }
}

interface OrderData {
  items: OrderItem[]
  total: number
  timestamp: string
  orderId: string
  hasCustomItems?: boolean
  hasRegularItems?: boolean
}

export default function PaymentPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentProof, setPaymentProof] = useState({
    method: "",
    transactionId: "",
    screenshot: null as File | null,
    notes: "",
  })

  // Payment information
  const paymentMethods = {
    zelle: "+1 (415) 939-8270",
    venmo: "https://venmo.com/u/Drew-Alaraj",
  }

  useEffect(() => {
    // Get order data from localStorage
    const pendingOrder = localStorage.getItem("pendingOrder")
    if (pendingOrder) {
      const order = JSON.parse(pendingOrder)
      setOrderData(order)
    } else {
      router.push("/shoes")
    }
  }, [router])

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentProof({ ...paymentProof, screenshot: file })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!orderData) return

    const formData = new FormData(e.currentTarget)

    // Add order details to form data
    formData.append("Order_ID", orderData.orderId)
    formData.append("Customer", `${formData.get("firstName")} ${formData.get("lastName")}`)
    formData.append("Total", `$${orderData.total}`)
    formData.append("Payment_Method", paymentProof.method)
    formData.append("Transaction_ID", paymentProof.transactionId)
    formData.append("Payment_Notes", paymentProof.notes)

    // Separate regular and custom items
    const regularItems = orderData.items.filter((item) => item.type !== "custom")
    const customItems = orderData.items.filter((item) => item.type === "custom")

    if (regularItems.length > 0) {
      formData.append("Regular_Items", JSON.stringify(regularItems))
    }

    if (customItems.length > 0) {
      formData.append("Custom_Items", JSON.stringify(customItems))
      // Add custom details for each custom item
      customItems.forEach((item, index) => {
        if (item.customDetails) {
          formData.append(`Custom_${index + 1}_Details`, JSON.stringify(item.customDetails))
        }
      })
    }

    formData.append(
      "Order_Type",
      orderData.hasCustomItems && orderData.hasRegularItems
        ? "Mixed Order"
        : orderData.hasCustomItems
          ? "Custom Only"
          : "Regular Only",
    )

    if (paymentProof.screenshot) {
      formData.append("Payment_Screenshot", paymentProof.screenshot)
    }

    try {
      // Submit to FormSubmit
      const response = await fetch("https://formsubmit.co/solepurposefootwear813@gmail.com", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Clear cart and pending order
        localStorage.removeItem("sp_cart")
        localStorage.removeItem("pendingOrder")

        // Redirect to success page
        router.push("/checkout/success?type=order")
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
          <p className="text-white">Loading order...</p>
        </div>
      </div>
    )
  }

  const isFormComplete =
    paymentProof.method && paymentProof.transactionId && paymentProof.screenshot && currentStep >= 2

  const regularItems = orderData.items.filter((item) => item.type !== "custom")
  const customItems = orderData.items.filter((item) => item.type === "custom")

  return (
    <div className="min-h-screen bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <span className="text-white font-medium">Send Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-neutral-600"></div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 2 ? "bg-white text-black" : "bg-neutral-600 text-neutral-400"
                }`}
              >
                2
              </div>
              <span className={`font-medium ${currentStep >= 2 ? "text-white" : "text-neutral-400"}`}>
                Upload Proof
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Regular Items */}
              {regularItems.length > 0 && (
                <div>
                  <h4 className="text-neutral-300 font-medium mb-3">Regular Orders</h4>
                  {regularItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-neutral-300 mb-2">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-neutral-400">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-white font-semibold">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom Items */}
              {customItems.length > 0 && (
                <div>
                  <h4 className="text-blue-300 font-medium mb-3 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Custom Orders
                  </h4>
                  {customItems.map((item, index) => (
                    <div key={index} className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 mb-2">
                      <div className="flex justify-between text-blue-300">
                        <div>
                          <p className="font-medium text-blue-200">{item.name}</p>
                          <p className="text-sm text-blue-400">Size: {item.size}</p>
                          {item.customDetails && (
                            <p className="text-xs text-blue-500 mt-1">
                              {item.customDetails.designDescription.substring(0, 50)}...
                            </p>
                          )}
                        </div>
                        <span className="text-blue-200 font-semibold">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="bg-neutral-700" />
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>${orderData.total}</span>
              </div>

              {customItems.length > 0 && (
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
                  <p className="text-blue-300 text-sm">
                    ✨ Custom designs include consultation and 2-4 week creation time
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 1: Send Payment */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-black">Step 1: Send Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Important Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">IMPORTANT:</h4>
                    <p className="text-sm text-red-700">
                      You MUST include your Order ID:{" "}
                      <span className="font-bold bg-red-100 px-1 rounded">{orderData.orderId}</span> in the payment
                      note/memo. Orders without proper ID will be delayed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 text-lg mb-1">Payment Amount: ${orderData.total}</h3>
                <p className="text-sm text-green-700">
                  {customItems.length > 0 && regularItems.length > 0
                    ? "Mixed order with custom designs and regular shoes"
                    : customItems.length > 0
                      ? "Custom design with shipping included"
                      : "Regular order with shipping included"}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-black">Zelle</h4>
                      <p className="text-sm text-neutral-600">{paymentMethods.zelle}</p>
                      <p className="text-xs text-neutral-500 mt-1">Include Order ID in memo</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentMethods.zelle, "zelle")}
                      className="w-10 h-10 bg-black hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors"
                    >
                      {copiedField === "zelle" ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <Copy className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-black">Venmo</h4>
                      <p className="text-sm text-neutral-600">Drew Alaraj</p>
                      <p className="text-xs text-neutral-500 mt-1">Include Order ID in note</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard("Drew-Alaraj", "venmo-username")}
                        className="w-10 h-10 bg-black hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors"
                      >
                        {copiedField === "venmo-username" ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Copy className="h-4 w-4 text-white" />
                        )}
                      </button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={paymentMethods.venmo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-black hover:bg-neutral-800 text-white"
                onClick={() => setCurrentStep(2)}
                disabled={currentStep >= 2}
              >
                {currentStep >= 2 ? "✓ Payment Sent" : "I've Sent the Payment"}
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Contact & Payment Information */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Step 2: Contact & Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_next" value={`${window.location.origin}/checkout/success?type=order`} />
                <input
                  type="hidden"
                  name="_subject"
                  value={`New ${
                    orderData.hasCustomItems && orderData.hasRegularItems
                      ? "Mixed"
                      : orderData.hasCustomItems
                        ? "Custom"
                        : "Regular"
                  } Order - SolePurpose`}
                />
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

                {/* Payment Proof Section */}
                {currentStep >= 2 && (
                  <>
                    <Separator className="bg-neutral-700" />
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Payment Verification</h3>

                      <div>
                        <Label htmlFor="paymentMethod" className="text-white">
                          Payment Method Used
                        </Label>
                        <select
                          id="paymentMethod"
                          className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                          value={paymentProof.method}
                          onChange={(e) => setPaymentProof({ ...paymentProof, method: e.target.value })}
                          required
                        >
                          <option value="">Select payment method</option>
                          <option value="zelle">Zelle</option>
                          <option value="venmo">Venmo</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="transactionId" className="text-white">
                          Transaction ID / Reference Number
                        </Label>
                        <Input
                          id="transactionId"
                          placeholder="Enter transaction ID from your payment app"
                          value={paymentProof.transactionId}
                          onChange={(e) => setPaymentProof({ ...paymentProof, transactionId: e.target.value })}
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="screenshot" className="text-white">
                          Payment Screenshot
                        </Label>
                        <div className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center bg-neutral-800">
                          <input
                            type="file"
                            id="screenshot"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            required
                          />
                          <label htmlFor="screenshot" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                            <p className="text-sm text-neutral-300">
                              {paymentProof.screenshot ? paymentProof.screenshot.name : "Upload payment screenshot"}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-white">
                          Additional Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Any additional information about your payment"
                          value={paymentProof.notes}
                          onChange={(e) => setPaymentProof({ ...paymentProof, notes: e.target.value })}
                          rows={3}
                          className="bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Order Processing</h3>
                  <p className="text-neutral-300 text-sm">
                    {customItems.length > 0
                      ? "Custom designs will be processed within 2-4 weeks with progress updates. Regular items ship within 1-2 business days."
                      : "Your order will be processed and shipped within 1-2 business days."}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormComplete}
                  className="w-full bg-white text-black hover:bg-neutral-100"
                >
                  {isSubmitting ? "Submitting Order..." : `Submit Order`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
