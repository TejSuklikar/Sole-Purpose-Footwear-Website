import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import TestimonialsSection from "@/components/testimonials-section"
import { EventsStrip } from "@/components/events-strip"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedWork />
      <TestimonialsSection />
      <EventsStrip />
    </main>
  )
}
