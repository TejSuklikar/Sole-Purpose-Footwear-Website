"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { Mail, Shield, AlertCircle, Users } from "lucide-react"

export function LoginPage() {
  const [adminEmail, setAdminEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { loginAsAdmin, loginAsGuest } = useAuth()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = loginAsAdmin(adminEmail)
    if (!success) {
      setError("Invalid admin email. Please check your credentials.")
    }

    setLoading(false)
  }

  const handleGuestLogin = () => {
    loginAsGuest()
  }

  const isAdminEmail = (email: string) => {
    return email === "solepurposefootwear813@gmail.com" || email === "anitej@suklikar.org"
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold">SP</span>
            </div>
            <span className="font-playfair text-2xl font-semibold text-white">Sole Purpose</span>
          </div>
          <p className="text-neutral-400">Choose how you'd like to access the site</p>
        </div>

        <div className="space-y-4">
          {/* Admin Login Card */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Shield className="mr-2 h-5 w-5 text-yellow-500" />
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label htmlFor="adminEmail" className="text-white">
                    Admin Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="Enter admin email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                    {adminEmail && isAdminEmail(adminEmail) && (
                      <div className="absolute right-3 top-3">
                        <Shield className="h-4 w-4 text-yellow-500" title="Valid Admin Email" />
                      </div>
                    )}
                  </div>
                  {adminEmail && isAdminEmail(adminEmail) && (
                    <p className="text-yellow-500 text-xs mt-1 flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Valid admin email detected
                    </p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || !adminEmail}
                  className="w-full bg-yellow-600 text-black hover:bg-yellow-500"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Login as Admin
                    </>
                  )}
                </Button>
              </form>

              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-yellow-500" />
                  <span className="text-white text-sm font-medium">Admin Features</span>
                </div>
                <ul className="text-neutral-400 text-xs space-y-1">
                  <li>• Manage shoe inventory and sizes</li>
                  <li>• Add/edit/delete shoes</li>
                  <li>• Control featured items</li>
                  <li>• Update size availability</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Guest Access Card */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Guest Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-400 text-sm text-center">
                Browse our collection, place orders, and shop without creating an account
              </p>

              <Button onClick={handleGuestLogin} className="w-full bg-white text-black hover:bg-neutral-100">
                <Users className="mr-2 h-4 w-4" />
                Continue as Guest
              </Button>

              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-white text-sm font-medium">Guest Features</span>
                </div>
                <ul className="text-neutral-400 text-xs space-y-1">
                  <li>• Browse all shoes and designs</li>
                  <li>• Add items to cart</li>
                  <li>• Place custom orders</li>
                  <li>• Filter by size and price</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
