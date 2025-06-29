import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components"
import type { CartItem } from "@/components/cart-provider"

interface OrderNotificationAdminProps {
  customerEmail: string
  cartItems: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  isBayArea: boolean
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
  }
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export default function OrderNotificationAdmin({
  customerEmail,
  cartItems,
  subtotal,
  shippingCost,
  total,
  isBayArea,
  shippingAddress,
}: OrderNotificationAdminProps) {
  // Check if there are any custom orders
  const hasCustomOrders = cartItems.some((item) => item.type === "custom" && item.customDetails)

  return (
    <Html>
      <Head />
      <Preview>New Order Received!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={`${baseUrl}/favicon.png`} width="40" height="40" alt="Sole Purpose Logo" />
          </Section>
          <Heading style={h1}>You've Got a New Order!</Heading>
          <Text style={text}>Payment proof is attached to this email.</Text>

          <Section style={box}>
            <Heading as="h2" style={h2}>
              Customer Details
            </Heading>
            <Text style={detailText}>
              <strong>Email:</strong> {customerEmail}
            </Text>
            <Text style={detailText}>
              <strong>Bay Area Order:</strong> {isBayArea ? "Yes" : "No"}
            </Text>
            <Text style={detailText}>
              <strong>Order Type:</strong> {hasCustomOrders ? "Contains Custom Design" : "Standard Items Only"}
            </Text>
          </Section>

          <Section style={box}>
            <Heading as="h2" style={h2}>
              Shipping Address
            </Heading>
            <Text style={addressText}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>

          <Section style={box}>
            <Heading as="h2" style={h2}>
              Order Summary
            </Heading>
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`}>
                <Row style={itemRow}>
                  <Column>
                    <Text style={itemText}>
                      {item.name} (Size: {item.size})
                      {item.type === "custom" && <span style={customBadge}> 🎨 CUSTOM</span>}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text style={itemText}>${item.price.toFixed(2)}</Text>
                  </Column>
                </Row>

                {/* Custom Design Details */}
                {item.type === "custom" && item.customDetails && (
                  <Section style={customDetailsBox}>
                    <Heading as="h3" style={h3}>
                      🎨 Custom Design Details
                    </Heading>

                    {item.customDetails.shoeType && (
                      <Text style={customDetailText}>
                        <strong>Shoe Type:</strong> {item.customDetails.shoeType}
                      </Text>
                    )}

                    {item.customDetails.designDescription && (
                      <Text style={customDetailText}>
                        <strong>Design Description:</strong> {item.customDetails.designDescription}
                      </Text>
                    )}

                    {item.customDetails.colorPreferences && (
                      <Text style={customDetailText}>
                        <strong>Color Preferences:</strong> {item.customDetails.colorPreferences}
                      </Text>
                    )}

                    {item.customDetails.inspirationImages && item.customDetails.inspirationImages.length > 0 && (
                      <Text style={customDetailText}>
                        <strong>Inspiration Images:</strong> {item.customDetails.inspirationImages.length} image(s)
                        uploaded
                      </Text>
                    )}

                    {item.customDetails.additionalNotes && (
                      <Text style={customDetailText}>
                        <strong>Additional Notes:</strong> {item.customDetails.additionalNotes}
                      </Text>
                    )}

                    {item.customDetails.timeline && (
                      <Text style={customDetailText}>
                        <strong>Timeline:</strong> {item.customDetails.timeline}
                      </Text>
                    )}

                    {item.customDetails.budget && (
                      <Text style={customDetailText}>
                        <strong>Budget:</strong> {item.customDetails.budget}
                      </Text>
                    )}

                    <Text style={customDetailText}>
                      <strong>Customer Email:</strong> {item.customDetails.email}
                    </Text>

                    <Text style={customDetailText}>
                      <strong>Customer Name:</strong> {item.customDetails.name}
                    </Text>
                  </Section>
                )}
              </div>
            ))}

            <Hr style={hr} />
            <Row>
              <Column>
                <Text style={summaryText}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={summaryText}>${subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={summaryText}>Shipping</Text>
              </Column>
              <Column align="right">
                <Text style={summaryText}>${shippingCost.toFixed(2)}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column>
                <Text style={totalText}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={totalText}>${total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {hasCustomOrders && (
            <Section style={importantNotice}>
              <Text style={noticeText}>
                ⚠️ <strong>Important:</strong> This order contains custom designs. Please review all custom details above
                before starting production.
              </Text>
            </Section>
          )}
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = { backgroundColor: "#f0f0f0", fontFamily: "Helvetica,Arial,sans-serif" }
const container = { padding: "40px", margin: "0 auto", width: "100%", maxWidth: "600px", backgroundColor: "#fff" }
const logoContainer = { textAlign: "center" as const, paddingBottom: "20px" }
const h1 = { fontSize: "28px", fontWeight: "bold", margin: "0 0 20px", color: "#000" }
const h2 = { fontSize: "20px", fontWeight: "bold", margin: "0 0 15px", color: "#000" }
const h3 = { fontSize: "16px", fontWeight: "bold", margin: "0 0 10px", color: "#2563eb" }
const text = { fontSize: "16px", lineHeight: "1.5", color: "#333" }
const box = { border: "1px solid #ddd", padding: "25px", borderRadius: "8px", marginBottom: "20px" }
const detailText = { fontSize: "16px", margin: "5px 0", color: "#333" }
const addressText = { fontSize: "16px", lineHeight: "1.5", color: "#333", margin: 0 }
const itemRow = { padding: "5px 0" }
const itemText = { fontSize: "16px", margin: 0, color: "#000" }
const customBadge = {
  backgroundColor: "#fbbf24",
  color: "#92400e",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
}
const customDetailsBox = {
  backgroundColor: "#eff6ff",
  border: "2px solid #2563eb",
  padding: "20px",
  borderRadius: "8px",
  margin: "10px 0 20px 0",
}
const customDetailText = { fontSize: "14px", margin: "8px 0", color: "#1e40af", lineHeight: "1.4" }
const summaryText = { fontSize: "16px", margin: 0, color: "#555" }
const totalText = { fontSize: "18px", fontWeight: "bold", margin: 0, color: "#000" }
const hr = { borderColor: "#ccc", margin: "15px 0" }
const importantNotice = {
  backgroundColor: "#fef3c7",
  border: "2px solid #f59e0b",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "20px",
}
const noticeText = { fontSize: "16px", margin: 0, color: "#92400e", textAlign: "center" as const }
