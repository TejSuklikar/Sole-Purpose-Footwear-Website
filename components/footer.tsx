"use client"

import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold">Sole Purpose Footwear</h3>
            <p className="text-neutral-400 leading-relaxed">
              Custom footwear designed to speak your truth. We craft one-of-a-kind kicks that blend creativity, comfort,
              and culture — made for movement, made with meaning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/shoes" className="text-neutral-400 hover:text-white transition-colors">
                Browse Shoes
              </Link>
              <Link href="/order" className="text-neutral-400 hover:text-white transition-colors">
                Custom Order
              </Link>
              <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/reviews" className="text-neutral-400 hover:text-white transition-colors">
                Reviews
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="flex space-x-4">
              <a
                href="mailto:solepurposefootwear813@gmail.com"
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/solepurposefootwear/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-neutral-400">© 2025 Sole Purpose Footwear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
export { Footer }
