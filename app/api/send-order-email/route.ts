import { NextResponse } from "next/server"
import { Resend } from "resend"
import OrderConfirmationCustomer from "@/components/emails/order-confirmation-customer"
import OrderNotificationAdmin from "@/components/emails/order-notification-admin"
import type { CartItem } from "@/components/cart-provider"

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = "orders@orders.solepurpose.shop"
const adminEmail = "solepurposefootwear813@gmail.com"
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024 // 8MB

interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country?: string
}

export async function POST(request: Request) {
  console.log("=== ORDER EMAIL API CALLED ===")
  console.log("API Key exists:", !!process.env.RESEND_API_KEY)
  console.log("API Key prefix:", process.env.RESEND_API_KEY?.substring(0, 3))

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set")
    return NextResponse.json({ error: "Server configuration error: Missing API key" }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const customerEmail = formData.get("customerEmail") as string
    const cartItemsString = formData.get("cartItems") as string | null
    const paymentProof = formData.get("paymentProof") as File | null
    const subtotalString = formData.get("subtotal") as string | null
    const shippingCostString = formData.get("shippingCost") as string | null
    const totalString = formData.get("total") as string | null
    const isBayAreaString = formData.get("isBayArea") as string | null
    const shippingAddressString = formData.get("shippingAddress") as string | null

    console.log("Received data:", {
      customerEmail,
      hasCartItems: !!cartItemsString,
      hasPaymentProof: !!paymentProof,
      paymentProofSize: paymentProof?.size,
      hasShippingAddress: !!shippingAddressString,
    })

    if (
      !customerEmail ||
      !cartItemsString ||
      !paymentProof ||
      !totalString ||
      !subtotalString ||
      !shippingCostString ||
      !isBayAreaString ||
      !shippingAddressString
    ) {
      console.error("Missing required fields")
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    if (paymentProof.size > MAX_FILE_SIZE_BYTES) {
      console.error("File too large:", paymentProof.size)
      return NextResponse.json(
        { error: `File size cannot exceed ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 413 },
      )
    }

    const cartItems = JSON.parse(cartItemsString) as CartItem[]
    const subtotal = Number.parseFloat(subtotalString)
    const shippingCost = Number.parseFloat(shippingCostString)
    const total = Number.parseFloat(totalString)
    const isBayArea = isBayAreaString === "true"
    const shippingAddress = JSON.parse(shippingAddressString) as ShippingAddress

    const buffer = Buffer.from(await paymentProof.arrayBuffer())

    const attachments = [
      {
        filename: paymentProof.name,
        content: buffer,
      },
    ]

    console.log("Sending emails...")

    // --- Send Email to Admin (Priority) ---
    console.log("Sending admin email...")
    const adminResult = await resend.emails.send({
      from: `New Order <${fromEmail}>`,
      to: [adminEmail],
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
      attachments: attachments,
    })

    if (adminResult.error) {
      console.error("CRITICAL: Failed to send admin email:", adminResult.error)
      return NextResponse.json({ error: "Failed to process order. Please contact support." }, { status: 500 })
    }

    console.log("Admin email sent successfully:", adminResult.data?.id)

    // --- Send Email to Customer (Best effort) ---
    console.log("Sending customer email...")
    try {
      const customerResult = await resend.emails.send({
        from: `Soul Purpose Footwear <${fromEmail}>`,
        to: [customerEmail],
        subject: "Your Soul Purpose Footwear Order Confirmation",
        react: OrderConfirmationCustomer({
          cartItems,
          subtotal,
          shippingCost,
          total,
          isBayArea,
          shippingAddress,
        }),
      })

      if (customerResult.error) {
        console.error("Failed to send customer email:", customerResult.error)
      } else {
        console.log("Customer email sent successfully:", customerResult.data?.id)
      }
    } catch (customerError) {
      console.error("Error sending customer email:", customerError)
    }

    console.log("=== ORDER PROCESSING COMPLETE ===")
    return NextResponse.json({
      success: true,
      message: "Order processed successfully",
      adminEmailId: adminResult.data?.id,
    })
  } catch (error) {
    console.error("Unhandled error in send-order-email route:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}
