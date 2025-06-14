import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Soul Purpose Footwear",
  description: "Learn about our story, values, and craft philosophy behind Soul Purpose Footwear.",
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Our Story</h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Born from a passion for art and a love for sneakers, Soul Purpose Footwear bridges the gap between fashion
            and personal expression.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-neutral-900 mb-4">The Beginning</h2>
              <p className="text-neutral-600 leading-relaxed">
                Founded in 2020 by a collective of artists and sneaker enthusiasts, Soul Purpose Footwear emerged from a
                simple belief: that footwear should be more than just functional—it should be a canvas for creativity
                and self-expression.
              </p>
            </div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our studio workspace"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Custom painting process"
              width={600}
              height={400}
              className="rounded-lg shadow-lg lg:order-first"
            />
            <div>
              <h2 className="font-playfair text-3xl font-bold text-neutral-900 mb-4">Our Craft</h2>
              <p className="text-neutral-600 leading-relaxed">
                Each pair begins with premium base materials, carefully selected for durability and comfort. Our artists
                then apply layers of specialized paints and finishes, ensuring that every design not only looks stunning
                but maintains its vibrancy over time.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-neutral-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3">Authenticity</h3>
                <p className="text-neutral-600">
                  Every design tells a genuine story, reflecting the unique personality and vision of its wearer.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3">Quality</h3>
                <p className="text-neutral-600">
                  We use only the finest materials and time-tested techniques to ensure lasting beauty and comfort.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-3">Collaboration</h3>
                <p className="text-neutral-600">
                  We work closely with each client to bring their vision to life, creating truly personalized pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
