import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="font-playfair text-2xl font-bold mb-4">Payment Cancelled</h1>
            <p className="text-neutral-600 mb-6">Your payment was cancelled. No charges were made to your account.</p>
            <div className="space-y-4">
              <Button asChild>
                <Link href="/shoes">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/order">Place Custom Order</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
