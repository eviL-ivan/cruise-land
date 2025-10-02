'use client'

import { Waves, Utensils, Dumbbell, Sparkles, Ship as ShipIcon, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const amenityIcons = {
  "Бассейн-инфинити": Waves,
  "Infinity Pool": Waves,
  "无边泳池": Waves,
  "Высокая кухня": Utensils,
  "Fine Dining": Utensils,
  "精致餐饮": Utensils,
  "Спа-центр": Sparkles,
  "Spa Center": Sparkles,
  "水疗中心": Sparkles,
  "Тренажерный зал": Dumbbell,
  "Gym": Dumbbell,
  "健身房": Dumbbell,
  "Ледовый класс PC6": ShipIcon,
  "PC6 Ice Class": ShipIcon,
  "PC6冰级": ShipIcon,
  "Безопасность": Shield,
  "Safety": Shield,
  "安全性": Shield,
}

export function Ship() {
  const { content } = useLanguage()
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              {content.ship.name}
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">{content.ship.description}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {content.ship.amenities.map((amenity, index) => {
                const Icon = amenityIcons[amenity.title as keyof typeof amenityIcons] || Waves
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{amenity.title}</h3>
                      <p className="text-sm text-primary-foreground/80">{amenity.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl">
              <img src={content.ship.images[0].src} alt={content.ship.images[0].alt} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                <img src={content.ship.images[1].src} alt={content.ship.images[1].alt} className="w-full h-full object-cover" />
              </div>
              <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                <img src={content.ship.images[2].src} alt={content.ship.images[2].alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
