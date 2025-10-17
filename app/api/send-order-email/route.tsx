import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

function formatSizeDisplay(size: string, sizeCategory: string): string {
  if (sizeCategory === "Kids") {
    return size
  }
  const mensSize = Number.parseFloat(size)
  if (isNaN(mensSize)) return size
  const womensSize = mensSize + 1.5
  return `M ${mensSize} / W ${womensSize}`
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const { customer, items, subtotal, shipping, total, orderDate } = orderData

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .order-item { border-bottom: 1px solid #ddd; padding: 10px 0; }
            .total-section { margin-top: 20px; padding-top: 20px; border-top: 2px solid #000; }
            .payment-info { background-color: #fff; padding: 15px; margin: 20px 0; border-left: 4px solid #000; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
              <p>Thank you for your order!</p>
            </div>
            <div class="content">
              <p>Hi ${customer.firstName},</p>
              <p>Thank you for your order from Sole Purpose Footwear. We've received your order and will begin processing it once payment is confirmed.</p>
              
              <h2>Order Details</h2>
              ${items
                .map(
                  (item: any) => `
                <div class="order-item">
                  <strong>${item.name}</strong><br>
                  Size: ${formatSizeDisplay(item.size, item.sizeCategory)}<br>
                  ${item.customization ? `Customization: ${item.customization}<br>` : ""}
                  Price: $${item.price}
                </div>
              `,
                )
                .join("")}
              
              <div class="total-section">
                <p><strong>Subtotal:</strong> $${subtotal}</p>
                <p><strong>Shipping:</strong> $${shipping}</p>
                <p style="font-size: 18px;"><strong>Total: $${total}</strong></p>
              </div>
              
              <div class="payment-info">
                <h3>Payment Instructions</h3>
                <p><strong>Please send payment to:</strong></p>
                <p><strong>Zelle:</strong> +1 (415) 939-8270</p>
                <p><strong>Venmo:</strong> @solepurposefootwear</p>
                <p><strong>Amount:</strong> $${total}</p>
              </div>
              
              <h3>Shipping Address</h3>
              <p>
                ${customer.firstName} ${customer.lastName}<br>
                ${customer.address}<br>
                ${customer.city}, ${customer.state} ${customer.zipCode}
              </p>
              
              <p>If you have any questions, please contact us at solepurposefootwear813@gmail.com</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Sole Purpose Footwear. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .info-section { background-color: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #000; }
            .order-item { border-bottom: 1px solid #ddd; padding: 10px 0; }
            .total-section { margin-top: 20px; padding-top: 20px; border-top: 2px solid #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Order Received</h1>
              <p>Order Date: ${new Date(orderDate).toLocaleString()}</p>
            </div>
            <div class="content">
              <div class="info-section">
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Address:</strong><br>
                  ${customer.address}<br>
                  ${customer.city}, ${customer.state} ${customer.zipCode}
                </p>
                ${customer.isBayArea ? "<p><strong>Bay Area Customer</strong> (Free Shipping)</p>" : ""}
              </div>
              
              <div class="info-section">
                <h2>Order Items</h2>
                ${items
                  .map(
                    (item: any) => `
                  <div class="order-item">
                    <strong>${item.name}</strong><br>
                    Size: ${formatSizeDisplay(item.size, item.sizeCategory)}<br>
                    ${item.customization ? `Customization: ${item.customization}<br>` : ""}
                    Price: $${item.price}
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="total-section">
                <p><strong>Subtotal:</strong> $${subtotal}</p>
                <p><strong>Shipping:</strong> $${shipping}</p>
                <p style="font-size: 18px;"><strong>Total: $${total}</strong></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send customer confirmation email
    const customerEmail = await resend.emails.send({
      from: "Sole Purpose Footwear <hello@orders.solepurpose.shop>",
      to: [customer.email],
      subject: "Order Confirmation - Sole Purpose Footwear",
      html: customerEmailHtml,
    })

    console.log("[v0] Customer email sent:", customerEmail)

    // Send admin notification email
    const adminEmail = await resend.emails.send({
      from: "Sole Purpose Footwear <hello@orders.solepurpose.shop>",
      to: ["solepurposefootwear813@gmail.com"],
      subject: `New Order from ${customer.firstName} ${customer.lastName}`,
      html: adminEmailHtml,
    })

    console.log("[v0] Admin email sent:", adminEmail)

    return NextResponse.json({
      success: true,
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
