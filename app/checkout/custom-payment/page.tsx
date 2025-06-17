"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Send, ExternalLink, Upload, AlertCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"

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
  const [orderData, setOrderData] = useState<CustomOrderData | null>(null)
  const [paymentProof, setPaymentProof] = useState({
    method: "",
    transactionId: "",
    screenshot: null as File | null,
    notes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  // Payment information
  const paymentMethods = {
    zelle: "+1 (415) 939-8270",
    venmo: "https://venmo.com/u/Drew-Alaraj",
  }

  useEffect(() => {
    const stored = localStorage.getItem("customOrder")
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

  const sendBusinessNotification = async () => {
    const formData = new FormData()

    // Business notification email
    formData.append(
      "_subject",
      `🎨 New Custom Order #${orderData!.orderId} - ${orderData!.firstName} ${orderData!.lastName}`,
    )
    formData.append("_template", "box")
    formData.append("_captcha", "false")

    // Order Information
    formData.append("Order_ID", orderData!.orderId)
    formData.append("Customer_Name", `${orderData!.firstName} ${orderData!.lastName}`)
    formData.append("Customer_Email", orderData!.email)
    formData.append("Customer_Phone", orderData!.phone)
    formData.append("Shoe_Model", orderData!.shoeModel)
    formData.append("Shoe_Size", orderData!.size)
    formData.append("Design_Description", orderData!.designDescription)
    formData.append("Shipping_Address", orderData!.address)
    formData.append("Total_Price", `$${orderData!.price}`)
    formData.append("Order_Date", new Date(orderData!.timestamp).toLocaleString())

    // Cart items info if they exist
    if (orderData!.hasExistingCartItems && orderData!.existingCartItems) {
      const cartItemsText = orderData!.existingCartItems
        .map((item) => `${item.name} (Size ${item.size}) x${item.quantity} - $${item.price * item.quantity}`)
        .join("\n")
      formData.append("Existing_Cart_Items", cartItemsText)
      const cartTotal = orderData!.existingCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      formData.append("Cart_Total", `$${cartTotal}`)
    }

    // Payment Proof Information
    formData.append("Payment_Method", paymentProof.method.toUpperCase())
    formData.append("Transaction_ID", paymentProof.transactionId)
    if (paymentProof.notes) {
      formData.append("Payment_Notes", paymentProof.notes)
    }

    // Add screenshot if provided
    if (paymentProof.screenshot) {
      formData.append("Payment_Screenshot", paymentProof.screenshot)
    }

    // Add formatted summary for better readability
    const orderSummary = `
🎨 NEW CUSTOM ORDER RECEIVED

📋 ORDER DETAILS:
• Order ID: ${orderData!.orderId}
• Date: ${new Date(orderData!.timestamp).toLocaleString()}
• Total: $${orderData!.price}

👤 CUSTOMER INFO:
• Name: ${orderData!.firstName} ${orderData!.lastName}
• Email: ${orderData!.email}
• Phone: ${orderData!.phone}

👟 SHOE DETAILS:
• Model: ${orderData!.shoeModel}
• Size: ${orderData!.size}

🎨 DESIGN DESCRIPTION:
${orderData!.designDescription}

📦 SHIPPING ADDRESS:
${orderData!.address}

${
  orderData!.hasExistingCartItems
    ? `
🛒 CUSTOMER ALSO HAS CART ITEMS:
${orderData!.existingCartItems
  ?.map((item) => `• ${item.name} (Size ${item.size}) x${item.quantity} - $${item.price * item.quantity}`)
  .join("\n")}
Cart Total: $${orderData!.existingCartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)}

⚠️ NOTE: Cart items need separate checkout!
`
    : ""
}

💳 PAYMENT VERIFICATION:
• Method: ${paymentProof.method.toUpperCase()}
• Transaction ID: ${paymentProof.transactionId}
${paymentProof.notes ? `• Notes: ${paymentProof.notes}` : ""}
• Screenshot: ${paymentProof.screenshot ? "Attached" : "Not provided"}

⏰ NEXT STEPS:
1. Verify payment within 2-4 hours
2. Contact customer to confirm design details
3. Begin creation process (2-4 weeks)
4. Send progress photos during creation

---
Sole Purpose Footwear
Custom sneaker artistry that tells your story
    `

    formData.append("Order_Summary", orderSummary)

    // Send to business email
    return fetch("https://formsubmit.co/solepurposefootwear813@gmail.com", {
      method: "POST",
      body: formData,
    })
  }

  const sendCustomerConfirmation = async () => {
    const formData = new FormData()

    // Customer confirmation email
    formData.append("_subject", `✅ Order Confirmation #${orderData!.orderId} - Sole Purpose Footwear`)
    formData.append("_template", "box")
    formData.append("_captcha", "false")
    formData.append("_next", "https://solepurposefootwear.com/thank-you") // Optional redirect

    const customerMessage = `
Hi ${orderData!.firstName},

Thank you for your custom order with Sole Purpose Footwear! 🎨

📋 ORDER CONFIRMATION:
• Order ID: ${orderData!.orderId}
• Date: ${new Date(orderData!.timestamp).toLocaleString()}
• Total: $${orderData!.price}

👟 YOUR CUSTOM DESIGN:
• Model: ${orderData!.shoeModel}
• Size: ${orderData!.size}
• Design: ${orderData!.designDescription}

${
  orderData!.hasExistingCartItems
    ? `
🛒 CART ITEMS REMINDER:
You also have items in your cart that need separate checkout:
${orderData!.existingCartItems
  ?.map((item) => `• ${item.name} (Size ${item.size}) x${item.quantity} - $${item.price * item.quantity}`)
  .join("\n")}

Please return to the website to complete your cart checkout.
`
    : ""
}

💳 PAYMENT STATUS:
• Method: ${paymentProof.method.toUpperCase()}
• Transaction ID: ${paymentProof.transactionId}
• Status: Pending Verification

⏰ WHAT HAPPENS NEXT:
1. We'll verify your payment within 2-4 hours
2. Our team will email you to discuss design details
3. Creation begins (typically 2-4 weeks)
4. We'll send progress photos during creation
5. Your custom shoes will be shipped to:
   ${orderData!.address}

📞 QUESTIONS?
Email: solepurposefootwear813@gmail.com
Phone: (415) 939-8270

Thank you for choosing Sole Purpose Footwear to bring your vision to life!

---
The Sole Purpose Team
Custom sneaker artistry that tells your story
    `

    formData.append("Customer_Message", customerMessage)
    formData.append("Order_ID", orderData!.orderId)
    formData.append("Customer_Name", `${orderData!.firstName} ${orderData!.lastName}`)
    formData.append("Total_Amount", `$${orderData!.price}`)

    // Send to customer email
    return fetch(`https://formsubmit.co/${orderData!.email}`, {
      method: "POST",
      body: formData,
    })
  }

  const handleSubmitOrder = async () => {
    if (!orderData) return

    setIsSubmitting(true)

    try {
      // Send both emails simultaneously
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
      localStorage.removeItem("customOrder")
      // Note: We don't clear the cart here - it stays for separate checkout
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("There was an error submitting your order. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPaymentProofComplete = paymentProof.method && paymentProof.transactionId && paymentProof.screenshot

  if (!orderData) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-neutral-600 mb-4">No custom order found.</p>
              <Button asChild>
                <Link href="/order">Place Custom Order</Link>
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
              <h1 className="font-playfair text-2xl font-bold mb-4">Custom Order & Payment Proof Submitted!</h1>
              <p className="text-neutral-600 mb-6">
                Thank you! We've received your custom order and payment verification. We'll confirm your payment within
                2-4 hours and begin working on your design.
              </p>
              {orderData.hasExistingCartItems && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <p className="font-semibold text-blue-800">Don't Forget Your Cart!</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    You still have items in your cart that need separate checkout. Click below to complete that order.
                  </p>
                </div>
              )}
              <div className="space-y-4">
                {orderData.hasExistingCartItems && (
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/shoes">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Complete Cart Checkout
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/shoes">View Our Work</Link>
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
        {/* Cart Items Reminder */}
        {orderData.hasExistingCartItems && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <ShoppingCart className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Cart Items Saved</h3>
                  <p className="text-sm text-blue-800">
                    Your cart items are saved and will need separate checkout after this custom order.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-neutral-600" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-white text-black" : "bg-neutral-600 text-neutral-400"}`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Send Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-neutral-600"></div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-neutral-600" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-white text-black" : "bg-neutral-600 text-neutral-400"}`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Upload Proof</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Custom Order Summary</CardTitle>
              <p className="text-sm text-neutral-600">Order ID: {orderData.orderId}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg">Custom Sneaker Design</h4>
                  <div className="text-sm text-neutral-600 space-y-1 mt-2">
                    <p>
                      <strong>Model:</strong> {orderData.shoeModel}
                    </p>
                    <p>
                      <strong>Size:</strong> {orderData.size}
                    </p>
                    <p>
                      <strong>Customer:</strong> {orderData.firstName} {orderData.lastName}
                    </p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h5 className="font-medium mb-2">Design Description:</h5>
                  <p className="text-sm text-neutral-600">{orderData.designDescription}</p>
                </div>

                <div className="flex justify-between items-center text-xl font-bold pt-2">
                  <span>Total:</span>
                  <span>${orderData.price}</span>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-4">Step 1: Send Payment</h3>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">IMPORTANT:</h4>
                      <p className="text-sm text-red-700">
                        Include Order ID: <strong>{orderData.orderId}</strong> in payment note
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Zelle</h4>
                        <p className="text-sm text-neutral-600">{paymentMethods.zelle}</p>
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

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Venmo</h4>
                        <p className="text-sm text-neutral-600">Drew Alaraj</p>
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

                <Button className="w-full mt-4" onClick={() => setCurrentStep(2)} disabled={currentStep >= 2}>
                  {currentStep >= 2 ? "✓ Payment Sent" : "I've Sent the Payment"}
                </Button>
              </div>
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
                      <Label htmlFor="screenshot">Payment Screenshot (Required)</Label>
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

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={!isPaymentProofComplete || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Order...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Custom Order & Payment Proof
                      </>
                    )}
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
