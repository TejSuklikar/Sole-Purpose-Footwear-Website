"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { ShoppingBag } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const { state, dispatch } = useCart()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shoes", href: "/shoes" },
    { name: "Custom Order", href: "/order" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">SP</span>
            </div>
            <span className="font-playfair text-xl font-semibold text-white">Sole Purpose</span>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    pathname === item.href ? "text-white border-b-2 border-white" : "text-neutral-300 hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

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
          </div>
        </div>
      </div>
    </header>
  )
}
