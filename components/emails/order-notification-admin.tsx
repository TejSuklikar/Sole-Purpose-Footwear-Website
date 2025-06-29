import { Body, Container, Head, Heading, Html, Preview, Section, Text, Row, Column } from "@react-email/components"
import type { CartItem } from "@/components/cart-provider"

interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country?: string
}

interface OrderNotificationAdminProps {
  customerEmail: string
  cartItems: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  isBayArea: boolean
  shippingAddress: ShippingAddress
}

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
      <Preview>New order received from {customerEmail}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🎨 New Order Received!</Heading>
            <Text style={customerInfo}>
              <strong>Customer:</strong> {customerEmail}
            </Text>
            <Text style={customerInfo}>
              <strong>Order Total:</strong> ${total.toFixed(2)}
            </Text>
          </Section>

          <Section style={orderSection}>
            <Heading style={h2}>Order Details</Heading>
            {cartItems.map((item, index) => (
              <div key={index} style={itemContainer}>
                <Row style={itemRow}>
                  <Column style={itemColumn}>
                    <Text style={itemName}>{item.name}</Text>
                    <Text style={itemDetails}>Size: {item.size}</Text>
                    <Text style={itemDetails}>Quantity: {item.quantity}</Text>
                    {item.type === "custom" && item.customDetails && (
                      <>
                        <Text style={customLabel}>🎨 Custom Design Details:</Text>
                        <Text style={customDetails}>Design: {item.customDetails.design}</Text>
                        <Text style={customDetails}>Colors: {item.customDetails.colors}</Text>
                        <Text style={customDetails}>
                          Special Requests: {item.customDetails.specialRequests || "None"}
                        </Text>
                      </>
                    )}
                  </Column>
                  <Column style={priceColumn}>
                    <Text style={price}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </Column>
                </Row>
              </div>
            ))}

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal:</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
              </Column>
            </Row>

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping:</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={totalValue}>{isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}</Text>
              </Column>
            </Row>

            <Row style={finalTotalRow}>
              <Column>
                <Text style={finalTotalLabel}>Total Paid:</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={finalTotalValue}>${total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={shippingSection}>
            <Heading style={h2}>📦 Shipping Information</Heading>
            <Text style={address}>
              <strong>Ship to:</strong>
              <br />
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
            {isBayArea && (
              <Text style={bayAreaNote}>
                ✅ <strong>Bay Area Customer</strong> - Free pickup/dropoff available
              </Text>
            )}
          </Section>

          <Section style={actionSection}>
            <Heading style={h2}>📎 Payment Proof</Heading>
            <Text style={text}>
              Payment proof is attached to this email. Please verify the payment before beginning production.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>Reply to this email to contact the customer directly at: {customerEmail}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const header = {
  padding: "32px 24px",
  textAlign: "center" as const,
  backgroundColor: "#f8f9fa",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px",
}

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "24px 0 16px",
}

const customerInfo = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 8px",
}

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const orderSection = {
  padding: "0 24px",
}

const itemContainer = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  margin: "0 0 16px",
  padding: "16px",
}

const itemRow = {
  margin: "0",
}

const itemColumn = {
  verticalAlign: "top" as const,
}

const priceColumn = {
  textAlign: "right" as const,
  verticalAlign: "top" as const,
  width: "120px",
}

const itemName = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 8px",
}

const itemDetails = {
  color: "#666",
  fontSize: "14px",
  margin: "0 0 4px",
}

const customLabel = {
  color: "#e67e22",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "8px 0 4px",
}

const customDetails = {
  color: "#666",
  fontSize: "14px",
  margin: "0 0 4px",
  paddingLeft: "16px",
}

const price = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
}

const totalRow = {
  padding: "8px 0",
}

const totalLabel = {
  color: "#666",
  fontSize: "16px",
  margin: "0",
}

const totalValue = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
}

const finalTotalRow = {
  borderTop: "2px solid #333",
  padding: "12px 0",
}

const finalTotalLabel = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0",
}

const finalTotalValue = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0",
}

const shippingSection = {
  padding: "0 24px",
}

const address = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const bayAreaNote = {
  color: "#27ae60",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
}

const actionSection = {
  padding: "0 24px",
}

const footer = {
  padding: "24px",
  textAlign: "center" as const,
  backgroundColor: "#f8f9fa",
}

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0",
}
