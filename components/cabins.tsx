'use client'

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Cabins() {
  const { content } = useLanguage()
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {content.cabins.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">{content.cabins.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.cabins.categories.map((cabin, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-64">
                <img src={cabin.image || "/placeholder.svg"} alt={cabin.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl font-bold">{cabin.name}</h3>
                  <span className="text-lg font-bold text-secondary whitespace-nowrap">{cabin.size}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {cabin.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-white text-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors mt-auto"
                  variant="outline"
                >
                  {content.cabins.selectButton}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
