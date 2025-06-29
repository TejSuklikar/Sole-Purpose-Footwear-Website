import { Html, Head, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"
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
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your order!</Heading>

          <Text style={text}>
            We've received your order and payment. We'll begin working on your custom footwear and keep you updated on
            the progress.
          </Text>

          <Section style={section}>
            <Heading style={h2}>Order Summary</Heading>
            {cartItems.map((item, index) => (
              <div key={index} style={item_container}>
                <Text style={item_name}>{item.name}</Text>
                <Text style={item_details}>
                  Size: {item.size} | Price: ${item.price.toFixed(2)}
                </Text>
              </div>
            ))}

            <Hr style={hr} />

            <Text style={total_line}>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text style={total_line}>Shipping: {isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}</Text>
            <Text style={total_final}>Total: ${total.toFixed(2)}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Shipping Address</Heading>
            <Text style={address}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>

          <Text style={footer}>Questions? Contact us at solepurposefootwear813@gmail.com</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
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
  margin: "0 0 20px 0",
}

const section = {
  margin: "20px 0",
}

const item_container = {
  borderBottom: "1px solid #eeeeee",
  padding: "10px 0",
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
  margin: "0",
}

const hr = {
  border: "none",
  borderTop: "1px solid #eeeeee",
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
}
