"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  orderType: string
  rating: number
  comment: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const dummyTestimonials: Testimonial[] = [
      {
        id: 1,
        name: "Aisha K.",
        orderType: "Custom Design",
        rating: 5,
        comment:
          "Absolutely stunning work! My custom shoes are a work of art and exactly what I envisioned. The attention to detail is incredible.",
      },
      {
        id: 2,
        name: "Omar S.",
        orderType: "Family Set",
        rating: 5,
        comment:
          "We ordered a family set for Christmas and everyone loved them! Such a unique and personal gift. Highly recommend!",
      },
      {
        id: 3,
        name: "Layla M.",
        orderType: "Holiday Special",
        rating: 4,
        comment:
          "Great quality and beautiful design. The colors are so vibrant and the shoes are very comfortable. Will definitely order again!",
      },
    ]
    setTestimonials(dummyTestimonials)
  }, [])

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Real stories from real customers who've made their mark with SolePurpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 relative">
              <Quote className="w-8 h-8 text-neutral-600 mb-4" />
              {renderStars(testimonial.rating)}
              <p className="text-neutral-300 leading-relaxed mb-6">"{testimonial.comment}"</p>
              <div className="mt-auto">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-neutral-400">{testimonial.orderType}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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
