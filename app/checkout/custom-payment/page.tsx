"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Send } from "lucide-react"
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
}

export default function CustomPaymentPage() {
  const [orderData, setOrderData] = useState<CustomOrderData | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Payment information - updated with correct email
  const paymentMethods = {
    zelle: "solepurposefootwear813@gmail.com",
    venmo: "@SolePurposeFootwear",
    cashapp: "$SolePurposeFootwear",
  }

  useEffect(() => {
    const stored = localStorage.getItem("customOrder")
    if (stored) {
      setOrderData(JSON.parse(stored))
    }
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmitOrder = async () => {
    setIsSubmitted(true)
    localStorage.removeItem("customOrder")
  }

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
              <h1 className="font-playfair text-2xl font-bold mb-4">Custom Order Submitted!</h1>
              <p className="text-neutral-600 mb-6">
                Thank you! We've received your custom order details. Please send your payment using one of the methods
                above, and we'll confirm your order within 24 hours.
              </p>
              <div className="space-y-4">
                <Button asChild>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="border-b pb-4">
                  <h5 className="font-medium mb-2">Shipping Address:</h5>
                  <p className="text-sm text-neutral-600 whitespace-pre-line">{orderData.address}</p>
                </div>

                <div className="flex justify-between items-center text-xl font-bold pt-2">
                  <span>Total:</span>
                  <span>${orderData.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">How to Pay:</h3>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. Choose a payment method below</li>
                  <li>2. Send ${orderData.price} to the provided account</li>
                  <li>3. Include your Order ID: {orderData.orderId}</li>
                  <li>4. Click "Confirm Payment Sent" below</li>
                </ol>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Zelle</h4>
                      <p className="text-sm text-neutral-600">{paymentMethods.zelle}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(paymentMethods.zelle, "zelle")}>
                      {copiedField === "zelle" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Venmo</h4>
                      <p className="text-sm text-neutral-600">{paymentMethods.venmo}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(paymentMethods.venmo, "venmo")}>
                      {copiedField === "venmo" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Cash App</h4>
                      <p className="text-sm text-neutral-600">{paymentMethods.cashapp}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(paymentMethods.cashapp, "cashapp")}
                    >
                      {copiedField === "cashapp" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmitOrder}>
                <Send className="mr-2 h-4 w-4" />
                Confirm Payment Sent
              </Button>

              <p className="text-xs text-neutral-500 text-center">
                By clicking "Confirm Payment Sent", you confirm that you have sent the payment using one of the methods
                above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
