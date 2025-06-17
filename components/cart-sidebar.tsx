"use client"

import { useState } from "react"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus, ShoppingBag, Send } from "lucide-react"
import Image from "next/image"

export function CartSidebar() {
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store order in localStorage for the checkout page
    const orderData = {
      items: state.items,
      total,
      timestamp: new Date().toISOString(),
      orderId: `SP-${Date.now()}`,
    }

    localStorage.setItem("pendingOrder", JSON.stringify(orderData))

    // Redirect to checkout page
    window.location.href = "/checkout/payment"

    setIsProcessing(false)
  }

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: "TOGGLE_CART" })} />

      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b">
            <h2 className="text-base sm:text-lg font-semibold text-black">Shopping Cart</h2>
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-neutral-400 mb-4" />
                <p className="text-neutral-600 text-sm sm:text-base">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center space-x-3 sm:space-x-4 border-b pb-3 sm:pb-4"
                  >
                    <Image
                      src={item.image || "/placeholder.svg?height=80&width=80&text=Product"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      crossOrigin="anonymous"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base text-black truncate">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-black">Size: {item.size}</p>
                      <p className="font-semibold text-sm sm:text-base text-black">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-800 text-black hover:bg-neutral-100 h-7 w-7 sm:h-8 sm:w-8 p-0"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: `${item.id}-${item.size}`, quantity: Math.max(0, item.quantity - 1) },
                          })
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 sm:w-8 text-center text-black font-medium text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-800 text-black hover:bg-neutral-100 h-7 w-7 sm:h-8 sm:w-8 p-0"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: `${item.id}-${item.size}`, quantity: item.quantity + 1 },
                          })
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t p-3 sm:p-4">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-semibold text-black">Total: ${total}</span>
              </div>
              <Button
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
