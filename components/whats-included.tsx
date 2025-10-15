'use client'

import { useLanguage } from "@/lib/language-context"
import { Check } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function WhatsIncluded() {
  const { content } = useLanguage()

  return (
    <section className="py-20 pt-0 md:pt-0 md:py-28 bg-gradient-to-b from-white via-[#f8f7f6] to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Decorative element top */}
        <div className="mb-16 text-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#be8f74]/40 to-transparent mx-auto" />
        </div>

        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance text-[#004155]">
            {content.included.title}
          </h2>
          <p className="text-base md:text-lg text-[#6d6e71]/80 text-pretty leading-relaxed">
            {content.included.subtitle}
          </p>
        </div>

        {/* Accordion with Categories */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {content.included.categories.map((category, categoryIndex) => (
              <AccordionItem
                key={categoryIndex}
                value={`item-${categoryIndex}`}
                className="border-[#be8f74]/20"
              >
                <AccordionTrigger className="mt-4 text-[#004155] hover:text-[#be8f74] text-lg font-medium items-center [&>svg]:translate-y-0">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-4 group"
                    >
                      {/* Check Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-full bg-[#be8f74]/10 flex items-center justify-center group-hover:bg-[#be8f74]/20 transition-colors">
                          <Check className="w-4 h-4 text-[#be8f74]" strokeWidth={3} />
                        </div>
                      </div>

                      {/* Item Text */}
                      <p className="text-[#004155]/90 text-base leading-relaxed text-balance">
                        {item}
                      </p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Optional: Decorative element */}
        <div className="mt-16 text-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#be8f74]/40 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  )
}
