"use client"

import type React from "react"
import { useState } from "react"
import { MapPin } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  orderType: string
  details: string
  bayArea: boolean
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    orderType: "pickup",
    details: "",
    bayArea: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here (e.g., send data to a server)
    console.log(formData)
    alert("Form submitted! (Check console for data)")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="orderType" className="block text-gray-700 text-sm font-bold mb-2">
            Order Type:
          </label>
          <select
            id="orderType"
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <div>
          <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">
            Order Details:
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 border-2 border-green-200 bg-green-50 rounded-lg">
            <div className="relative">
              <input
                type="checkbox"
                id="bayArea"
                checked={formData.bayArea}
                onChange={(e) => setFormData({ ...formData, bayArea: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                  formData.bayArea ? "bg-green-600 border-green-600" : "bg-white border-gray-300 hover:border-green-400"
                }`}
                onClick={() => setFormData({ ...formData, bayArea: !formData.bayArea })}
              >
                {formData.bayArea && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <label htmlFor="bayArea" className="flex items-center space-x-2 cursor-pointer">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Yes, I'm in the Bay Area (Free pickup/dropoff)</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm
export { OrderForm }
