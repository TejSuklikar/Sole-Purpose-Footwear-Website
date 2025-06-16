import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { items, type = "cart" } = await request.json()

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    if (type === "custom_order") {
      // Custom order - fixed price of $350
      line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Sneaker Design",
              description: "Hand-painted custom sneaker design",
            },
            unit_amount: 35000, // $350 in cents
          },
          quantity: 1,
        },
      ]
    } else {
      // Cart items
      line_items = items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Size: ${item.size}`,
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }))
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
      metadata: {
        type,
        ...(type === "custom_order" && items.orderData ? { orderData: JSON.stringify(items.orderData) } : {}),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}
