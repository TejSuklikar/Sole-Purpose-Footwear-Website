"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSidebar() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-neutral-400 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Your cart is empty</h3>
          <p className="text-neutral-600 mb-4">Add some shoes to get started!</p>
          <Link href="/shoes">
            <Button>Browse Shoes</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleProceedToPayment = () => {
    // Create order data with mixed items
    const orderData = {
      items: items,
      total: total,
      timestamp: new Date().toISOString(),
      orderId: `SP-MIXED-${Date.now()}`,
      hasCustomItems: items.some((item) => item.type === "custom"),
      hasRegularItems: items.some((item) => item.type !== "custom"),
    }

    // Store in localStorage for checkout
    localStorage.setItem("pendingOrder", JSON.stringify(orderData))

    // Redirect to payment
    window.location.href = "/checkout/payment"
  }

  const regularItems = items.filter((item) => item.type !== "custom")
  const customItems = items.filter((item) => item.type === "custom")

  return (
    <div className="flex-1 flex flex-col">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Regular Items */}
          {regularItems.length > 0 && (
            <div>
              <h4 className="font-semibold text-neutral-800 mb-3">Regular Orders</h4>
              {regularItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center space-x-3 bg-neutral-50 p-3 rounded-lg mb-3"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=60&width=60&text=Product"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 truncate">{item.name}</h4>
                    <p className="text-sm text-neutral-600">Size: {item.size}</p>
                    <p className="text-sm font-medium text-neutral-900">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.size, Math.max(0, item.quantity - 1))}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id, item.size)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Items */}
          {customItems.length > 0 && (
            <div>
              <h4 className="font-semibold text-neutral-800 mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Custom Orders
              </h4>
              {customItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-15 h-15 bg-blue-100 rounded-md flex items-center justify-center">
                        <Palette className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-blue-900">{item.name}</h4>
                      <p className="text-sm text-blue-700">Size: {item.size}</p>
                      <p className="text-sm font-medium text-blue-900">${item.price}</p>
                      {item.customDetails && (
                        <p className="text-xs text-blue-600 mt-1">
                          {item.customDetails.designDescription.substring(0, 40)}...
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-900">Qty: {item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.size)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Footer */}
      <div className="border-t p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
          <Button variant="outline" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        {customItems.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              ✨ Custom orders include design consultation and 2-4 week creation time
            </p>
          </div>
        )}

        <Button onClick={handleProceedToPayment} className="w-full bg-black text-white hover:bg-neutral-800">
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}

export default CartSidebar
