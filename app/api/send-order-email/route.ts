import { NextResponse } from "next/server"
import { Resend } from "resend"
import OrderConfirmationCustomerEmail from "@/components/emails/order-confirmation-customer"
import OrderNotificationAdminEmail from "@/components/emails/order-notification-admin"

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = "solepurposefootwear813@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerEmail, cartItems, subtotal, shippingCost, total, isBayArea, paymentProof } = body

    if (!customerEmail || !cartItems || !total || !paymentProof) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const attachments = []
    if (paymentProof && paymentProof.content) {
      attachments.push({
        filename: paymentProof.filename,
        content: paymentProof.content.split("base64,")[1], // Get only the base64 part
      })
    }

    // Send email to customer
    const { data: customerData, error: customerError } = await resend.emails.send({
      from: "Soul Purpose Footwear <orders@solepurpose.shop>",
      to: [customerEmail],
      subject: "Your Soul Purpose Footwear Order Confirmation",
      react: OrderConfirmationCustomerEmail({
        customerEmail,
        cartItems,
        subtotal,
        shippingCost,
        total,
        isBayArea,
        hasAttachment: attachments.length > 0,
      }),
      attachments: attachments,
    })

    if (customerError) {
      console.error("Error sending customer email:", customerError)
      return NextResponse.json({ error: "Failed to send customer email" }, { status: 500 })
    }

    // Send email to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "Soul Purpose Footwear <orders@solepurpose.shop>",
      to: [adminEmail],
      subject: `New Order Received - ${customerEmail}`,
      react: OrderNotificationAdminEmail({
        customerEmail,
        cartItems,
        subtotal,
        shippingCost,
        total,
        isBayArea,
        hasAttachment: attachments.length > 0,
      }),
      attachments: attachments,
    })

    if (adminError) {
      console.error("Error sending admin email:", adminError)
      // Don't fail the whole request if only admin email fails
    }

    return NextResponse.json({ message: "Emails sent successfully" })
  } catch (error) {
    console.error("Error in send-order-email API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
