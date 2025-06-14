import { HeroSection } from "@/components/hero-section"
import { EventsStrip } from "@/components/events-strip"
import { FeaturedWork } from "@/components/featured-work"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <EventsStrip />
      <FeaturedWork />
    </div>
  )
}
