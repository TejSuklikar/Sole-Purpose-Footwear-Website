import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { EventsStrip } from "@/components/events-strip"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedWork />
      <EventsStrip />
      <TestimonialsSection />
    </div>
  )
}
