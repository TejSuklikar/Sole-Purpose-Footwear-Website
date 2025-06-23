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
          <p className="text-xl text-neutral-300 leading-relaxed">
            Custom footwear designed to speak your truth. At SolePurpose, we craft one-of-a-kind kicks that blend creativity, comfort, and culture — made for movement, made with meaning.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-white mb-4">The Beginning</h2>
              <p className="text-neutral-300 leading-relaxed">
                Founded in 2024 by a collective of artists and sneaker enthusiasts, Sole Purpose Footwear was born from
                a love of design and the belief that every step we take should say something. Each pair of custom shoes
                is a wearable work of art — bold, expressive, and rooted in purpose. This isn't just fashion. It's
                movement with meaning.
              </p>
              <p className="text-neutral-300 leading-relaxed mt-4">
                What started as custom designs for friends and family has grown into a movement celebrating cultural
                heritage, personal stories, and artistic excellence on every pair.
              </p>
            </div>
            <Image
              src="/images/artist-at-work.jpg"
              alt="Artist wearing custom Palestinian flag Air Force 1s, showcasing the craftsmanship and street style"
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
