import { NextResponse } from "next/server"
import { Resend } from "resend"
import OrderConfirmationCustomer from "@/components/emails/order-confirmation-customer"
import OrderNotificationAdmin from "@/components/emails/order-notification-admin"
import type { CartItem } from "@/components/cart-provider"

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = "orders@orders.solepurpose.shop"
const adminEmail = "solepurposefootwear813@gmail.com"
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024 // 8MB

export async function POST(request: Request) {
  if (!fromEmail || !adminEmail) {
    console.error("Missing FROM_EMAIL or ADMIN_EMAIL environment variables.")
    return NextResponse.json({ error: "Server configuration error. Please contact support." }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const customerEmail = formData.get("customerEmail") as string
    const cartItems = JSON.parse(formData.get("cartItems") as string) as CartItem[]
    const subtotal = Number.parseFloat(formData.get("subtotal") as string)
    const shippingCost = Number.parseFloat(formData.get("shippingCost") as string)
    const total = Number.parseFloat(formData.get("total") as string)
    const isBayArea = formData.get("isBayArea") === "true"
    const shippingAddress = JSON.parse(formData.get("shippingAddress") as string)
    const paymentProof = formData.get("paymentProof") as File | null

    // --- Validation ---
    if (!customerEmail || !cartItems || !shippingAddress || !paymentProof) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    if (paymentProof.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "Payment proof file is too large." }, { status: 400 })
    }

    const buffer = Buffer.from(await paymentProof.arrayBuffer())

    // --- Email to Admin ---
    const adminEmailData = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Order Received - ${customerEmail}`,
      react: OrderNotificationAdmin({
        customerEmail,
        cartItems,
        subtotal,
        shippingCost,
        total,
        isBayArea,
        shippingAddress,
      }),
      attachments: [
        {
          filename: paymentProof.name,
          content: buffer,
        },
      ],
    })

    if (adminEmailData.error) {
      throw new Error(`Error sending admin email: ${adminEmailData.error.message}`)
    }

    // --- Email to Customer ---
    const customerEmailData = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: "Your Sole Purpose Order Confirmation",
      react: OrderConfirmationCustomer({
        cartItems,
        subtotal,
        shippingCost,
        total,
        isBayArea,
        shippingAddress,
      }),
    })

    if (customerEmailData.error) {
      // If this fails, we don't need to fail the whole request, but we should log it.
      console.error(`Failed to send confirmation to ${customerEmail}: ${customerEmailData.error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in send-order-email route:", error)
    return NextResponse.json({ error: error.message || "An internal server error occurred." }, { status: 500 })
  }
}
