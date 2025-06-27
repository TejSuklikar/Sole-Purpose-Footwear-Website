"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Send, CheckCircle } from "lucide-react"

const existingReviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    title: "Absolutely Amazing!",
    content:
      "The custom Palestinian design exceeded my expectations. The attention to detail is incredible and the quality is top-notch. I get compliments everywhere I go!",
    orderType: "Custom Design",
    date: "2024-12-15",
  },
  {
    id: 2,
    name: "Marcus J.",
    rating: 5,
    title: "Perfect Fit and Style",
    content:
      "Drew created exactly what I envisioned. The Mexican eagle design is stunning and the craftsmanship is outstanding. Will definitely order again!",
    orderType: "Custom Design",
    date: "2024-12-10",
  },
  {
    id: 3,
    name: "Aisha K.",
    rating: 5,
    title: "Cultural Pride in Every Step",
    content:
      "The Lebanese flag design is beautiful and meaningful. The shoes are comfortable and well-made. So happy to support a business that celebrates culture!",
    orderType: "Custom Design",
    date: "2024-12-05",
  },
  {
    id: 4,
    name: "David L.",
    rating: 5,
    title: "Exceptional Service",
    content:
      "From design consultation to delivery, the entire process was smooth. The final product is exactly what we discussed. Highly recommend!",
    orderType: "Custom Design",
    date: "2024-11-28",
  },
  {
    id: 5,
    name: "Maria R.",
    rating: 5,
    title: "Worth Every Penny",
    content:
      "The quality and uniqueness of these shoes make them worth the investment. The Filipino-inspired design is gorgeous and the fit is perfect.",
    orderType: "Custom Design",
    date: "2024-11-20",
  },
  {
    id: 6,
    name: "Ahmed H.",
    rating: 5,
    title: "Incredible Artistry",
    content:
      "The Kuffiyeh pattern is beautifully executed. These aren't just shoes, they're wearable art. Thank you for bringing my vision to life!",
    orderType: "Custom Design",
    date: "2024-11-15",
  },
]

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    content: "",
    orderType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("_subject", `New Review from ${formData.name} - Sole Purpose Footwear`)
      submitData.append("_template", "box")
      submitData.append("_captcha", "false")

      submitData.append("Customer", formData.name)
      submitData.append("Email", formData.email)
      submitData.append("Rating", `${formData.rating}/5 stars`)
      submitData.append("Review_Title", formData.title)
      submitData.append("Review_Content", formData.content)
      submitData.append("Order_Type", formData.orderType)
      submitData.append("Date", new Date().toLocaleDateString())

      const response = await fetch("https://formsubmit.co/solepurposefootwear813@gmail.com", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          rating: 5,
          title: "",
          content: "",
          orderType: "",
        })
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("There was an error submitting your review. Please try again or email us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-playfair text-2xl font-bold mb-4">Thank You for Your Review!</h1>
              <p className="text-neutral-600 mb-6">
                Your review has been submitted and will help other customers learn about our work. We appreciate your
                feedback!
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="mr-4">
                Write Another Review
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-neutral-900 mb-4">Customer Reviews</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            See what our customers are saying about their custom Sole Purpose Footwear experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-playfair text-xl">Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="orderType">Order Type</Label>
                    <select
                      id="orderType"
                      name="orderType"
                      value={formData.orderType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select order type</option>
                      <option value="Custom Design">Custom Design</option>
                      <option value="Ready-Made Shoe">Ready-Made Shoe</option>
                      <option value="Consultation">Design Consultation</option>
                    </select>
                  </div>

                  <div>
                    <Label>Rating</Label>
                    {renderStars(formData.rating, true, (rating) => setFormData((prev) => ({ ...prev, rating })))}
                  </div>

                  <div>
                    <Label htmlFor="title">Review Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label htmlFor="content">Your Review</Label>
                    <Textarea
                      id="content"
                      name="content"
                      rows={4}
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Existing Reviews */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {existingReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{review.title}</h3>
                        <p className="text-neutral-600">{review.name}</p>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-sm text-neutral-500 mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-neutral-700 mb-3">{review.content}</p>
                    <div className="inline-block bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                      {review.orderType}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
