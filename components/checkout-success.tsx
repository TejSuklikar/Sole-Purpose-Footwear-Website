"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CheckoutSuccessProps {
  /** Raw query parameters forwarded from the page component */
  searchParams?: Record<string, string | string[] | undefined>
}

/**
 * Client Component
 * Safely parses the search params and renders a success message.
 */
export function CheckoutSuccess({ searchParams = {} }: CheckoutSuccessProps) {
  const orderIdRaw = searchParams["order_id"]
  const orderId = typeof orderIdRaw === "string" ? orderIdRaw : Array.isArray(orderIdRaw) ? orderIdRaw[0] : undefined

  return (
    <section className="space-y-6 text-center">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
      <h1 className="text-3xl font-semibold">Thank you for your purchase!</h1>

      {orderId && <p className="text-muted-foreground">Your order ID is {orderId}.</p>}

      <Button asChild>
        <a href="/shoes">Continue shopping</a>
      </Button>
    </section>
  )
}
