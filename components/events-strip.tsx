"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock } from "lucide-react"
import { fetchWithCacheBusting } from "@/lib/cache-buster"

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
  const [lastFetch, setLastFetch] = useState<number>(0)
  const [dataSource, setDataSource] = useState<string>("loading")

  // Load events with cache busting and cross-device sync
  useEffect(() => {
    const loadEvents = async (forceRefresh = false) => {
      const now = Date.now()

      // Only fetch if it's been more than 3 seconds since last fetch (unless forced)
      if (!forceRefresh && now - lastFetch < 3000 && events.length > 0) {
        return
      }

      console.log("🔄 Loading events data...", forceRefresh ? "(forced)" : "")

      try {
        // ALWAYS try to fetch from live data first with aggressive cache busting
        const response = await fetchWithCacheBusting("/data/events.json")

        if (response.ok) {
          const liveEvents = await response.json()
          if (Array.isArray(liveEvents) && liveEvents.length > 0) {
            console.log("✅ Loaded LIVE events data:", liveEvents.length, "events")
            setEvents(liveEvents)
            setLastFetch(now)
            setDataSource("live")

            // Update localStorage with live data for offline fallback
            localStorage.setItem("sp_events_global", JSON.stringify(liveEvents))
            localStorage.setItem("sp_events_last_fetch", now.toString())
            return
          }
        } else {
          console.log("❌ Failed to fetch live events data:", response.status, response.statusText)
        }
      } catch (error) {
        console.log("⚠️ Live events data not available:", error)
      }

      // Fallback to localStorage only if live data fails
      try {
        const savedEvents = localStorage.getItem("sp_events_global")
        const lastFetchTime = localStorage.getItem("sp_events_last_fetch")

        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents)
          if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
            console.log("📦 Loaded events from localStorage:", parsedEvents.length, "events")
            console.log(
              "📅 Last fetch:",
              lastFetchTime ? new Date(Number.parseInt(lastFetchTime)).toLocaleString() : "Unknown",
            )
            setEvents(parsedEvents)
            setLastFetch(now)
            setDataSource("localStorage")
          } else {
            console.log("🔄 Using default events data (empty localStorage)")
            setEvents(defaultEvents)
            setLastFetch(now)
            setDataSource("default")
            localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
          }
        } else {
          console.log("🆕 Initializing with default events data (no localStorage)")
          setEvents(defaultEvents)
          setLastFetch(now)
          setDataSource("default")
          localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
        }
      } catch (error) {
        console.error("❌ Error loading events:", error)
        setEvents(defaultEvents)
        setLastFetch(now)
        setDataSource("error-fallback")
        localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
      }
    }

    // Load events immediately
    loadEvents()

    // Listen for storage changes from other tabs/devices
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_events_global") {
        console.log("🔄 Storage change detected from another tab/device, reloading events...")
        loadEvents(true)
      }
    }

    // Listen for focus events
    const handleFocus = () => {
      console.log("🔄 Tab focused, checking for event updates...")
      loadEvents(true)
    }

    // Listen for custom force refresh events
    const handleForceRefresh = () => {
      console.log("🔄 Force refresh event received...")
      loadEvents(true)
    }

    // Listen for online/offline events
    const handleOnline = () => {
      console.log("🌐 Back online, refreshing events data...")
      loadEvents(true)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("forceDataRefresh", handleForceRefresh)
    window.addEventListener("online", handleOnline)

    // Aggressive polling for cross-device sync - check every 8 seconds
    const interval = setInterval(() => {
      console.log("🔄 Periodic check for event updates...")
      loadEvents()
    }, 8000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("forceDataRefresh", handleForceRefresh)
      window.removeEventListener("online", handleOnline)
      clearInterval(interval)
    }
  }, [lastFetch, events.length])

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-neutral-600">Join us for exclusive drops, workshops, and gallery showings</p>
          <p className="text-xs text-neutral-500 mt-2">Data source: {dataSource}</p>
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
