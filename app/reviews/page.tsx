"use client"

import type React from "react"

import { useState } from "react"
import { Star, Calendar, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: string
  name: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
  orderType: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    name: "Marcus Johnson",
    rating: 5,
    title: "Absolutely incredible Palestinian flag AF1s!",
    content:
      "I ordered a custom pair with the Palestinian flag design and I am blown away by the quality and attention to detail. The colors are vibrant, the craftsmanship is top-notch, and they fit perfectly. The whole process was smooth and the team was super responsive to my questions. These shoes mean so much to me and my heritage. Will definitely be ordering more!",
    date: "2024-01-15",
    verified: true,
    helpful: 23,
    orderType: "Custom Design",
    images: ["/images/kuffiyeh-af1.png"],
  },
  {
    id: "2",
    name: "Sofia Rodriguez",
    rating: 5,
    title: "Perfect family Christmas gift!",
    content:
      "Ordered matching custom shoes for my whole family for Christmas. The team worked with us to create something special that represented our Mexican heritage. Everyone loved them and the quality is amazing. The customer service was exceptional - they kept us updated throughout the whole process.",
    date: "2024-01-10",
    verified: true,
    helpful: 18,
    orderType: "Family Set",
    images: ["/images/mexican-af1.png"],
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    rating: 5,
    title: "Best custom shoes I've ever owned",
    content:
      "The Jordanian flag design came out perfect. The attention to detail is incredible and you can tell these are made with love and care. Comfortable to wear and I get compliments everywhere I go. Worth every penny!",
    date: "2024-01-08",
    verified: true,
    helpful: 15,
    orderType: "Custom Design",
  },
  {
    id: "4",
    name: "Lisa Chen",
    rating: 4,
    title: "Great quality, fast shipping",
    content:
      "Really happy with my Chinese New Year themed shoes. The red and gold details are beautiful and the quality is solid. Only minor issue was the shipping took a bit longer than expected, but the final product made up for it.",
    date: "2024-01-05",
    verified: true,
    helpful: 12,
    orderType: "Holiday Special",
  },
  {
    id: "5",
    name: "David Thompson",
    rating: 5,
    title: "Exceeded all expectations",
    content:
      "I was hesitant to order custom shoes online, but SolePurpose completely exceeded my expectations. The geometric design I requested was executed flawlessly. The communication throughout the process was excellent and the final product is a work of art.",
    date: "2024-01-03",
    verified: true,
    helpful: 9,
    orderType: "Custom Design",
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    title: "",
    content: "",
    orderType: "Custom Design",
  })

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString().split("T")[0],
      verified: false,
      helpful: 0,
    }
    setReviews([review, ...reviews])
    setNewReview({ name: "", rating: 5, title: "", content: "", orderType: "Custom Design" })
    setShowReviewForm(false)
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">Customer Reviews</h1>
          <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            See what our customers are saying about their custom SolePurpose experience. Every review helps us continue
            to create shoes that truly matter.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <span className="text-5xl font-bold text-white">{averageRating.toFixed(1)}</span>
                <div>
                  {renderStars(Math.round(averageRating), "lg")}
                  <p className="text-neutral-300 mt-1">Based on {reviews.length} reviews</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-300 w-8">{rating} ★</span>
                  <div className="flex-1 bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(ratingCounts[index] / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-neutral-300 w-8">{ratingCounts[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-white text-black hover:bg-neutral-100"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <Card className="bg-neutral-900/50 border-neutral-800 mb-12">
            <CardHeader>
              <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderType" className="text-white">
                      Order Type
                    </Label>
                    <select
                      id="orderType"
                      value={newReview.orderType}
                      onChange={(e) => setNewReview({ ...newReview, orderType: e.target.value })}
                      className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option value="Custom Design">Custom Design</option>
                      <option value="Family Set">Family Set</option>
                      <option value="Holiday Special">Holiday Special</option>
                      <option value="Cultural Design">Cultural Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-white">Rating</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-white">
                    Review Title
                  </Label>
                  <Input
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="Sum up your experience..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-white">
                    Your Review
                  </Label>
                  <Textarea
                    id="content"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="bg-neutral-800 border-neutral-700 text-white min-h-[120px]"
                    placeholder="Tell us about your experience with SolePurpose..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-white text-black hover:bg-neutral-100">
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-neutral-700 text-white">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="bg-green-900 text-green-300">
                          Verified Purchase
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-neutral-600 text-neutral-300">
                        {review.orderType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      {renderStars(review.rating)}
                      <span className="text-sm text-neutral-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h5 className="font-semibold text-white mb-2">{review.title}</h5>
                    <p className="text-neutral-300 leading-relaxed mb-4">{review.content}</p>

                    {review.images && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt="Review image"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8">
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">Ready to Create Your Own Story?</h3>
            <p className="text-neutral-300 mb-6">
              Join hundreds of satisfied customers who've made their mark with SolePurpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-black hover:bg-neutral-100">
                <a href="/order">Start Custom Order</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <a href="/shoes">View Our Work</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
