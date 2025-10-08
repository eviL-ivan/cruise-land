'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { BookingModal } from "./BookingModal"
import { CabinCard } from "./CabinCard"

export function Cabins() {
  const { content } = useLanguage()
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.cabins.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">{content.cabins.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {content.cabins.categories.map((cabin, index) => (
            <CabinCard
              key={index}
              cabin={cabin}
              onBook={() => setShowBookingModal(true)}
              selectButtonText={content.cabins.selectButton}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </section>
  )
}
