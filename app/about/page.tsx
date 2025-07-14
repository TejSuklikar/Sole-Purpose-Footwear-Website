import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Sole Purpose Footwear",
  description: "Learn about our story, values, and craft philosophy behind Sole Purpose Footwear.",
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h1>

          {/* Each paragraph is now completely closed before the next starts */}
          <p className="text-xl text-neutral-300 leading-relaxed">
            At SolePurpose, we believe what you wear should speak louder than words. What started as one hand-painted gift for a friend turned into a movement rooted in culture, not in capital. We specialize in custom footwear that’s all about you your culture, your passion, your story. Each design is made with care, turning where you come from into something you can step into.
          </p>

          <p className="text-xl text-white font-bold mt-6">Make your mark. Wear your purpose.</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-white mb-4">The Beginning</h2>
              <p className="text-neutral-300 leading-relaxed">
                SolePurpose started a few years back with one simple gift: a custom pair of shoes made for a close
                friend. There was no business plan, just a real connection and a design that meant something. People saw
                it, started asking for their own, and that one pair quickly sparked something bigger.
              </p>
              <p className="text-neutral-300 leading-relaxed mt-4">
                What began as a personal gesture grew into a movement not just because of the shoes themselves, but
                because of what they represent. At SolePurpose, it's never been about pumping out products. It's about
                building something meaningful with our customers, together. Our artists don't just design, they
                collaborate. Every pair is the result of genuine conversation, genuine inspiration, and genuine purpose.
              </p>
              <p className="text-neutral-300 leading-relaxed mt-4">
                We take pride in making the process personal. From the first idea to the final details, we work side by
                side with each customer to bring their vision to life. Whether it's your culture, your story, or your
                message, we're here to help you express it, your way.
              </p>
            </div>
            <Image
              src="/images/artist-lifestyle-shot.jpeg"
              alt="Artist wearing custom Air Force 1s in urban street setting, showcasing the lifestyle and street culture behind Sole Purpose"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              crossOrigin="anonymous"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <Image
              src="/images/christmas-family-set.jpg"
              alt="Family set of custom Palestinian flag Air Force 1s under Christmas tree, showing multiple sizes and holiday spirit"
              width={600}
              height={400}
              className="rounded-lg shadow-lg lg:order-first"
              crossOrigin="anonymous"
            />
            <div>
              <h2 className="font-playfair text-3xl font-bold text-white mb-4">Our Craft</h2>
              <p className="text-neutral-300 leading-relaxed">
                Each pair begins with premium base materials, carefully selected for durability and comfort. Our artists
                then apply layers of specialized paints and finishes, ensuring that every design not only looks stunning
                but maintains its vibrancy over time.
              </p>
              <p className="text-neutral-300 leading-relaxed mt-4">
                From individual pairs to family sets, we create custom designs that bring people together and celebrate
                shared heritage. Every shoe tells a story, and every story matters.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-white mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3 text-white">Authenticity</h3>
                <p className="text-neutral-300">
                  Every design tells a genuine story, reflecting the unique personality and cultural heritage of its
                  wearer.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3 text-white">Quality</h3>
                <p className="text-neutral-300">
                  We use only the finest materials and time-tested techniques to ensure lasting beauty and comfort.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3 text-white">Community</h3>
                <p className="text-neutral-300">
                  We work closely with each client to bring their vision to life, creating truly personalized pieces
                  that connect families and communities.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 text-center">
            <h2 className="font-playfair text-2xl font-bold text-white mb-4">Ready to Start Your Story?</h2>
            <p className="text-neutral-300 mb-6">
              Whether it's a single pair or a family set, we're here to help you create something truly special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/order"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-neutral-100 transition-colors"
              >
                Start Custom Order
              </a>
              <a
                href="/shoes"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
