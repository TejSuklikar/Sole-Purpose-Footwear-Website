import { NextResponse } from "next/server"
import { Resend } from "resend"
import OrderConfirmationCustomer from "@/components/emails/order-confirmation-customer"
import OrderNotificationAdmin from "@/components/emails/order-notification-admin"
import type { CartItem } from "@/components/cart-provider"

// Debug function to safely log API key info
function debugApiKey(apiKey: string | undefined) {
  if (!apiKey) {
    return {
      exists: false,
      length: 0,
      prefix: "N/A",
      hasWhitespace: false,
    }
  }

  return {
    exists: true,
    length: apiKey.length,
    prefix: apiKey.substring(0, 5),
    hasWhitespace: apiKey !== apiKey.trim(),
    endsWithNewline: apiKey.endsWith("\n") || apiKey.endsWith("\r"),
  }
}

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

  // Get and clean the API key
  const rawApiKey = process.env.RESEND_API_KEY
  const apiKey = rawApiKey?.trim()

  const debugInfo = debugApiKey(rawApiKey)
  console.log("API Key Debug Info:", debugInfo)

  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set or empty")
    return NextResponse.json({ error: "Server configuration error: Missing API key" }, { status: 500 })
  }

  // Validate API key format
  if (!apiKey.startsWith("re_")) {
    console.error("API key does not start with 're_'")
    return NextResponse.json({ error: "Server configuration error: Invalid API key format" }, { status: 500 })
  }

  // Initialize Resend with cleaned API key
  const resend = new Resend(apiKey)
  const fromEmail = "orders@orders.solepurpose.shop"
  const adminEmail = "solepurposefootwear813@gmail.com"

  try {
    // Test the API key first with a simple call
    console.log("Testing API key with Resend...")
    try {
      // This is a simple test to validate the API key
      const testResult = await resend.domains.list()
      console.log("API key test successful:", !!testResult)
    } catch (testError: any) {
      console.error("API key test failed:", testError.message)
      return NextResponse.json(
        {
          error: `API key validation failed: ${testError.message}`,
        },
        { status: 500 },
      )
    }

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
    try {
      const adminResult = await resend.emails.send({
        from: fromEmail,
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
        console.error("Admin email error:", adminResult.error)
        return NextResponse.json(
          {
            error: `Failed to send order notification: ${adminResult.error.message || "Unknown error"}`,
          },
          { status: 500 },
        )
      }

      console.log("Admin email sent successfully:", adminResult.data?.id)
    } catch (adminError: any) {
      console.error("Admin email exception:", adminError)
      return NextResponse.json(
        {
          error: `Failed to send order notification: ${adminError.message || "Unknown error"}`,
        },
        { status: 500 },
      )
    }

    // --- Send Email to Customer (Best effort) ---
    console.log("Sending customer email...")
    try {
      const customerResult = await resend.emails.send({
        from: fromEmail,
        to: [customerEmail],
        subject: "Your Sole Purpose Footwear Order Confirmation",
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
        console.error("Customer email error:", customerResult.error)
      } else {
        console.log("Customer email sent successfully:", customerResult.data?.id)
      }
    } catch (customerError) {
      console.error("Customer email exception:", customerError)
    }

    console.log("=== ORDER PROCESSING COMPLETE ===")
    return NextResponse.json({
      success: true,
      message: "Order processed successfully",
    })
  } catch (error: any) {
    console.error("Unhandled error in send-order-email route:", error)
    return NextResponse.json(
      {
        error: `An unexpected error occurred: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
