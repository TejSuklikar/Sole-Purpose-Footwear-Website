import type React from "react"
import Link from "next/link"
import { useShoppingCart } from "use-shopping-cart"

const Header: React.FC = () => {
  const { cartCount, formattedTotalPrice, items } = useShoppingCart()

  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          My Store
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-800">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-gray-800 flex items-center">
                Cart ({itemCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
