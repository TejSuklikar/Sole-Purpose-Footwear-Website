import type { Metadata } from "next"
import { OrderForm } from "@/components/order-form"

export const metadata: Metadata = {
  title: "Order - Soul Purpose Footwear",
  description: "Create your custom sneaker design with Soul Purpose Footwear.",
}

export default function OrderPage() {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Create Your Custom Design
          </h1>
          <p className="text-xl text-neutral-600">
            Tell us about your vision and we'll bring it to life. Each custom order is a collaboration between you and
            our artists.
          </p>
        </div>

        <OrderForm />
      </div>
    </div>
  )
}
