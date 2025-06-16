import { Suspense } from "react"
import { CheckoutSuccess } from "@/components/checkout-success"

export default function CheckoutSuccessPage() {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutSuccess />
        </Suspense>
      </div>
    </div>
  )
}
