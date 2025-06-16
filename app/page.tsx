import { HeroSection } from "@/components/hero-section"
import { EventsStrip } from "@/components/events-strip"
import { FeaturedWork } from "@/components/featured-work"
import { ImageSlideshow } from "@/components/image-slideshow"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <EventsStrip />
      <ImageSlideshow />
      <FeaturedWork />
    </div>
  )
}
