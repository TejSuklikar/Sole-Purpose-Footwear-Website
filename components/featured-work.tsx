import Image from "next/image"

export function FeaturedWork() {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Cultural Stories on Canvas
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Every design begins with a story rooted in culture and identity. From traditional Kuffiyeh patterns to
                national flags, our artists work closely with each client to honor heritage while creating contemporary
                wearable art.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Using premium materials and time-tested hand-painting techniques, we ensure that every custom piece not
                only celebrates your story but stands the test of time with vibrant, lasting colors.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="w-12 h-0.5 bg-neutral-900"></div>
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                Handcrafted Excellence
              </span>
            </div>
          </div>

          {/* Single Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
              <Image
                src="/images/cultural-canvas-studio.png"
                alt="Custom painted Air Force 1s with Palestinian flag and Kuffiyeh patterns in studio setting"
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">500+</div>
            <div className="text-sm text-neutral-600 uppercase tracking-wider">Custom Designs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">25+</div>
            <div className="text-sm text-neutral-600 uppercase tracking-wider">Countries Represented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">100%</div>
            <div className="text-sm text-neutral-600 uppercase tracking-wider">Hand-Painted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">San Francisco</div>
            <div className="text-sm text-neutral-600 uppercase tracking-wider">Based & Made</div>
          </div>
        </div>
      </div>
    </section>
  )
}
