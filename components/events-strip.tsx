"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}

// Default events (fallback)
const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Pop-Up Gallery Opening",
    date: "July 2-5, 2025",
    time: "2:00 PM - 10:00 PM",
    location: "Hyatt Regency Burlingame, San Francisco, CA",
    description: "Exclusive showcase of our latest custom designs at the 2025 Ramallah Convention",
  },
  {
    id: 2,
    title: "Custom Design Workshop",
    date: "July 28, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Sole Purpose Studio, SF",
    description: "Learn the art of sneaker customization",
  },
  {
    id: 3,
    title: "Palestine Day",
    date: "October 1-8, 2025",
    time: "12:00 PM PST",
    location: "Redwood City",
    description: "Limited edition Palestinian-inspired designs",
  },
]

export function EventsStrip() {
  const [events, setEvents] = useState<Event[]>(defaultEvents)

  // Load events - prioritize live data over localStorage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // First, try to fetch from the live data source with cache busting
        const timestamp = new Date().getTime()
        const response = await fetch(`/data/events.json?t=${timestamp}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (response.ok) {
          const liveEvents = await response.json()
          if (Array.isArray(liveEvents) && liveEvents.length > 0) {
            console.log("✅ Loaded live events data:", liveEvents.length, "events")
            setEvents(liveEvents)
            // Update localStorage with live data
            localStorage.setItem("sp_events_global", JSON.stringify(liveEvents))
            return
          }
        } else {
          console.log("❌ Failed to fetch live events data:", response.status, response.statusText)
        }
      } catch (error) {
        console.log("⚠️ Live events data not available, falling back to localStorage:", error)
      }

      // Fallback to localStorage if live data fails
      try {
        const savedEvents = localStorage.getItem("sp_events_global")
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents)
          if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
            console.log("📦 Loaded events from localStorage:", parsedEvents.length, "events")
            setEvents(parsedEvents)
          } else {
            // If saved events is empty or invalid, use default events
            console.log("🔄 Using default events data")
            setEvents(defaultEvents)
            localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
          }
        } else {
          // If no saved events, initialize with default events
          console.log("🆕 Initializing with default events data")
          setEvents(defaultEvents)
          localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
        }
      } catch (error) {
        console.error("❌ Error loading events:", error)
        // Fallback to default events if there's an error
        setEvents(defaultEvents)
        localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
      }
    }

    // Load events immediately
    loadEvents()

    // Listen for storage changes to update when admin makes changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_events_global") {
        console.log("🔄 Storage change detected, reloading events...")
        loadEvents()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates and live data)
    const interval = setInterval(() => {
      console.log("🔄 Periodic check for event updates...")
      loadEvents()
    }, 10000) // Check every 10 seconds for faster updates

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-neutral-600">Join us for exclusive drops, workshops, and gallery showings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="font-semibold text-xl mb-3 text-neutral-900">{event.title}</h3>
              <p className="text-neutral-600 mb-4">{event.description}</p>
              <div className="space-y-2 text-sm text-neutral-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
