"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { SPLogo } from "@/components/sp-logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Always fall back to an empty array / no-op function
  const { items = [], toggleCart = () => {} } = useCart()
  const { user, logout } = useAuth()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-neutral-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <SPLogo size="md" />
            <div>
              <h1 className="text-xl font-bold font-playfair">Sole Purpose Footwear</h1>
              <p className="text-xs text-neutral-400">Custom Sneaker Artistry</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <Link href="/shoes" className="hover:text-red-400 transition-colors">
              Shoes
            </Link>
            <Link href="/order" className="hover:text-red-400 transition-colors">
              Custom Order
            </Link>
            <Link href="/about" className="hover:text-red-400 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="text-sm text-neutral-400">Guest Mode</div>
            )}
            <Button onClick={toggleCart} variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-800 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-red-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shoes" className="hover:text-red-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Shoes
              </Link>
              <Link href="/order" className="hover:text-red-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Custom Order
              </Link>
              <Link href="/about" className="hover:text-red-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              <div className="border-t border-neutral-800 pt-4 space-y-4">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                        >
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="text-sm text-neutral-400">Guest Mode</div>
                )}
                <Button
                  onClick={() => {
                    toggleCart()
                    setIsMenuOpen(false)
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {itemCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
