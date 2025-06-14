"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const shoeModels = [
  "Air Force 1 Style",
  "High-Top Canvas",
  "Low-Top Leather",
  "Slip-On Style",
  "Athletic Runner",
  "Custom Base (Specify in description)",
]

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-playfair text-2xl font-bold mb-4">Order Submitted Successfully!</h2>
          <p className="text-neutral-600 mb-6">
            Thank you for your custom order. We'll be in touch within 24 hours to discuss your design and provide a
            timeline for completion.
          </p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <Label htmlFor="shoeModel">Shoe Model</Label>
            <Select name="shoeModel" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a base model" />
              </SelectTrigger>
              <SelectContent>
                {shoeModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Shoe Size</Label>
            <Select name="size" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your size" />
              </SelectTrigger>
              <SelectContent>
                {["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"].map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="designDescription">Design Description</Label>
            <Textarea
              id="designDescription"
              name="designDescription"
              placeholder="Describe your vision in detail. Include colors, themes, inspiration, or any specific elements you'd like incorporated..."
              rows={6}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Full shipping address including postal code"
              rows={3}
              required
            />
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• We'll review your design request within 24 hours</li>
              <li>• Our team will contact you to discuss details and pricing</li>
              <li>• Once approved, creation takes 2-4 weeks</li>
              <li>• We'll send progress photos throughout the process</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Order..." : "Submit Custom Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
