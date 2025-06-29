import { Body, Container, Head, Heading, Html, Preview, Section, Text, Row, Column } from "@react-email/components"
import type { CartItem } from "@/components/cart-provider"

interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country?: string
}

interface OrderConfirmationCustomerProps {
  cartItems: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  isBayArea: boolean
  shippingAddress: ShippingAddress
}

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
      <Preview>Your Soul Purpose Footwear order confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Order Confirmation</Heading>
            <Text style={text}>
              Thank you for your order! We've received your payment and will begin working on your custom footwear.
            </Text>
          </Section>

          <Section style={orderSection}>
            <Heading style={h2}>Order Summary</Heading>
            {cartItems.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemColumn}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemDetails}>Size: {item.size}</Text>
                  {item.type === "custom" && item.customDetails && <Text style={itemDetails}>Custom Design</Text>}
                </Column>
                <Column style={priceColumn}>
                  <Text style={price}>${(item.price * item.quantity).toFixed(2)}</Text>
                </Column>
              </Row>
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
                <Text style={totalValue}>{isBayArea ? "FREE" : `$${shippingCost.toFixed(2)}`}</Text>
              </Column>
            </Row>

            <Row style={finalTotalRow}>
              <Column>
                <Text style={finalTotalLabel}>Total:</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={finalTotalValue}>${total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={shippingSection}>
            <Heading style={h2}>Shipping Address</Heading>
            <Text style={address}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              We'll keep you updated on your order progress. If you have any questions, please contact us at
              solepurposefootwear813@gmail.com
            </Text>
            <Text style={footerText}>Thank you for choosing Soul Purpose Footwear!</Text>
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

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const orderSection = {
  padding: "0 24px",
}

const itemRow = {
  borderBottom: "1px solid #eee",
  padding: "12px 0",
}

const itemColumn = {
  verticalAlign: "top" as const,
}

const priceColumn = {
  textAlign: "right" as const,
  verticalAlign: "top" as const,
  width: "100px",
}

const itemName = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 4px",
}

const itemDetails = {
  color: "#666",
  fontSize: "14px",
  margin: "0",
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
  margin: "0",
}

const footer = {
  padding: "24px",
  textAlign: "center" as const,
}

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 12px",
}
