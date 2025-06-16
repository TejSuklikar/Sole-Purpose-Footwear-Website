"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Send } from "lucide-react"
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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Payment information - your client can update these
  const paymentMethods = {
    zelle: "solepurposefootwear@gmail.com",
    venmo: "@SolePurposeFootwear",
    cashapp: "$SolePurposeFootwear",
  }

  useEffect(() => {
    const stored = localStorage.getItem("pendingOrder")
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
    // Here you would typically send the order to your backend
    // For now, we'll just simulate the submission
    setIsSubmitted(true)
    localStorage.removeItem("pendingOrder")
  }

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
              <h1 className="font-playfair text-2xl font-bold mb-4">Order Submitted!</h1>
              <p className="text-neutral-600 mb-6">
                Thank you! We've received your order details. Please send your payment using one of the methods above,
                and we'll confirm your order within 24 hours.
              </p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <CardTitle className="font-playfair text-xl">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">How to Pay:</h3>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. Choose a payment method below</li>
                  <li>2. Send ${orderData.total} to the provided account</li>
                  <li>3. Include your Order ID: {orderData.orderId}</li>
                  <li>4. Fill out your information and submit</li>
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

              {/* Customer Information Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Your Information</h3>
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
                disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
