import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Order Cancelled</h1>
        <p className="text-xl text-neutral-400">Your order was cancelled. No payment was processed.</p>
        <div className="space-x-4">
          <Button asChild className="bg-white text-black hover:bg-neutral-200">
            <Link href="/shoes">Continue Shopping</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
