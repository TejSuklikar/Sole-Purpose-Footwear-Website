"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Testimonial {
  id: string
  name: string
  rating: number
  content: string
  orderType: string
}

const featuredTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marcus Johnson",
    rating: 5,
    content:
      "Absolutely incredible Palestinian flag AF1s! The quality and attention to detail blew me away. These shoes mean so much to me and my heritage.",
    orderType: "Custom Design",
  },
  {
    id: "2",
    name: "Sofia Rodriguez",
    rating: 5,
    content:
      "Perfect family Christmas gift! The team worked with us to create something special representing our Mexican heritage. Everyone loved them!",
    orderType: "Family Set",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    rating: 5,
    content:
      "Best custom shoes I've ever owned. The Jordanian flag design came out perfect and I get compliments everywhere I go.",
    orderType: "Custom Design",
  },
]

export default function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Real stories from real customers who've made their mark with SolePurpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-neutral-900/50 border-neutral-800 relative">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-neutral-600 mb-4" />
                <p className="text-neutral-300 leading-relaxed mb-6">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-neutral-700 text-white text-sm">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <div className="flex items-center gap-2">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-neutral-400">• {testimonial.orderType}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/reviews"
            className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  )
}
