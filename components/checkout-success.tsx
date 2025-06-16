"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useCart } from "./cart-provider"

export function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isLoading, setIsLoading] = useState(true)
  const { dispatch } = useCart()

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      dispatch({ type: "CLEAR_CART" })
      setIsLoading(false)
    }
  }, [sessionId, dispatch])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p>Processing your order...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-playfair text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-neutral-600 mb-6">
          Thank you for your order. We'll send you an email confirmation shortly with your order details and tracking
          information.
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
  )
}
