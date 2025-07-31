import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"

interface OrderData {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    isBayArea: boolean
  }
  items: Array<{
    name: string
    size: string
    sizeCategory: string
    price: number
    customization?: string
  }>
  subtotal: number
  shipping: number
  total: number
  orderDate: string
}

export const OrderConfirmationCustomer = ({ orderData }: { orderData: OrderData }) => {
  return (
    <Html>
      <Head />
      <Preview>Your Sole Purpose Footwear order confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Order Confirmation</Heading>

          <Text style={text}>Hi {orderData.customer.firstName},</Text>

          <Text style={text}>
            Thank you for your order! We've received your request and will begin working on your custom shoes soon.
          </Text>

          <Section style={orderSection}>
            <Heading style={h2}>Order Details</Heading>

            {orderData.items.map((item, index) => (
              <div key={index} style={itemContainer}>
                <Text style={itemName}>{item.name}</Text>
                <Text style={itemDetails}>
                  Size: {item.size} ({item.sizeCategory}) - ${item.price}
                </Text>
                {item.customization && <Text style={itemDetails}>Custom: {item.customization}</Text>}
              </div>
            ))}

            <Hr style={hr} />

            <div style={totalsContainer}>
              <Text style={totalsText}>Subtotal: ${orderData.subtotal}</Text>
              <Text style={totalsText}>Shipping: ${orderData.shipping}</Text>
              <Text style={totalText}>Total: ${orderData.total}</Text>
            </div>
          </Section>

          <Section style={shippingSection}>
            <Heading style={h2}>Shipping Address</Heading>
            <Text style={text}>
              {orderData.customer.firstName} {orderData.customer.lastName}
              <br />
              {orderData.customer.address}
              <br />
              {orderData.customer.city}, {orderData.customer.state} {orderData.customer.zipCode}
            </Text>
          </Section>

          <Section style={paymentSection}>
            <Heading style={h2}>Payment Instructions</Heading>
            <Text style={text}>
              <strong>Zelle (Preferred):</strong> +1 (415) 939-8270
            </Text>
            <Text style={text}>
              <strong>Venmo:</strong> @solepurposefootwear
            </Text>
            <Text style={text}>
              Amount: <strong>${orderData.total}</strong>
            </Text>
          </Section>

          <Text style={text}>
            We'll keep you updated on your order progress. If you have any questions, please contact us at
            solepurposefootwear813@gmail.com.
          </Text>

          <Text style={footer}>Thank you for choosing Sole Purpose Footwear!</Text>
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
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
}

const orderSection = {
  padding: "20px",
  border: "1px solid #eee",
  borderRadius: "5px",
  margin: "20px 0",
}

const itemContainer = {
  marginBottom: "15px",
}

const itemName = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 5px 0",
}

const itemDetails = {
  color: "#666",
  fontSize: "14px",
  margin: "0 0 5px 0",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const totalsContainer = {
  textAlign: "right" as const,
}

const totalsText = {
  color: "#333",
  fontSize: "14px",
  margin: "5px 0",
}

const totalText = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px 0 0 0",
}

const shippingSection = {
  margin: "20px 0",
}

const paymentSection = {
  padding: "20px",
  backgroundColor: "#f8f9fa",
  border: "1px solid #eee",
  borderRadius: "5px",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "40px 0 0 0",
}
