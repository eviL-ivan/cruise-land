'use client'


import { useState } from "react"
import { ChevronDown, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Itinerary() {
  const { content } = useLanguage()
  const [openDay, setOpenDay] = useState<number | null>(0)

  const toggleDay = (index: number) => {
    setOpenDay(openDay === index ? null : index)
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            {content.itinerary.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            {content.itinerary.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {content.itinerary.days.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleDay(index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-secondary uppercase tracking-wider">{item.day}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${
                    openDay === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDay === index && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                      <div>
                        <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-secondary">
                          {content.itinerary.activitiesLabel}
                        </h4>
                        <ul className="space-y-2">
                          {item.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span className="text-sm text-muted-foreground">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
