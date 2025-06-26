"use client"

import { useEffect, useState, useCallback } from "react"
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

  const loadEvents = useCallback(async (forceRefresh = false) => {
    console.log("🔄 Loading events data...", forceRefresh ? "(FORCED)" : "(auto)")

    try {
      const response = await fetchWithCacheBusting("/data/events.json")
      if (response.ok) {
        const liveEvents = await response.json()
        if (Array.isArray(liveEvents) && liveEvents.length > 0) {
          console.log(`✅ SUCCESS: Loaded ${liveEvents.length} events from LIVE data`)
          setEvents(liveEvents)
          localStorage.setItem("sp_events_global", JSON.stringify(liveEvents))
          return
        }
      }
    } catch (error) {
      console.log("💥 Live events data error, falling back.", error)
    }

    try {
      const savedEvents = localStorage.getItem("sp_events_global")
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents)
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          console.log(`📦 Loaded ${parsedEvents.length} events from localStorage`)
          setEvents(parsedEvents)
        }
      }
    } catch (error) {
      console.log("💥 localStorage events error.", error)
    }
  }, [])

  useEffect(() => {
    loadEvents(true)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_events_global" || e.key === "sp_force_refresh") {
        loadEvents(true)
      }
    }
    const handleFocus = () => loadEvents(true)
    const handleForceRefresh = () => loadEvents(true)
    const handleOnline = () => loadEvents(true)
    const handleVisibilityChange = () => {
      if (!document.hidden) loadEvents(true)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("forceDataRefresh", handleForceRefresh as EventListener)
    window.addEventListener("online", handleOnline)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const interval = setInterval(() => loadEvents(), 3000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("forceDataRefresh", handleForceRefresh as EventListener)
      window.removeEventListener("online", handleOnline)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearInterval(interval)
    }
  }, [loadEvents])

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
