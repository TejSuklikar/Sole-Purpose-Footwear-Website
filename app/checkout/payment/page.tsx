"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Send, ExternalLink, Upload, AlertCircle } from "lucide-react"
import Link from "next/link"

interface OrderItem {
  id: string
  name: string
  price: number
  size: string
  quantity: number
}

interface OrderData {
  items: OrderItem[]
  total: number
  timestamp: string
  orderId: string
}

export default function PaymentPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [paymentProof, setPaymentProof] = useState({
    method: "",
    transactionId: "",
    screenshot: null as File | null,
    notes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Payment information
  const paymentMethods = {
    zelle: "+1 (415) 939-8270",
    venmo: "https://venmo.com/u/Drew-Alaraj",
  }

  useEffect(() => {
    const stored = localStorage.getItem("pendingOrder")
    if (stored) {
      setOrderData(JSON.parse(stored))
    }
  }, [])

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentProof({ ...paymentProof, screenshot: file })
    }
  }

  const sendCustomerConfirmation = async () => {
    if (!orderData || !customerInfo.email) return

    const formData = new FormData()

    formData.append("_subject", `✅ Order Confirmation #${orderData.orderId} - Sole Purpose Footwear`)
    formData.append("_template", "box")
    formData.append("_captcha", "false")

    const customerMessage = `
Hi ${customerInfo.name},

Thank you for your order with Sole Purpose Footwear! 🎨

📋 ORDER CONFIRMATION:
• Order ID: ${orderData.orderId}
• Date: ${new Date(orderData.timestamp).toLocaleString()}
• Total: $${orderData.total}

👟 YOUR ORDER:
${orderData.items.map((item) => `• ${item.name} (Size ${item.size}) x${item.quantity} - $${item.price * item.quantity}`).join("\n")}

💳 PAYMENT STATUS:
• Method: ${paymentProof.method.toUpperCase()}
• Transaction ID: ${paymentProof.transactionId}
• Status: Pending Verification

⏰ WHAT HAPPENS NEXT:
1. We'll verify your payment within 2-4 hours
2. Your order will be prepared and shipped to:
   ${customerInfo.address}
3. You'll receive tracking information once shipped

📞 QUESTIONS?
Email: solepurposefootwear813@gmail.com
Phone: (415) 939-8270

Thank you for choosing Sole Purpose Footwear!

---
The Sole Purpose Team
Custom sneaker artistry that tells your story
  `

    formData.append("Customer_Message", customerMessage)
    formData.append("Order_ID", orderData.orderId)
    formData.append("Customer_Name", customerInfo.name)
    formData.append("Total_Amount", `$${orderData.total}`)

    return fetch(`https://formsubmit.co/${customerInfo.email}`, {
      method: "POST",
      body: formData,
    })
  }

  const handleSubmitOrder = async () => {
    if (!orderData) return

    setIsSubmitting(true)

    try {
      // Send both business and customer emails simultaneously
      const [businessResponse, customerResponse] = await Promise.all([
        sendBusinessNotification(),
        sendCustomerConfirmation(),
      ])

      if (!businessResponse.ok) {
        throw new Error("Failed to send business notification")
      }

      if (!customerResponse.ok) {
        console.warn("Customer confirmation email may have failed, but order was processed")
      }

      setIsSubmitted(true)
      localStorage.removeItem("pendingOrder")
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("There was an error submitting your order. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendBusinessNotification = async () => {
    if (!orderData) return

    const formData = new FormData()

    formData.append("_subject", `🛒 New Order #${orderData.orderId} - Payment Verification`)
    formData.append("_template", "box")
    formData.append("_captcha", "false")

    // Order details
    formData.append("Order_ID", orderData.orderId)
    formData.append("Order_Items", JSON.stringify(orderData.items, null, 2))
    formData.append("Total_Amount", `$${orderData.total}`)
    formData.append("Customer_Info", JSON.stringify(customerInfo, null, 2))
    formData.append("Payment_Method", paymentProof.method.toUpperCase())
    formData.append("Transaction_ID", paymentProof.transactionId)

    if (paymentProof.screenshot) {
      formData.append("Payment_Screenshot", paymentProof.screenshot)
    }

    return fetch("https://formsubmit.co/solepurposefootwear813@gmail.com", {
      method: "POST",
      body: formData,
    })
  }

  const isPaymentProofComplete =
    paymentProof.method &&
    paymentProof.transactionId &&
    paymentProof.screenshot &&
    customerInfo.name &&
    customerInfo.email &&
    customerInfo.phone &&
    customerInfo.address

  if (!orderData) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-neutral-600 mb-4">No order found.</p>
              <Button asChild>
                <Link href="/shoes">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-playfair text-2xl font-bold mb-4">Order & Payment Proof Submitted!</h1>
              <p className="text-neutral-600 mb-6">
                Thank you! We've received your order and payment verification. We'll confirm your payment within 2-4
                hours and send you an email confirmation.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> We'll verify your payment and email you within 2-4 hours. If there are
                  any issues, we'll contact you immediately.
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild>
                  <Link href="/shoes">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-neutral-600" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-neutral-900 text-white" : "bg-neutral-200"}`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Send Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-neutral-200"></div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-neutral-600" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-neutral-900 text-white" : "bg-neutral-200"}`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Upload Proof</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Order Summary</CardTitle>
              <p className="text-sm text-neutral-600">Order ID: {orderData.orderId}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-neutral-600">
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center text-lg font-bold pt-2">
                  <span>Total:</span>
                  <span>${orderData.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Step 1: Send Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">IMPORTANT:</h3>
                    <p className="text-sm text-red-700">
                      You MUST include your Order ID: <strong>{orderData.orderId}</strong> in the payment note/memo.
                      Orders without proper ID will be delayed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Zelle</h4>
                      <p className="text-sm text-neutral-600">{paymentMethods.zelle}</p>
                      <p className="text-xs text-neutral-500 mt-1">Include Order ID in memo</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentMethods.zelle, "zelle")}
                      className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                      {copiedField === "zelle" ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <Copy className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Venmo</h4>
                      <p className="text-sm text-neutral-600">Drew Alaraj</p>
                      <p className="text-xs text-neutral-500 mt-1">Include Order ID in note</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(paymentMethods.venmo, "venmo")}
                        className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        {copiedField === "venmo" ? (
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

              <Button className="w-full" onClick={() => setCurrentStep(2)} disabled={currentStep >= 2}>
                {currentStep >= 2 ? "✓ Payment Sent" : "I've Sent the Payment"}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Step 2: Verify Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep < 2 && (
                <div className="text-center py-8 text-neutral-500">
                  <p>Complete Step 1 first</p>
                </div>
              )}

              {currentStep >= 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="paymentMethod">Payment Method Used</Label>
                      <select
                        id="paymentMethod"
                        className="w-full p-2 border rounded-lg"
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
                      <Label htmlFor="transactionId">Transaction ID / Reference Number</Label>
                      <Input
                        id="transactionId"
                        placeholder="Enter transaction ID from your payment app"
                        value={paymentProof.transactionId}
                        onChange={(e) => setPaymentProof({ ...paymentProof, transactionId: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="screenshot">Payment Screenshot</Label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="screenshot"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="screenshot" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                          <p className="text-sm text-neutral-600">
                            {paymentProof.screenshot ? paymentProof.screenshot.name : "Upload payment screenshot"}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">PNG, JPG up to 10MB</p>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information about your payment"
                        value={paymentProof.notes}
                        onChange={(e) => setPaymentProof({ ...paymentProof, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Shipping Address</Label>
                        <Textarea
                          id="address"
                          rows={3}
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={!isPaymentProofComplete || isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Order & Payment Proof"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
