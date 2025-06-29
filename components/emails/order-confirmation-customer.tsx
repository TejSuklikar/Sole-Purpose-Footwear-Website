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

interface OrderConfirmationCustomerProps {
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

export default function OrderConfirmationCustomer({
  cartItems,
  subtotal,
  shippingCost,
  total,
  isBayArea,
  shippingAddress,
}: OrderConfirmationCustomerProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Sole Purpose Order Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={`${baseUrl}/favicon.png`} width="40" height="40" alt="Sole Purpose Logo" />
          </Section>
          <Heading style={h1}>Thank you for your order!</Heading>
          <Text style={text}>
            We've received your order and will begin processing it shortly. You'll receive another email once your
            customs are ready to ship.
          </Text>
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
                <Text style={summaryText}>{isBayArea ? "FREE" : `$${shippingCost.toFixed(2)}`}</Text>
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

          <Section style={box}>
            <Heading as="h2" style={h2}>
              Shipping To
            </Heading>
            <Text style={addressText}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>

          <Text style={footerText}>
            Sole Purpose Footwear | Custom Kicks, Endless Soul
            <br />
            Questions? Contact us at solepurposefootwear813@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = { backgroundColor: "#000", fontFamily: "Helvetica,Arial,sans-serif", color: "#fff" }
const container = { padding: "40px", margin: "0 auto", width: "100%", maxWidth: "600px" }
const logoContainer = { textAlign: "center" as const, paddingBottom: "20px" }
const h1 = { fontSize: "28px", fontWeight: "bold", margin: "0 0 20px" }
const h2 = { fontSize: "20px", fontWeight: "bold", margin: "0 0 15px" }
const text = { fontSize: "16px", lineHeight: "1.5", color: "#ccc" }
const box = { backgroundColor: "#111", padding: "25px", borderRadius: "8px", marginBottom: "20px" }
const itemRow = { padding: "5px 0" }
const itemText = { fontSize: "16px", margin: 0, color: "#fff" }
const summaryText = { fontSize: "16px", margin: 0, color: "#ccc" }
const totalText = { fontSize: "18px", fontWeight: "bold", margin: 0, color: "#fff" }
const addressText = { fontSize: "16px", lineHeight: "1.5", color: "#ccc", margin: 0 }
const hr = { borderColor: "#333", margin: "15px 0" }
const footerText = { fontSize: "12px", color: "#777", textAlign: "center" as const, paddingTop: "20px" }
