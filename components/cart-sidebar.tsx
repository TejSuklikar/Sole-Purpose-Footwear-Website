"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, Palette, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

function CartSidebar({ onClose }: { onClose?: () => void }) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()

  const closeSidebar = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleProceedToPayment = () => {
    // Close the sidebar before navigating
    if (onClose) {
      onClose()
    }
    router.push("/checkout/payment")
  }

  const regularItems = items.filter((i) => i.type !== "custom")
  const customItems = items.filter((i) => i.type === "custom")

  return (
    <div className="flex-1 flex flex-col">
      {/* Always-visible close (X) button */}
      <div className="flex justify-end p-4 border-b">
        <button
          onClick={closeSidebar}
          className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Close cart"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Empty cart state */}
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <ShoppingBag className="h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Your cart is empty</h3>
          <p className="text-neutral-600 mb-4">Add some shoes to get started!</p>
          <Link href="/shoes">
            <Button>Browse Shoes</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Regular items */}
            {regularItems.length > 0 && (
              <section>
                <h4 className="font-semibold text-neutral-800 mb-3">Regular Orders</h4>
                {regularItems.map((item) => (
                  <article
                    key={`${item.id}-${item.size}`}
                    className="flex items-center space-x-3 bg-neutral-50 p-3 rounded-lg mb-3"
                  >
                    <Image
                      src={item.image || "/placeholder.svg?height=60&width=60&query=shoe"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                      crossOrigin="anonymous"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-neutral-900 truncate">{item.name}</h5>
                      <p className="text-sm text-neutral-600">Size: {item.size}</p>
                      <p className="text-sm font-medium text-neutral-900">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.size, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {/* Custom items */}
            {customItems.length > 0 && (
              <section>
                <h4 className="font-semibold text-neutral-800 mb-3 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Orders
                </h4>
                {customItems.map((item) => (
                  <article
                    key={`${item.id}-${item.size}`}
                    className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-15 h-15 bg-blue-100 rounded-md flex items-center justify-center">
                        <Palette className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-blue-900">{item.name}</h5>
                        <p className="text-sm text-blue-700">Size: {item.size}</p>
                        <p className="text-sm font-medium text-blue-900">${item.price}</p>
                        {item.customDetails && (
                          <p className="text-xs text-blue-600 mt-1">
                            {item.customDetails.designDescription?.slice(0, 40) ?? "Custom design request"}…
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-900">Qty: {item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </div>

          {/* Footer */}
          <footer className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {customItems.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  ✨ Custom orders include design consultation and 2 – 4 week creation time
                </p>
              </div>
            )}

            <Button className="w-full bg-black text-white hover:bg-neutral-800" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </footer>
        </>
      )}
    </div>
  )
}

export { CartSidebar }
export default CartSidebar
