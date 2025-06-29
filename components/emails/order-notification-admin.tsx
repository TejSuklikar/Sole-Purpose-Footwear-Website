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
            {cartItems.map((item) => (
              <Row key={item.id} style={itemRow}>
                <Column>
                  <Text style={itemText}>
                    {item.name} (Size: {item.size})
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={itemText}>${item.price.toFixed(2)}</Text>
                </Column>
              </Row>
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
const text = { fontSize: "16px", lineHeight: "1.5", color: "#333" }
const box = { border: "1px solid #ddd", padding: "25px", borderRadius: "8px", marginBottom: "20px" }
const detailText = { fontSize: "16px", margin: "5px 0", color: "#333" }
const addressText = { fontSize: "16px", lineHeight: "1.5", color: "#333", margin: 0 }
const itemRow = { padding: "5px 0" }
const itemText = { fontSize: "16px", margin: 0, color: "#000" }
const summaryText = { fontSize: "16px", margin: 0, color: "#555" }
const totalText = { fontSize: "18px", fontWeight: "bold", margin: 0, color: "#000" }
const hr = { borderColor: "#ccc", margin: "15px 0" }
