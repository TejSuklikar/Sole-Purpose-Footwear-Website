import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { OrderConfirmationCustomer } from "@/components/emails/order-confirmation-customer"
import { OrderNotificationAdmin } from "@/components/emails/order-notification-admin"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    console.log("Processing order:", {
      customer: orderData.customer.email,
      items: orderData.items.length,
      total: orderData.total,
    })

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "Sole Purpose Footwear <orders@solepurposefootwear.com>",
      to: [orderData.customer.email],
      subject: "Order Confirmation - Sole Purpose Footwear",
      react: OrderConfirmationCustomer({ orderData }),
    })

    console.log("Customer email sent:", customerEmail.data?.id)

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "Sole Purpose Footwear <orders@solepurposefootwear.com>",
      to: ["solepurposefootwear813@gmail.com"],
      subject: `New Order from ${orderData.customer.firstName} ${orderData.customer.lastName}`,
      react: OrderNotificationAdmin({ orderData }),
    })

    console.log("Admin email sent:", adminEmail.data?.id)

    return NextResponse.json({
      success: true,
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send order emails" }, { status: 500 })
  }
}
