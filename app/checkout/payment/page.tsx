"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Palette } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Types
interface CartItem {
  id: number
  name: string
  price: number
  size: string
  quantity: number
  image: string
  type?: "regular" | "custom"
  customDetails?: {
    isBayArea: boolean
    [key: string]: any
  }
}

interface OrderData {
  items: CartItem[]
  total: number // This is the subtotal
}

const VENMO_LINK = "https://venmo.com/u/Drew-Alaraj"
const ZELLE_PHONE = "1(415)939-8270"

export default function PaymentPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { clearCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const pendingOrderData = localStorage.getItem("pendingOrder")
    if (pendingOrderData) {
      try {
        const parsedOrder: OrderData = JSON.parse(pendingOrderData)
        if (parsedOrder && parsedOrder.items && parsedOrder.items.length > 0) {
          setOrder(parsedOrder)
        }
      } catch (e) {
        console.error("Failed to parse order data", e)
      }
    }
    setLoading(false)
  }, [])

  const shippingCost = useMemo(() => {
    if (!order) return 0

    const isBayArea = order.items.some((item) => item.type === "custom" && item.customDetails?.isBayArea)
    if (isBayArea) {
      return 0
    }

    let maxShipping = 0
    order.items.forEach((item) => {
      const size = item.size.toUpperCase()
      const currentItemShipping = size.includes("C") || size.includes("Y") ? 15 : 20
      if (currentItemShipping > maxShipping) {
        maxShipping = currentItemShipping
      }
    })
    return maxShipping
  }, [order])

  const finalTotal = useMemo(() => {
    if (!order) return 0
    return order.total + shippingCost
  }, [order, shippingCost])

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${label} Copied!`,
      description: text,
    })
  }

  const handleConfirmOrder = () => {
    localStorage.removeItem("pendingOrder")
    clearCart()
    router.push("/checkout/success")
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p>Loading your order...</p>
        </div>
      </div>
    )
  }

  if (!order || order.items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-100 mb-4">No items in cart</h3>
          <Link href="/shoes">
            <Button variant="secondary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Order</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side: Order Summary */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      {item.type === "custom" && (
                        <span className="text-xs inline-flex items-center font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          <Palette className="w-3 h-3 mr-1" />
                          Custom Order
                        </span>
                      )}
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Free"}</p>
                  </div>
                  {shippingCost === 0 &&
                    order.items.some((item) => item.type === "custom" && item.customDetails?.isBayArea) && (
                      <p className="text-sm text-green-600 text-right">- Bay Area discount applied</p>
                    )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${finalTotal.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side: Payment Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTitle className="flex items-center gap-2">
                    <Image src="/images/venmo-logo.png" width={20} height={20} alt="Venmo" />
                    Pay with Venmo
                  </AlertTitle>
                  <AlertDescription>
                    Send <span className="font-bold">${finalTotal.toFixed(2)}</span> to our Venmo.
                    <div className="mt-2 flex items-center gap-2">
                      <Link href={VENMO_LINK} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          @Drew-Alaraj
                        </Button>
                      </Link>
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">Please include your name in the payment note.</p>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertTitle className="flex items-center gap-2">
                    <Image src="/images/zelle-logo.png" width={20} height={20} alt="Zelle" />
                    Pay with Zelle
                  </AlertTitle>
                  <AlertDescription>
                    Send <span className="font-bold">${finalTotal.toFixed(2)}</span> via Zelle to:
                    <div className="mt-2 flex items-center gap-2">
                      <p className="font-mono bg-muted p-2 rounded-md">{ZELLE_PHONE}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(ZELLE_PHONE.replace(/[()]/g, ""), "Zelle Number")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">Please include your name in the payment note.</p>
                  </AlertDescription>
                </Alert>

                <div className="text-sm text-muted-foreground pt-4 border-t">
                  After sending payment, please click the button below. We will verify payment and begin processing your
                  order within 24 hours.
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleConfirmOrder}>
                  I've Sent The Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
