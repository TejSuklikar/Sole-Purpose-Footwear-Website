import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"
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
          <Heading style={h1}>New Order Received!</Heading>

          <Section style={customerSection}>
            <Heading style={h2}>Customer Information</Heading>
            <Text style={customerInfo}>
              <strong>Email:</strong> {customerEmail}
            </Text>
            <Text style={customerInfo}>
              <strong>Delivery Method:</strong> {isBayArea ? "Bay Area Pickup/Dropoff" : "Shipping"}
            </Text>
          </Section>

          <Section style={orderSection}>
            <Heading style={h2}>Order Details</Heading>

            {cartItems.map((item, index) => (
              <div key={index} style={itemRow}>
                <div>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemDetails}>
                    Size: {item.size} | Quantity: {item.quantity}
                  </Text>
                </div>
                <Text style={itemPrice}>${item.price.toFixed(2)}</Text>
              </div>
            ))}

            <Hr style={hr} />

            <div style={totalRow}>
              <Text style={totalLabel}>Subtotal:</Text>
              <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
            </div>

            <div style={totalRow}>
              <Text style={totalLabel}>Shipping:</Text>
              <Text style={totalValue}>{isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}</Text>
            </div>

            <div style={totalRow}>
              <Text style={totalLabelFinal}>Total:</Text>
              <Text style={totalValueFinal}>${total.toFixed(2)}</Text>
            </div>
          </Section>

          <Section style={shippingSection}>
            <Heading style={h2}>{isBayArea ? "Customer Address" : "Shipping Address"}</Heading>
            <Text style={address}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              {shippingAddress.country && (
                <>
                  <br />
                  {shippingAddress.country}
                </>
              )}
            </Text>
          </Section>

          <Text style={footer}>Payment proof is attached to this email.</Text>
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

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
}

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "30px 0 15px",
}

const customerSection = {
  margin: "40px 40px",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
}

const customerInfo = {
  fontSize: "16px",
  color: "#333",
  margin: "10px 0",
}

const orderSection = {
  margin: "40px 40px",
}

const itemRow = {
  borderBottom: "1px solid #eee",
  padding: "15px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const itemName = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  margin: "0",
}

const itemDetails = {
  fontSize: "14px",
  color: "#666",
  margin: "5px 0 0 0",
}

const itemPrice = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  margin: "0",
}

const hr = {
  borderColor: "#ddd",
  margin: "20px 0",
}

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
}

const totalLabel = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
}

const totalValue = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
}

const totalLabelFinal = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  margin: "0",
}

const totalValueFinal = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  margin: "0",
}

const shippingSection = {
  margin: "40px 40px",
}

const address = {
  fontSize: "16px",
  color: "#333",
  lineHeight: "24px",
  margin: "0",
}

const footer = {
  color: "#666",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "40px 40px 0",
}
