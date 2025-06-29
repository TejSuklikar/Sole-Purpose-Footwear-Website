import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"
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
      <Preview>Your Soul Purpose Footwear order has been received!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your order!</Heading>

          <Text style={text}>
            We've received your order and will begin processing it shortly. You'll receive another email when your
            custom shoes are ready for pickup/delivery.
          </Text>

          <Section style={orderSection}>
            <Heading style={h2}>Order Summary</Heading>

            {cartItems.map((item, index) => (
              <div key={index} style={itemRow}>
                <Text style={itemName}>{item.name}</Text>
                <Text style={itemDetails}>
                  Size: {item.size} | Quantity: {item.quantity}
                </Text>
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
              <Text style={totalValue}>{isBayArea ? "FREE (Bay Area Pickup)" : `$${shippingCost.toFixed(2)}`}</Text>
            </div>

            <div style={totalRow}>
              <Text style={totalLabelFinal}>Total:</Text>
              <Text style={totalValueFinal}>${total.toFixed(2)}</Text>
            </div>
          </Section>

          <Section style={shippingSection}>
            <Heading style={h2}>{isBayArea ? "Pickup Address" : "Shipping Address"}</Heading>
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

          <Text style={footer}>Questions? Reply to this email or contact us at solepurposefootwear813@gmail.com</Text>
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

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
  margin: "0 40px",
}

const orderSection = {
  margin: "40px 40px",
}

const itemRow = {
  borderBottom: "1px solid #eee",
  padding: "15px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
