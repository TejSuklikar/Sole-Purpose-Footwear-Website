"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "./cart-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useCart()
  // SAFELY calculate total quantity; fallback to 0 if state or items are undefined
  const itemCount = state?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold text-white">SolePurpose</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/shoes" className="text-neutral-300 hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/reviews" className="text-neutral-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href="/order" className="text-neutral-300 hover:text-white transition-colors">
              Custom Order
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shoes"
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/reviews"
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/order"
                className="text-neutral-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Order
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
