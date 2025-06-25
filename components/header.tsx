"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { useAuth } from "./auth-provider"
import { ShoppingBag, LogOut, Shield, Users, Menu, X } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  const pathname = usePathname()
  const { state, dispatch } = useCart()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shoes", href: "/shoes" },
    { name: "Custom Order", href: "/order" },
  ]

  if (user?.isAdmin) {
    navigation.push({ name: "Admin", href: "/admin" })
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">SP</span>
              </div>
              <span className="font-playfair text-xl font-semibold text-white">Sole Purpose</span>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4 lg:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs lg:text-sm font-medium transition-colors duration-200 px-2 py-1",
                      pathname === item.href
                        ? "text-white border-b-2 border-white"
                        : "text-neutral-300 hover:text-white",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-2">
                {/* Cart Button */}
                <button
                  onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  className="relative p-2 text-neutral-300 hover:text-white transition-colors"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {state.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>

                {/* User Info & Logout */}
                {user && (
                  <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
                    <div className="flex items-center space-x-1">
                      {user.isAdmin ? (
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                      ) : (
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      )}
                      <span className="text-neutral-300 text-xs sm:text-sm hidden sm:block">
                        {user.isAdmin ? "Admin" : "Guest"}
                      </span>
                    </div>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      size="sm"
                      className="text-neutral-300 hover:text-white p-1 sm:p-2"
                    >
                      <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu} />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-neutral-950 border-r border-neutral-800 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">SP</span>
                  </div>
                  <span className="font-playfair text-lg font-semibold text-white">Sole Purpose</span>
                </Link>
                <button onClick={closeMobileMenu} className="p-2 text-neutral-300 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
                        pathname === item.href
                          ? "bg-white text-black"
                          : "text-neutral-300 hover:text-white hover:bg-neutral-800",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* User Info (Mobile) */}
              {user && (
                <div className="px-4 py-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {user.isAdmin ? (
                        <Shield className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Users className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-neutral-300 text-sm">{user.isAdmin ? "Admin Mode" : "Guest User"}</span>
                    </div>
                    <Button
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-neutral-300 hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
