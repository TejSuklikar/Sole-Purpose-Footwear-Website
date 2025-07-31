import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">Our Story</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
                At SolePurpose, we believe what you wear should speak louder than words. What started as one
                hand-painted gift for a friend turned into a movement rooted in culture, not in capital. We specialize
                in custom footwear that's all about you: your culture, your passion, your story. Each design is made
                with care, turning where you come from into something you can step into.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Make your mark. Wear your purpose.</h2>
            </div>
          </div>
        </div>
      </section>

      {/* The Beginning Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">The Beginning</h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  SolePurpose started a few years back with one simple gift: a custom pair of shoes made for a close
                  friend. There was no business plan, just a real connection and a design that meant something. People
                  saw it, started asking for their own, and that one pair quickly sparked something bigger.
                </p>
                <p>
                  What began as a personal gesture grew into a movement not just because of the shoes themselves, but
                  because of what they represent. At
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/artist-lifestyle-shot.jpeg"
                alt="Artist working on custom shoes"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Craft Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/christmas-family-set.jpg"
                alt="Custom painted shoes under Christmas tree"
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">Our Craft</h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  Each pair begins with premium base materials, carefully selected for durability and comfort. Our
                  artists then apply layers of specialized paints and finishes, ensuring that every design not only
                  looks stunning but maintains its vibrancy over time.
                </p>
                <p>
                  From individual pairs to family sets, we create custom designs that bring people together and
                  celebrate shared heritage. Every shoe tells a story, and every story matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Authenticity</h3>
              <p className="text-neutral-300">
                Every design tells a genuine story, reflecting the unique personality and cultural heritage of its
                wearer.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Quality</h3>
              <p className="text-neutral-300">
                We use only the finest materials and time-tested techniques to ensure lasting beauty and comfort.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <p className="text-neutral-300">
                We work closely with each client to bring their vision to life, creating truly personalized pieces that
                connect families and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-neutral-900 rounded-2xl p-8 md:p-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Story?</h2>
            <p className="text-neutral-300 mb-8 text-lg">
              Whether it's a single pair or a family set, we're here to help you create something truly special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200">
                <Link href="/order">Start Custom Order</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="/shoes">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-12 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Policies</h2>

          <div className="space-y-6 text-sm text-neutral-300">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">All Sales Final</h3>
              <p>
                Due to the custom-painted nature of our shoes, all purchases are final. We do not offer refunds,
                returns, or exchanges once an order is placed.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-2">Damaged or Incorrect Items</h3>
              <p>
                If your order arrives damaged, defective, or incorrect, please email us within 5 days of delivery with
                clear photos. We will gladly arrange a replacement only—not a refund.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-2">Review Before Ordering</h3>
              <p>
                Please double-check size, design, and color details before completing your purchase. Custom designs are
                irreversible—once created, there's no resale opportunity.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-2">Contact Us</h3>
              <p>
                Email us at{" "}
                <a
                  href="mailto:solepurposefootwear813@gmail.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  solepurposefootwear813@gmail.com
                </a>{" "}
                with any questions / concerns. We aim to respond within 3 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
