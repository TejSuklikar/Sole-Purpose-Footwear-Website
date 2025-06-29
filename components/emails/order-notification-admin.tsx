import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Row, Column } from "@react-email/components"
import * as React from "react"

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

export const OrderNotificationAdminEmail = ({
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
    <Preview>New Order Received from {customerEmail}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Order Received!</Heading>
        <Text style={text}>
          You've received a new order from <strong>{customerEmail}</strong>.
        </Text>
        {hasAttachment && (
          <Text style={text}>
            <strong>A payment proof file has been attached to this email.</strong>
          </Text>
        )}
        <Hr style={hr} />
        <Heading as="h2" style={h2}>
          Customer Details
        </Heading>
        <Text style={text}>
          <strong>Email:</strong> {customerEmail}
        </Text>
        {cartItems
          .filter((item) => item.type === "custom" && item.customDetails)
          .map((item, index) => (
            <React.Fragment key={item.id}>
              <Text style={text}>
                <strong>Name:</strong> {item.customDetails.firstName} {item.customDetails.lastName}
              </Text>
              <Text style={text}>
                <strong>Phone:</strong> {item.customDetails.phone}
              </Text>
            </React.Fragment>
          ))}
        <Hr style={hr} />
        <Heading as="h2" style={h2}>
          Order Details
        </Heading>
        {cartItems.map((item) => (
          <Section key={item.id} style={itemSection}>
            <Row>
              <Column>
                <Text style={itemTitle}>{item.name}</Text>
                <Text style={itemDescription}>Size: {item.size}</Text>
                <Text style={itemDescription}>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
              </Column>
            </Row>
            {item.type === "custom" && item.customDetails && (
              <Section style={customDetailsSection}>
                <Text style={customDetailsTitle}>Custom Design Details:</Text>
                <Text style={customDetailsText}>
                  <strong>Base Shoe:</strong> {item.customDetails.shoeModel}
                </Text>
                <Text style={customDetailsText}>
                  <strong>Description:</strong> {item.customDetails.designDescription}
                </Text>
                {item.customDetails.additionalNotes && (
                  <Text style={customDetailsText}>
                    <strong>Notes:</strong> {item.customDetails.additionalNotes}
                  </Text>
                )}
              </Section>
            )}
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
            <Column style={pricingValue}>{isBayArea ? "FREE (Bay Area)" : `$${shippingCost.toFixed(2)}`}</Column>
          </Row>
          <Hr style={hr} />
          <Row>
            <Column style={pricingTextTotal}>Total</Column>
            <Column style={pricingValueTotal}>${total.toFixed(2)}</Column>
          </Row>
        </Section>
        <Hr style={hr} />
        <Section style={{ textAlign: "center" }}>
          <Text style={footerText}>This is an automated notification. Please process this order.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default OrderNotificationAdminEmail

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #eee",
  borderRadius: "5px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
}

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0 10px",
  padding: "0 20px",
}

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 20px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const itemSection = {
  padding: "0 20px",
}

const itemTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
}

const itemDescription = {
  fontSize: "14px",
  color: "#555",
}

const customDetailsSection = {
  backgroundColor: "#f6f9fc",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "4px",
}

const customDetailsTitle = {
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 5px 0",
}

const customDetailsText = {
  fontSize: "14px",
  color: "#555",
  margin: "0 0 5px 0",
}

const pricingSection = {
  padding: "0 20px",
}

const pricingText = {
  fontSize: "16px",
  color: "#555",
}

const pricingValue = {
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right" as const,
  color: "#333",
}

const pricingTextTotal = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
}

const pricingValueTotal = {
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "right" as const,
  color: "#333",
}

const footerText = {
  fontSize: "12px",
  color: "#888",
  lineHeight: "1.5",
}
