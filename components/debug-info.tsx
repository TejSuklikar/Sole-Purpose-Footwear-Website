"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { clearAllCaches } from "@/lib/cache-buster"

export function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [debugData, setDebugData] = useState<any>({})
  const { user } = useAuth()

  useEffect(() => {
    if (isVisible) {
      const data = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        currentUser: user,
        localStorage: {
          shoes: localStorage.getItem("sp_shoes_global") ? "Present" : "Missing",
          events: localStorage.getItem("sp_events_global") ? "Present" : "Missing",
          user: localStorage.getItem("sp_current_user") ? "Present" : "Missing",
        },
        url: window.location.href,
        referrer: document.referrer,
      }
      setDebugData(data)
    }
  }, [isVisible, user])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-red-500 text-white border-red-500 hover:bg-red-600"
        >
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Debug Information
            <Button onClick={() => setIsVisible(false)} size="sm" variant="outline">
              Close
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Current Status</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">{JSON.stringify(debugData, null, 2)}</pre>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => {
                clearAllCaches()
                window.location.reload()
              }}
              size="sm"
              className="bg-red-500 text-white"
            >
              Clear All Caches & Reload
            </Button>

            <Button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              size="sm"
              variant="outline"
            >
              Clear localStorage & Reload
            </Button>

            <Button
              onClick={() => {
                window.location.href = window.location.href.split("?")[0]
              }}
              size="sm"
              variant="outline"
            >
              Remove URL Parameters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
