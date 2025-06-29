import { Html, Head, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"
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
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎨 New Order Received!</Heading>

          <Section style={customer_section}>
            <Text style={customer_info}>
              <strong>Customer Email:</strong> {customerEmail}
            </Text>
            <Text style={customer_info}>
              <strong>Order Total:</strong> ${total.toFixed(2)}
            </Text>
            <Text style={customer_info}>
              <strong>Bay Area Customer:</strong> {isBayArea ? "Yes (FREE delivery)" : "No"}
            </Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Order Details</Heading>
            {cartItems.map((item, index) => (
              <div key={index} style={item_container}>
                <Text style={item_name}>{item.name}</Text>
                <Text style={item_details}>
                  Size: {item.size} | Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}
                </Text>
                {item.type === "custom" && item.customDetails && (
                  <div style={custom_details}>
                    <Text style={custom_text}>🎨 Custom Design Details:</Text>
                    {item.customDetails.designDescription && (
                      <Text style={custom_text}>Description: {item.customDetails.designDescription}</Text>
                    )}
                    {item.customDetails.additionalNotes && (
                      <Text style={custom_text}>Notes: {item.customDetails.additionalNotes}</Text>
                    )}
                  </div>
                )}
              </div>
            ))}

            <Hr style={hr} />

            <Text style={total_line}>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text style={total_line}>Shipping: {isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}</Text>
            <Text style={total_final}>Total Paid: ${total.toFixed(2)}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>📦 Shipping Information</Heading>
            <Text style={address}>
              <strong>Ship to:</strong>
              <br />
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>📎 Payment Proof</Heading>
            <Text style={text}>
              Payment proof is attached to this email. Please verify payment before beginning production.
            </Text>
          </Section>

          <Text style={footer}>Reply to this email to contact the customer directly: {customerEmail}</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Arial, sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  border: "1px solid #dddddd",
}

const h1 = {
  color: "#333333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 20px 0",
}

const h2 = {
  color: "#333333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px 0",
}

const text = {
  color: "#555555",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 15px 0",
}

const customer_section = {
  backgroundColor: "#fff3cd",
  padding: "15px",
  borderRadius: "5px",
  margin: "0 0 20px 0",
}

const customer_info = {
  color: "#856404",
  fontSize: "16px",
  margin: "0 0 8px 0",
}

const section = {
  margin: "20px 0",
}

const item_container = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "5px",
  margin: "0 0 15px 0",
}

const item_name = {
  color: "#333333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 5px 0",
}

const item_details = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 0 10px 0",
}

const custom_details = {
  backgroundColor: "#e7f3ff",
  padding: "10px",
  borderRadius: "3px",
  margin: "10px 0 0 0",
}

const custom_text = {
  color: "#0c5460",
  fontSize: "14px",
  margin: "0 0 5px 0",
}

const hr = {
  border: "none",
  borderTop: "2px solid #333333",
  margin: "15px 0",
}

const total_line = {
  color: "#555555",
  fontSize: "16px",
  margin: "5px 0",
}

const total_final = {
  color: "#333333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "10px 0 0 0",
}

const address = {
  color: "#555555",
  fontSize: "16px",
  lineHeight: "22px",
  margin: "0",
}

const footer = {
  color: "#888888",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "30px 0 0 0",
  borderTop: "1px solid #eeeeee",
  paddingTop: "20px",
}
