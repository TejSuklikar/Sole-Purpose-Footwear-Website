import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Custom Order - ${orderData.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: white; padding: 20px; text-align: center; margin-bottom: 20px; }
            .order-section { background: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 8px; }
            .order-section h3 { margin-top: 0; color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; }
            .detail-row { display: flex; justify-content: space-between; margin: 8px 0; }
            .detail-label { font-weight: bold; }
            .total-section { background: #000; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; }
            .payment-proof { background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; margin: 15px 0; border-radius: 8px; }
            .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; margin: 10px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎨 New Custom Order Received</h1>
            <p>Order ID: ${orderData.orderId}</p>
          </div>

          <div class="order-section">
            <h3>👤 Customer Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span>${orderData.firstName} ${orderData.lastName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${orderData.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span>${orderData.phone}</span>
            </div>
          </div>

          <div class="order-section">
            <h3>👟 Shoe Details</h3>
            <div class="detail-row">
              <span class="detail-label">Model:</span>
              <span>${orderData.shoeModel}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Size:</span>
              <span>${orderData.size}</span>
            </div>
          </div>

          <div class="order-section">
            <h3>🎨 Design Description</h3>
            <p style="background: white; padding: 10px; border-radius: 4px; margin: 10px 0;">
              ${orderData.designDescription}
            </p>
          </div>

          <div class="order-section">
            <h3>📦 Shipping Address</h3>
            <p style="background: white; padding: 10px; border-radius: 4px; margin: 10px 0; white-space: pre-line;">
              ${orderData.address}
            </p>
          </div>

          <div class="payment-proof">
            <h3>💳 Payment Verification Details</h3>
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span>${orderData.paymentProof?.method?.toUpperCase() || "Not specified"}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span>${orderData.paymentProof?.transactionId || "Not provided"}</span>
            </div>
            ${
              orderData.paymentProof?.notes
                ? `
            <div style="margin-top: 10px;">
              <span class="detail-label">Customer Notes:</span>
              <p style="background: white; padding: 8px; border-radius: 4px; margin: 5px 0;">
                ${orderData.paymentProof.notes}
              </p>
            </div>
            `
                : ""
            }
            <div class="alert">
              <strong>📸 Payment Screenshot:</strong> Customer uploaded payment proof screenshot
            </div>
          </div>

          <div class="total-section">
            💰 Total: $${orderData.price}
          </div>

          <div class="order-section">
            <h3>⏰ Order Timeline</h3>
            <p><strong>Submitted:</strong> ${new Date(orderData.timestamp).toLocaleString()}</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Verify payment within 2-4 hours</li>
              <li>Contact customer to confirm design details</li>
              <li>Begin creation process (2-4 weeks)</li>
              <li>Send progress photos during creation</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
            <p><strong>Sole Purpose Footwear</strong></p>
            <p>Custom sneaker artistry that tells your story</p>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "orders@solepurposefootwear.com", // You'll need to verify this domain with Resend
      to: ["drew.alaraj@gmail.com"], // Your business email
      subject: `🎨 New Custom Order #${orderData.orderId} - ${orderData.firstName} ${orderData.lastName}`,
      html: emailHtml,
    })

    if (error) {
      console.error("Email error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
