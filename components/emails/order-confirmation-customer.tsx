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

interface EmailProps {
  customerEmail: string
  cartItems: any[]
  subtotal: number
  shippingCost: number
  total: number
  isBayArea: boolean
  hasAttachment: boolean
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const OrderConfirmationCustomerEmail = ({
  customerEmail,
  cartItems,
  subtotal,
  shippingCost,
  total,
  isBayArea,
  hasAttachment,
}: EmailProps) => (
  <Html>
    <Head />
    <Preview>Your Soul Purpose Footwear Order Confirmation</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img src={`${baseUrl}/placeholder-logo.png`} width="120" height="35" alt="Soul Purpose Footwear" />
        </Section>
        <Heading style={h1}>Thanks for your order!</Heading>
        <Text style={text}>
          Hi {customerEmail.split("@")[0]}, we've received your order and will begin processing it shortly. Please
          remember to send your payment via Zelle or Venmo to finalize the order.
        </Text>
        {hasAttachment && <Text style={text}>We've also received your payment proof attachment.</Text>}
        <Section>
          <Row>
            <Column>
              <Text style={text}>
                <strong>Zelle:</strong> +1 (415) 939-8270
              </Text>
            </Column>
            <Column>
              <Text style={text}>
                <strong>Venmo:</strong> @Drew-Alaraj
              </Text>
            </Column>
          </Row>
        </Section>
        <Hr style={hr} />
        <Heading as="h2" style={h2}>
          Order Summary
        </Heading>
        {cartItems.map((item) => (
          <Section key={item.id} style={itemSection}>
            <Row>
              <Column style={{ width: "64px" }}>
                <Img
                  src={item.image || `${baseUrl}/placeholder.svg`}
                  width="64"
                  height="64"
                  alt={item.name}
                  style={itemImage}
                />
              </Column>
              <Column>
                <Text style={itemTitle}>{item.name}</Text>
                <Text style={itemDescription}>Size: {item.size}</Text>
              </Column>
              <Column style={{ textAlign: "right" }}>
                <Text style={itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>
        ))}
        <Hr style={hr} />
        <Section style={pricingSection}>
          <Row>
            <Column style={pricingText}>Subtotal</Column>
            <Column style={pricingValue}>${subtotal.toFixed(2)}</Column>
          </Row>
          <Row>
            <Column style={pricingText}>Shipping</Column>
            <Column style={pricingValue}>{isBayArea ? "FREE" : `$${shippingCost.toFixed(2)}`}</Column>
          </Row>
          <Hr style={hr} />
          <Row>
            <Column style={pricingTextTotal}>Total</Column>
            <Column style={pricingValueTotal}>${total.toFixed(2)}</Column>
          </Row>
        </Section>
        <Hr style={hr} />
        <Section style={{ textAlign: "center" }}>
          <Text style={footerText}>Questions about your order? Contact us at solepurposefootwear813@gmail.com</Text>
          <Text style={footerText}>© 2024 Soul Purpose Footwear. All Rights Reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default OrderConfirmationCustomerEmail

const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  color: "#ffffff",
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
}

const logoContainer = {
  textAlign: "center" as const,
  padding: "20px 0",
}

const h1 = {
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "#fff",
}

const h2 = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#fff",
}

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#d4d4d4",
}

const hr = {
  borderColor: "#333",
  margin: "20px 0",
}

const itemSection = {
  padding: "10px 0",
}

const itemImage = {
  borderRadius: "4px",
  border: "1px solid #333",
}

const itemTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 5px 0",
  color: "#fff",
}

const itemDescription = {
  fontSize: "14px",
  color: "#a1a1aa",
  margin: 0,
}

const itemPrice = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
}

const pricingSection = {
  padding: "10px 0",
}

const pricingText = {
  fontSize: "16px",
  color: "#a1a1aa",
}

const pricingValue = {
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right" as const,
  color: "#fff",
}

const pricingTextTotal = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
}

const pricingValueTotal = {
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "right" as const,
  color: "#fff",
}

const footerText = {
  fontSize: "12px",
  color: "#a1a1aa",
  lineHeight: "1.5",
}
