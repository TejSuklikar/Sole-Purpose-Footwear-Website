"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Plus,
  Star,
  Trash2,
  Check,
  X,
  Calendar,
  MapPin,
  Clock,
  Edit,
  Cloud,
  CloudOff,
  ImageIcon,
  Package,
  StarOff,
} from "lucide-react"
import Image from "next/image"
import { syncShoesToRepo, syncEventsToRepo } from "@/lib/github-sync"

interface Shoe {
  id: number
  name: string
  price: number
  image: string // Primary image (first in images array)
  images: string[] // All images for the shoe
  slug: string
  sizes: string[]
  inStockSizes: string[] // New field for inventory management
  description?: string
  details?: string[]
  isFeatured?: boolean
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}

// CORRECTED sizing system - exactly 73 sizes
const allSizes = [
  // Men's sizes (17 sizes: 7-15, including half sizes)
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
  "14",
  "14.5",
  "15",
  // Women's sizes (15 sizes: 5W-12W, including half sizes)
  "5W",
  "5.5W",
  "6W",
  "6.5W",
  "7W",
  "7.5W",
  "8W",
  "8.5W",
  "9W",
  "9.5W",
  "10W",
  "10.5W",
  "11W",
  "11.5W",
  "12W",
  // Infant sizes (14 sizes: 1C-7.5C, including half sizes)
  "1C",
  "1.5C",
  "2C",
  "2.5C",
  "3C",
  "3.5C",
  "4C",
  "4.5C",
  "5C",
  "5.5C",
  "6C",
  "6.5C",
  "7C",
  "7.5C",
  // Toddler sizes (12 sizes: 8C-13.5C, including half sizes)
  "8C",
  "8.5C",
  "9C",
  "9.5C",
  "10C",
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  // Youth (10 sizes: 1Y-5.5Y, including half sizes)
  "1Y",
  "1.5Y",
  "2Y",
  "2.5Y",
  "3Y",
  "3.5Y",
  "4Y",
  "4.5Y",
  "5Y",
  "5.5Y",
  // Big Kids (5 sizes: 6Y-8Y, including 8Y to get exactly 73 total)
  "6Y",
  "6.5Y",
  "7Y",
  "7.5Y",
  "8Y", // Add this back
]

// All available shoes in the system - Updated with multiple images
const defaultShoes: Shoe[] = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 160,
    image: "/images/kuffiyeh-side-sunset.png",
    images: [
      "/images/kuffiyeh-side-sunset.png",
      "/images/kuffiyeh-af1.png",
      "/images/kuffiyeh-heel-sunset.png",
      "/images/kuffiyeh-heel-view.png",
      "/images/kuffiyeh-side-detail.png",
      "/images/kuffiyeh-sunset.png",
    ],
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes, // All sizes available
    description: "Traditional Kuffiyeh patterns hand-painted in bold red on premium white canvas.",
    details: [
      "Hand-painted with premium acrylic paints",
      "Sealed with protective coating",
      "Based on Nike Air Force 1",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: true,
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 160,
    image: "/images/mexican-side-view.png",
    images: [
      "/images/mexican-side-view.png",
      "/images/mexican-af1.png",
      "/images/mexican-full-shoe.png",
      "/images/mexican-eagle-detail.png",
      "/images/mexican-eagle-hero.png",
      "/images/mexican-box-angle.png",
      "/images/mexican-box-top.png",
    ],
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Detailed Mexican flag design featuring the iconic eagle and serpent coat of arms.",
    details: [
      "Hand-painted Mexican coat of arms",
      "Mexican flag colors on swoosh",
      "Premium white leather base",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: true,
  },
  {
    id: 3,
    name: "Black & Red Kuffiyeh",
    price: 160,
    image: "/images/black-red-geometric-hero.jpg",
    images: ["/images/black-red-geometric-hero.jpg", "/images/black-red-af1.png", "/images/geometric-af1.png"],
    slug: "black-red-geometric",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Sleek black forces with striking red geometric patterns.",
    details: [
      "All-black leather base",
      "Hand-painted red geometric patterns",
      "Matte finish",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: true,
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 160,
    image: "/images/jordanian-side-view.jpg",
    images: [
      "/images/jordanian-side-view.jpg",
      "/images/jordanian-heel-view.jpg",
      "/images/jordanian-af1.png",
      "/images/jordanian-detail.png",
    ],
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Jordanian flag design with traditional colors and patterns.",
    details: [
      "Hand-painted Jordanian flag design",
      "Traditional red, black, white, and green colors",
      "Kuffiyeh pattern details",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 5,
    name: "Black & White Checkered",
    price: 160,
    image: "/images/geometric-checkered-side.jpg",
    images: [
      "/images/geometric-checkered-side.jpg",
      "/images/checkered-drip-af1.png",
      "/images/checkered-drip-heel.png",
      "/images/checkered-drip-pair.png",
      "/images/checkered-drip-sunset.png",
      "/images/checkered-sunset.png",
    ],
    slug: "geometric-checkered",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Clean geometric checkered pattern in black and white.",
    details: [
      "Hand-painted checkered pattern",
      "Black and white minimalist design",
      "Palestinian flag colors on branding",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 160,
    image: "/images/chinese-side-sunset.png",
    images: [
      "/images/chinese-side-sunset.png",
      "/images/chinese-af1.png",
      "/images/chinese-collection.png",
      "/images/chinese-heel-view.png",
    ],
    slug: "chinese-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Chinese flag design featuring the iconic red and gold color scheme.",
    details: [
      "Hand-painted Chinese flag design",
      "Authentic red and gold colors",
      "Flag elements integrated into swoosh",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 160,
    image: "/images/checkered-drip-sunset.png",
    images: [
      "/images/checkered-drip-sunset.png",
      "/images/checkered-drip-af1.png",
      "/images/checkered-drip-heel.png",
      "/images/checkered-drip-pair.png",
    ],
    slug: "checkered-drip-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Bold checkered pattern with artistic paint drip design.",
    details: [
      "Hand-painted checkered swoosh",
      "Artistic paint drip effect",
      "Street art aesthetic",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 160,
    image: "/images/palestine-map-side.jpg",
    images: ["/images/palestine-map-side.jpg", "/images/palestine-map-angle.jpg"],
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Hand-painted map of Palestine in traditional flag colors.",
    details: [
      "Hand-painted map of Palestine",
      "Traditional Kuffiyeh geometric patterns",
      "Palestinian flag colors throughout",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 160,
    image: "/images/lebanese-side-view.jpg",
    images: ["/images/lebanese-side-view.jpg", "/images/lebanese-heel-view.jpg"],
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Lebanese flag design featuring the iconic cedar tree symbol.",
    details: [
      "Hand-painted Lebanese cedar tree",
      "Traditional red and white flag stripes",
      "Lebanese flag colors on branding",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145-175 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 160,
    image: "/images/filipino-side-view.jpg",
    images: ["/images/filipino-side-view.jpg", "/images/filipino-heel-view.jpg"],
    slug: "filipino-sun-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Filipino flag design featuring the golden sun symbol.",
    details: [
      "Hand-painted Filipino golden sun",
      "Authentic blue, red, and yellow colors",
      "Traditional eight-rayed sun design",
      "Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total",
    ],
    isFeatured: false,
  },
]

// Default events
const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Pop-Up Gallery Opening",
    date: "July 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "2025 Ramallah Convention, San Francisco",
    description: "Exclusive showcase of our latest custom designs",
  },
  {
    id: 2,
    title: "Custom Design Workshop",
    date: "July 28, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Soul Purpose Studio, SF",
    description: "Learn the art of sneaker customization",
  },
  {
    id: 3,
    title: "Summer Collection Drop",
    date: "August 5, 2025",
    time: "12:00 PM PST",
    location: "Online & SF Studio",
    description: "Limited edition summer-inspired designs",
  },
]

export function AdminPanel() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [editingInventory, setEditingInventory] = useState<number | null>(null)
  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [editingImages, setEditingImages] = useState<number | null>(null)
  const [editingShoe, setEditingShoe] = useState<number | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)
  const [newShoe, setNewShoe] = useState({
    name: "",
    price: "160", // Default to $160 sticker price
    images: [""], // Start with one empty image field
    description: "",
    details: "",
    sizes: [] as string[],
  })
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  // Add this state for editing events and shoes
  const [editingEventData, setEditingEventData] = useState<Event | null>(null)
  const [editingShoeData, setEditingShoeData] = useState<Shoe | null>(null)

  // Load shoes and events from localStorage on mount
  useEffect(() => {
    const savedShoes = localStorage.getItem("sp_shoes_global")
    if (savedShoes) {
      const parsedShoes = JSON.parse(savedShoes)
      // Migration: Update existing shoes to use the new structure with images array
      const updatedShoes = parsedShoes.map((shoe: Shoe) => ({
        ...shoe,
        sizes: allSizes, // Update to new 73-size array
        inStockSizes: shoe.inStockSizes || allSizes, // Update in-stock sizes too
        images: shoe.images || [shoe.image], // Ensure images array exists
      }))
      setShoes(updatedShoes)
      // Save the migrated data back to localStorage
      localStorage.setItem("sp_shoes_global", JSON.stringify(updatedShoes))
    } else {
      // Initialize with default shoes
      setShoes(defaultShoes)
      localStorage.setItem("sp_shoes_global", JSON.stringify(defaultShoes))
    }

    const savedEvents = localStorage.getItem("sp_events_global")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    } else {
      // Initialize with default events
      setEvents(defaultEvents)
      localStorage.setItem("sp_events_global", JSON.stringify(defaultEvents))
    }

    // Load last sync time
    const lastSync = localStorage.getItem("sp_last_sync")
    if (lastSync) {
      setLastSyncTime(lastSync)
    }
  }, [])

  const saveShoes = async (updatedShoes: Shoe[]) => {
    setShoes(updatedShoes)
    // Save to local storage immediately
    localStorage.setItem("sp_shoes_global", JSON.stringify(updatedShoes))

    // Sync to repository
    await syncToRepository("shoes", updatedShoes)
  }

  const saveEvents = async (updatedEvents: Event[]) => {
    setEvents(updatedEvents)
    // Save to local storage immediately
    localStorage.setItem("sp_events_global", JSON.stringify(updatedEvents))

    // Sync to repository
    await syncToRepository("events", updatedEvents)
  }

  const syncToRepository = async (type: "shoes" | "events", data: any[]) => {
    try {
      setSyncStatus("syncing")

      if (type === "shoes") {
        await syncShoesToRepo(data)
      } else {
        await syncEventsToRepo(data)
      }

      setSyncStatus("success")
      const now = new Date().toLocaleString()
      setLastSyncTime(now)
      localStorage.setItem("sp_last_sync", now)

      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      console.error("Sync failed:", error)
      setSyncStatus("error")

      // Reset status after 5 seconds
      setTimeout(() => setSyncStatus("idle"), 5000)
    }
  }

  const handleAddShoe = async () => {
    if (!newShoe.name || !newShoe.price || newShoe.images.filter((img) => img.trim()).length === 0) return

    const validImages = newShoe.images.filter((img) => img.trim())

    const shoe: Shoe = {
      id: Date.now(),
      name: newShoe.name,
      price: Number.parseInt(newShoe.price),
      image: validImages[0], // Primary image is the first one
      images: validImages,
      slug: newShoe.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      sizes: newShoe.sizes.length > 0 ? newShoe.sizes : allSizes,
      inStockSizes: newShoe.sizes.length > 0 ? newShoe.sizes : allSizes, // Initially all available sizes are in stock
      description: newShoe.description,
      details: newShoe.details ? newShoe.details.split("\n").filter((d) => d.trim()) : [],
      isFeatured: false,
    }

    const updatedShoes = [...shoes, shoe]
    await saveShoes(updatedShoes)

    // Reset form
    setNewShoe({
      name: "",
      price: "160", // Reset to default sticker price
      images: [""],
      description: "",
      details: "",
      sizes: [],
    })
    setShowAddForm(false)
  }

  // Update the Add Event form validation
  const handleAddEvent = async () => {
    // Validate required fields
    if (!newEvent.title.trim()) {
      alert("Please enter an event title")
      return
    }
    if (!newEvent.date.trim()) {
      alert("Please enter an event date")
      return
    }
    if (!newEvent.time.trim()) {
      alert("Please enter an event time")
      return
    }
    if (!newEvent.location.trim()) {
      alert("Please enter an event location")
      return
    }

    const event: Event = {
      id: Date.now(),
      title: newEvent.title.trim(),
      date: newEvent.date.trim(),
      time: newEvent.time.trim(),
      location: newEvent.location.trim(),
      description: newEvent.description.trim(),
    }

    const updatedEvents = [...events, event]
    await saveEvents(updatedEvents)

    // Reset form
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    })
    setShowAddEventForm(false)
  }

  const handleDeleteShoe = async (id: number) => {
    if (confirm("Are you sure you want to delete this shoe?")) {
      const updatedShoes = shoes.filter((shoe) => shoe.id !== id)
      await saveShoes(updatedShoes)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((event) => event.id !== id)
      await saveEvents(updatedEvents)
    }
  }

  // Update the handleUpdateEvent function
  const handleUpdateEvent = async (updatedEvent: Event) => {
    const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    await saveEvents(updatedEvents)
    setEditingEvent(null)
    setEditingEventData(null)
  }

  // Add handleUpdateShoe function
  const handleUpdateShoe = async (updatedShoe: Shoe) => {
    const validImages = updatedShoe.images.filter((img) => img.trim())
    if (validImages.length === 0) return

    const finalShoe = {
      ...updatedShoe,
      images: validImages,
      image: validImages[0], // Update primary image to first in array
      slug: updatedShoe.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      details:
        typeof updatedShoe.details === "string"
          ? updatedShoe.details.split("\n").filter((d) => d.trim())
          : updatedShoe.details || [],
    }

    const updatedShoes = shoes.map((shoe) => (shoe.id === updatedShoe.id ? finalShoe : shoe))
    await saveShoes(updatedShoes)
    setEditingShoe(null)
    setEditingShoeData(null)
  }

  const startEditingEvent = (event: Event) => {
    setEditingEvent(event.id)
    setEditingEventData({ ...event }) // Create a copy for editing
  }

  const startEditingShoe = (shoe: Shoe) => {
    setEditingShoe(shoe.id)
    setEditingShoeData({
      ...shoe,
      details: Array.isArray(shoe.details) ? shoe.details.join("\n") : shoe.details || "",
    }) // Create a copy for editing
  }

  const cancelEditingEvent = () => {
    setEditingEvent(null)
    setEditingEventData(null)
  }

  const cancelEditingShoe = () => {
    setEditingShoe(null)
    setEditingShoeData(null)
  }

  const toggleFeatured = async (id: number) => {
    const featuredCount = shoes.filter((shoe) => shoe.isFeatured).length
    const shoe = shoes.find((s) => s.id === id)

    if (shoe?.isFeatured) {
      // Removing from featured
      const updatedShoes = shoes.map((s) => (s.id === id ? { ...s, isFeatured: false } : s))
      await saveShoes(updatedShoes)
    } else if (featuredCount < 3) {
      // Adding to featured (max 3)
      const updatedShoes = shoes.map((s) => (s.id === id ? { ...s, isFeatured: true } : s))
      await saveShoes(updatedShoes)
    } else {
      alert("You can only have 3 featured shoes. Remove one first.")
    }
  }

  const handleSizeToggle = (size: string) => {
    const updatedSizes = newShoe.sizes.includes(size)
      ? newShoe.sizes.filter((s) => s !== size)
      : [...newShoe.sizes, size]

    setNewShoe({ ...newShoe, sizes: updatedSizes })
  }

  const handleEditSizeToggle = (size: string) => {
    if (!editingShoeData) return

    const updatedSizes = editingShoeData.sizes.includes(size)
      ? editingShoeData.sizes.filter((s) => s !== size)
      : [...editingShoeData.sizes, size]

    setEditingShoeData({ ...editingShoeData, sizes: updatedSizes })
  }

  const toggleSizeStock = async (shoeId: number, size: string) => {
    const updatedShoes = shoes.map((shoe) => {
      if (shoe.id === shoeId) {
        const inStockSizes = shoe.inStockSizes.includes(size)
          ? shoe.inStockSizes.filter((s) => s !== size)
          : [...shoe.inStockSizes, size]
        return { ...shoe, inStockSizes }
      }
      return shoe
    })
    await saveShoes(updatedShoes)
  }

  // Image management functions
  const addImageField = () => {
    setNewShoe({ ...newShoe, images: [...newShoe.images, ""] })
  }

  const addEditImageField = () => {
    if (!editingShoeData) return
    setEditingShoeData({ ...editingShoeData, images: [...editingShoeData.images, ""] })
  }

  const removeImageField = (index: number) => {
    const updatedImages = newShoe.images.filter((_, i) => i !== index)
    setNewShoe({ ...newShoe, images: updatedImages.length > 0 ? updatedImages : [""] })
  }

  const removeEditImageField = (index: number) => {
    if (!editingShoeData) return
    const updatedImages = editingShoeData.images.filter((_, i) => i !== index)
    setEditingShoeData({ ...editingShoeData, images: updatedImages.length > 0 ? updatedImages : [""] })
  }

  const updateImageField = (index: number, value: string) => {
    const updatedImages = [...newShoe.images]
    updatedImages[index] = value
    setNewShoe({ ...newShoe, images: updatedImages })
  }

  const updateEditImageField = (index: number, value: string) => {
    if (!editingShoeData) return
    const updatedImages = [...editingShoeData.images]
    updatedImages[index] = value
    setEditingShoeData({ ...editingShoeData, images: updatedImages })
  }

  const selectAllSizes = () => {
    setNewShoe({ ...newShoe, sizes: [...allSizes] })
  }

  const selectAllEditSizes = () => {
    if (!editingShoeData) return
    setEditingShoeData({ ...editingShoeData, sizes: [...allSizes] })
  }

  const clearAllSizes = () => {
    setNewShoe({ ...newShoe, sizes: [] })
  }

  const clearAllEditSizes = () => {
    if (!editingShoeData) return
    setEditingShoeData({ ...editingShoeData, sizes: [] })
  }

  const selectSizeCategory = (category: "men" | "women" | "infant" | "toddler" | "youth" | "big-kids") => {
    let categorySizes: string[] = []

    if (category === "men") {
      categorySizes = allSizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
    } else if (category === "women") {
      categorySizes = allSizes.filter((size) => size.includes("W"))
    } else if (category === "infant") {
      categorySizes = allSizes.filter((size) => {
        if (!size.includes("C")) return false
        const num = Number.parseFloat(size)
        return num >= 1 && num <= 7.5
      })
    } else if (category === "toddler") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("C")) {
          const num = Number.parseFloat(size)
          return num >= 8 && num <= 13.5
        }
        return false
      })
    } else if (category === "youth") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 1 && num <= 5.5
        }
        return false
      })
    } else if (category === "big-kids") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 6 && num <= 8
        }
        return false
      })
    }

    // Add to existing selection (don't replace)
    const newSizes = [...new Set([...newShoe.sizes, ...categorySizes])]
    setNewShoe({ ...newShoe, sizes: newSizes })
  }

  const selectEditSizeCategory = (category: "men" | "women" | "infant" | "toddler" | "youth" | "big-kids") => {
    if (!editingShoeData) return

    let categorySizes: string[] = []

    if (category === "men") {
      categorySizes = allSizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
    } else if (category === "women") {
      categorySizes = allSizes.filter((size) => size.includes("W"))
    } else if (category === "infant") {
      categorySizes = allSizes.filter((size) => {
        if (!size.includes("C")) return false
        const num = Number.parseFloat(size)
        return num >= 1 && num <= 7.5
      })
    } else if (category === "toddler") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("C")) {
          const num = Number.parseFloat(size)
          return num >= 8 && num <= 13.5
        }
        return false
      })
    } else if (category === "youth") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 1 && num <= 5.5
        }
        return false
      })
    } else if (category === "big-kids") {
      categorySizes = allSizes.filter((size) => {
        if (size.includes("Y")) {
          const num = Number.parseFloat(size)
          return num >= 6 && num <= 8
        }
        return false
      })
    }

    // Add to existing selection (don't replace)
    const newSizes = [...new Set([...editingShoeData.sizes, ...categorySizes])]
    setEditingShoeData({ ...editingShoeData, sizes: newSizes })
  }

  const featuredShoes = shoes.filter((shoe) => shoe.isFeatured)

  // Group sizes for better display - UPDATED
  const mensSizes = allSizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
  const womensSizes = allSizes.filter((size) => size.includes("W"))
  const infantSizes = allSizes.filter((size) => {
    if (!size.includes("C")) return false
    const num = Number.parseFloat(size)
    return num >= 1 && num <= 7.5
  })
  const toddlerSizes = allSizes.filter((size) => {
    if (size.includes("C")) {
      const num = Number.parseFloat(size)
      return num >= 8 && num <= 13.5
    }
    return false
  })
  const youthSizes = allSizes.filter((size) => {
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 1 && num <= 5.5
    }
    return false
  })
  const bigKidsSizes = allSizes.filter((size) => {
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 6 && num <= 8
    }
    return false
  })

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case "syncing":
        return <Cloud className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <Cloud className="h-4 w-4 text-green-500" />
      case "error":
        return <CloudOff className="h-4 w-4 text-red-500" />
      default:
        return <Cloud className="h-4 w-4 text-gray-500" />
    }
  }

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case "syncing":
        return "Syncing to repository..."
      case "success":
        return "Successfully synced to repository"
      case "error":
        return "Failed to sync to repository"
      default:
        return lastSyncTime ? `Last synced: ${lastSyncTime}` : "Ready to sync"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center gap-2 mt-2">
            {getSyncStatusIcon()}
            <span className="text-sm text-neutral-400">{getSyncStatusText()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddEventForm(true)} className="bg-blue-600 text-white hover:bg-blue-700">
            <Calendar className="mr-2 h-4 w-4" />
            Add Event
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="bg-white text-black">
            <Plus className="mr-2 h-4 w-4" />
            Add Shoe
          </Button>
        </div>
      </div>

      {/* Sync Status Card */}
      <Card className="bg-green-900/20 border-green-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cloud className="mr-2 h-5 w-5 text-green-500" />
            Repository Sync Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-neutral-300">
            <p className="mb-2">
              ✅ <strong>Bidirectional Sync Enabled</strong>
            </p>
            <p className="mb-1">• Admin changes automatically commit to GitHub repository</p>
            <p className="mb-1">• Triggers automatic deployment to solepurpose.shop</p>
            <p className="mb-1">• Full version history and backup of all changes</p>
            <p className="text-xs text-neutral-400 mt-3">
              Changes typically appear on live site within 3-4 minutes after sync.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Info Card */}
      <Card className="bg-blue-900/20 border-blue-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">💰 Current Pricing Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-neutral-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Infant (1C-7.5C)</h4>
              <p className="text-neutral-300">$120 + $15 shipping = $135 total</p>
            </div>
            <div className="bg-neutral-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Toddler (8C-13.5C)</h4>
              <p className="text-neutral-300">$130 + $15 shipping = $145 total</p>
            </div>
            <div className="bg-neutral-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Youth (1Y-5.5Y)</h4>
              <p className="text-neutral-300">$130 + $15 shipping = $145 total</p>
            </div>
            <div className="bg-neutral-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Big Kids (6Y-8Y)</h4>
              <p className="text-neutral-300">$160 + $15 shipping = $175 total</p>
            </div>
            <div className="bg-neutral-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Women's & Men's</h4>
              <p className="text-neutral-300">$210 + $20 shipping = $230 total</p>
            </div>
            <div className="bg-green-800 p-3 rounded">
              <h4 className="text-white font-semibold mb-2">Bay Area Special</h4>
              <p className="text-neutral-300">Free pickup/dropoff available</p>
            </div>
          </div>
          <p className="text-neutral-400 text-xs mt-3">
            * All shoes display $160 sticker price. Actual pricing calculated at checkout based on size selection.
          </p>
        </CardContent>
      </Card>

      {/* Events Management Section */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            Upcoming Events ({events.length})
          </CardTitle>
          <p className="text-neutral-400 text-sm">
            Manage events that appear on the homepage. Changes are automatically synced to repository and deployed.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-neutral-800 rounded-lg p-4">
                {editingEvent === event.id && editingEventData ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-white text-sm">Event Title</Label>
                      <Input
                        value={editingEventData.title}
                        onChange={(e) => setEditingEventData({ ...editingEventData, title: e.target.value })}
                        placeholder="Event title"
                        className="text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm">Date</Label>
                      <Input
                        value={editingEventData.date}
                        onChange={(e) => setEditingEventData({ ...editingEventData, date: e.target.value })}
                        placeholder="Date"
                        className="text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm">Time</Label>
                      <Input
                        value={editingEventData.time}
                        onChange={(e) => setEditingEventData({ ...editingEventData, time: e.target.value })}
                        placeholder="Time"
                        className="text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm">Location</Label>
                      <Input
                        value={editingEventData.location}
                        onChange={(e) => setEditingEventData({ ...editingEventData, location: e.target.value })}
                        placeholder="Location"
                        className="text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm">Description</Label>
                      <Textarea
                        value={editingEventData.description}
                        onChange={(e) => setEditingEventData({ ...editingEventData, description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                        className="text-sm mt-1"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleUpdateEvent(editingEventData)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        onClick={cancelEditingEvent}
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                    <p className="text-neutral-400 text-sm mb-3">{event.description}</p>
                    <div className="space-y-1 text-xs text-neutral-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => startEditingEvent(event)}
                        size="sm"
                        variant="outline"
                        className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteEvent(event.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white flex-1"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Event Form */}
      {showAddEventForm && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventTitle" className="text-white font-medium">
                  Event Title *
                </Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Pop-Up Gallery Opening"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventDate" className="text-white font-medium">
                  Date *
                </Label>
                <Input
                  id="eventDate"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  placeholder="e.g., July 15, 2025"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventTime" className="text-white font-medium">
                  Time *
                </Label>
                <Input
                  id="eventTime"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  placeholder="e.g., 6:00 PM - 10:00 PM"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventLocation" className="text-white font-medium">
                  Location *
                </Label>
                <Input
                  id="eventLocation"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="e.g., Mission District, San Francisco"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="eventDescription" className="text-white font-medium">
                Description
              </Label>
              <Textarea
                id="eventDescription"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Brief description of the event..."
                rows={3}
                className="mt-1"
              />
              <p className="text-xs text-neutral-400 mt-1">Optional - provide additional details about the event</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleAddEvent}
                className="bg-blue-600 text-white hover:bg-blue-700 flex-1"
                disabled={
                  !newEvent.title.trim() || !newEvent.date.trim() || !newEvent.time.trim() || !newEvent.location.trim()
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
              <Button onClick={() => setShowAddEventForm(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Shoes Section */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Featured Shoes ({featuredShoes.length}/3)
          </CardTitle>
          <p className="text-neutral-400 text-sm">
            These shoes appear on the homepage. Click the star on any shoe below to feature/unfeature it.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredShoes.map((shoe) => (
              <div key={shoe.id} className="bg-neutral-800 rounded-lg p-4">
                <div className="aspect-square relative mb-2 rounded-lg overflow-hidden">
                  <Image
                    src={shoe.image || "/placeholder.svg"}
                    alt={shoe.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <h3 className="text-white font-semibold">{shoe.name}</h3>
                <p className="text-neutral-400">${shoe.price} (sticker price)</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {shoe.inStockSizes.length}/{shoe.sizes.length} sizes in stock
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  {shoe.images.length} image{shoe.images.length !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
            {Array.from({ length: 3 - featuredShoes.length }).map((_, i) => (
              <div key={i} className="bg-neutral-800 rounded-lg p-4 border-2 border-dashed border-neutral-600">
                <div className="aspect-square flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <Star className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Empty Slot</p>
                    <p className="text-xs text-neutral-600">Click ⭐ on shoes below</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Shoe Form */}
      {showAddForm && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Shoe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Shoe Name
                </Label>
                <Input
                  id="name"
                  value={newShoe.name}
                  onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
                  placeholder="e.g., Red Kuffiyeh AF1"
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-white">
                  Sticker Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newShoe.price}
                  onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })}
                  placeholder="160"
                />
                <p className="text-xs text-neutral-400 mt-1">
                  Display price only. Actual pricing calculated by size at checkout.
                </p>
              </div>
            </div>

            {/* Multiple Images Section */}
            <div>
              <Label className="text-white flex items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Product Images
              </Label>
              <p className="text-xs text-neutral-400 mb-3">
                Add multiple images to showcase different angles. First image will be the primary display image.
              </p>

              <div className="space-y-3">
                {newShoe.images.map((image, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        placeholder={
                          index === 0 ? "/images/shoe-name-main.png (Primary)" : `/images/shoe-name-${index + 1}.png`
                        }
                        className="text-sm"
                      />
                    </div>
                    {image && (
                      <div className="w-12 h-12 relative rounded border overflow-hidden bg-neutral-800">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    )}
                    {newShoe.images.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeImageField(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={addImageField}
                  size="sm"
                  variant="outline"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Image
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={newShoe.description}
                onChange={(e) => setNewShoe({ ...newShoe, description: e.target.value })}
                placeholder="Describe the shoe design..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-white">
                Details (one per line)
              </Label>
              <Textarea
                id="details"
                value={newShoe.details}
                onChange={(e) => setNewShoe({ ...newShoe, details: e.target.value })}
                placeholder="Hand-painted with premium paints&#10;Sealed with protective coating&#10;Based on Nike Air Force 1&#10;Infant (1C-7.5C): $135 total | Toddler (8C-13.5C): $145 total | Youth: $145 total | Big Kids: $145-175 total | Adults: $230 total"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-white">Available Sizes (Updated Sizing System)</Label>

              {/* Size Selection Controls */}
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                <Button
                  type="button"
                  onClick={selectAllSizes}
                  size="sm"
                  variant="outline"
                  className="text-xs bg-transparent"
                >
                  Select All ({allSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={clearAllSizes}
                  size="sm"
                  variant="outline"
                  className="text-xs bg-transparent"
                >
                  Clear All
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("men")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Men's ({mensSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("women")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Women's ({womensSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("big-kids")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Big Kids ({bigKidsSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("youth")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Youth ({youthSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("toddler")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Toddler ({toddlerSizes.length})
                </Button>
                <Button
                  type="button"
                  onClick={() => selectSizeCategory("infant")}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  + Infant ({infantSizes.length})
                </Button>
              </div>

              {/* Men's Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Men's Sizes (7-15) - $230 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {mensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Women's Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Women's Sizes - $230 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {womensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Kids */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Big Kids (6Y-8Y) - $175 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {bigKidsSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Youth */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Youth (1Y-5.5Y) - $145 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {youthSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toddler Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Toddler (8C-13.5C) - $145 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {toddlerSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infant Sizes */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Infant (1C-7.5C) - $135 total</h4>
                <div className="grid grid-cols-6 gap-2">
                  {infantSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 rounded border text-sm ${
                        newShoe.sizes.includes(size)
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-neutral-400 text-sm mt-1">
                {newShoe.sizes.length === 0 ? "All sizes will be available" : `${newShoe.sizes.length} sizes selected`}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddShoe} className="bg-white text-black">
                Add Shoe
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Shoes List */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">All Shoes ({shoes.length})</CardTitle>
          <p className="text-neutral-400 text-sm">
            Manage featured status, inventory, and images. Click the edit icon to modify shoe details.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoes.map((shoe) => (
              <div key={shoe.id} className="bg-neutral-800 rounded-lg p-4">
                {editingShoe === shoe.id && editingShoeData ? (
                  <div className="space-y-4">
                    {/* Edit Shoe Form */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-white text-sm">Shoe Name</Label>
                        <Input
                          value={editingShoeData.name}
                          onChange={(e) => setEditingShoeData({ ...editingShoeData, name: e.target.value })}
                          placeholder="Shoe name"
                          className="text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm">Price ($)</Label>
                        <Input
                          type="number"
                          value={editingShoeData.price}
                          onChange={(e) =>
                            setEditingShoeData({ ...editingShoeData, price: Number.parseInt(e.target.value) })
                          }
                          placeholder="160"
                          className="text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Edit Images Section */}
                    <div>
                      <Label className="text-white text-sm flex items-center">
                        <ImageIcon className="mr-2 h-3 w-3" />
                        Product Images
                      </Label>
                      <div className="space-y-2 mt-2">
                        {editingShoeData.images.map((image, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <div className="flex-1">
                              <Input
                                value={image}
                                onChange={(e) => updateEditImageField(index, e.target.value)}
                                placeholder={index === 0 ? "Primary image" : `Image ${index + 1}`}
                                className="text-xs"
                              />
                            </div>
                            {image && (
                              <div className="w-8 h-8 relative rounded border overflow-hidden bg-neutral-700">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  crossOrigin="anonymous"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg"
                                  }}
                                />
                              </div>
                            )}
                            {editingShoeData.images.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeEditImageField(index)}
                                size="sm"
                                variant="outline"
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white p-1 h-8 w-8"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={addEditImageField}
                          size="sm"
                          variant="outline"
                          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Image
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white text-sm">Description</Label>
                      <Textarea
                        value={editingShoeData.description || ""}
                        onChange={(e) => setEditingShoeData({ ...editingShoeData, description: e.target.value })}
                        placeholder="Shoe description"
                        rows={2}
                        className="text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-white text-sm">Details (one per line)</Label>
                      <Textarea
                        value={
                          typeof editingShoeData.details === "string"
                            ? editingShoeData.details
                            : editingShoeData.details?.join("\n") || ""
                        }
                        onChange={(e) => setEditingShoeData({ ...editingShoeData, details: e.target.value })}
                        placeholder="Shoe details"
                        rows={3}
                        className="text-sm mt-1"
                      />
                    </div>

                    {/* Edit Available Sizes */}
                    <div>
                      <Label className="text-white text-sm">Available Sizes</Label>
                      <div className="flex flex-wrap gap-1 mt-2 mb-2">
                        <Button
                          type="button"
                          onClick={selectAllEditSizes}
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent h-6 px-2"
                        >
                          All
                        </Button>
                        <Button
                          type="button"
                          onClick={clearAllEditSizes}
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent h-6 px-2"
                        >
                          Clear
                        </Button>
                        <Button
                          type="button"
                          onClick={() => selectEditSizeCategory("men")}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6 px-2"
                        >
                          Men's
                        </Button>
                        <Button
                          type="button"
                          onClick={() => selectEditSizeCategory("women")}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6 px-2"
                        >
                          Women's
                        </Button>
                        <Button
                          type="button"
                          onClick={() => selectEditSizeCategory("youth")}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6 px-2"
                        >
                          Youth
                        </Button>
                      </div>
                      <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
                        {allSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleEditSizeToggle(size)}
                            className={`p-1 rounded border text-xs ${
                              editingShoeData.sizes.includes(size)
                                ? "bg-white text-black border-white"
                                : "bg-neutral-700 text-white border-neutral-600"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <p className="text-neutral-400 text-xs mt-1">{editingShoeData.sizes.length} sizes selected</p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleUpdateShoe(editingShoeData)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button onClick={cancelEditingShoe} size="sm" variant="outline" className="flex-1 bg-transparent">
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={shoe.image || "/placeholder.svg"}
                        alt={shoe.name}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                      {shoe.isFeatured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded">
                          <Star className="h-4 w-4" />
                        </div>
                      )}
                      {shoe.images.length > 1 && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                          {shoe.images.length} photos
                        </div>
                      )}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{shoe.name}</h3>
                    <p className="text-neutral-400">${shoe.price} (sticker price)</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {shoe.inStockSizes.length}/{shoe.sizes.length} sizes in stock
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {shoe.images.length} image{shoe.images.length !== 1 ? "s" : ""}
                    </p>

                    {/* Inventory Management */}
                    {editingInventory === shoe.id && (
                      <div className="mb-4 p-3 bg-neutral-700 rounded-lg">
                        <h4 className="text-white text-sm font-medium mb-2">Size Inventory</h4>
                        <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                          {shoe.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => toggleSizeStock(shoe.id, size)}
                              className={`p-1 rounded text-xs border ${
                                shoe.inStockSizes.includes(size)
                                  ? "bg-green-600 text-white border-green-500"
                                  : "bg-red-600 text-white border-red-500"
                              }`}
                              title={shoe.inStockSizes.includes(size) ? "In Stock" : "Out of Stock"}
                            >
                              {size}
                              {shoe.inStockSizes.includes(size) ? (
                                <Check className="h-2 w-2 inline ml-1" />
                              ) : (
                                <X className="h-2 w-2 inline ml-1" />
                              )}
                            </button>
                          ))}
                        </div>
                        <Button
                          onClick={() => setEditingInventory(null)}
                          size="sm"
                          variant="outline"
                          className="mt-2 w-full"
                        >
                          Done
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-1 mt-3">
                      <Button
                        onClick={() => toggleFeatured(shoe.id)}
                        size="sm"
                        variant={shoe.isFeatured ? "default" : "outline"}
                        className={shoe.isFeatured ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
                        title={shoe.isFeatured ? "Remove from featured" : "Add to featured"}
                      >
                        {shoe.isFeatured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={() => setEditingInventory(editingInventory === shoe.id ? null : shoe.id)}
                        size="sm"
                        variant="outline"
                        className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                        title="Manage inventory"
                      >
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => startEditingShoe(shoe)}
                        size="sm"
                        variant="outline"
                        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                        title="Edit shoe details"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteShoe(shoe.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
