'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Check, ChevronDown, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function WhatsIncluded() {
  const { content } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-20 pt-0 md:pt-0 md:py-28 bg-gradient-to-b from-white via-[#f8f7f6] to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Decorative element top */}
        <div className="mb-16 text-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#be8f74]/40 to-transparent mx-auto" />
        </div>

        {/* Main Card */}
        <div className="w-full max-w-4xl mx-auto">
          <Card className="flex flex-col rounded-xl py-6 overflow-hidden border-2 border-[#be8f74]/20 shadow-2xl bg-gradient-to-br from-white via-white to-[#f8f7f6]/30">
            {/* Header - Always Visible */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-6 py-6 md:px-12 md:py-10 flex items-center justify-between bg-gradient-to-r from-white to-[#f8f7f6]/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#be8f74] to-transparent opacity-60"></div>
              <div className="flex items-center gap-4">
                <Sparkles className="h-7 w-7 text-[#be8f74] animate-pulse" />
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl -mb-2 text-[#004155] text-balance tracking-tight">
                  {content.included.title}
                </h2>
              </div>
              <ChevronDown
                className={cn(
                  "h-7 w-7 text-[#be8f74] transition-all duration-500 group-hover:scale-110",
                  isExpanded && "rotate-180",
                )}
              />
            </button>

            {/* Expandable Content */}
            <div
              className={cn(
                "grid transition-all duration-700 ease-in-out",
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-8 py-10 md:px-12 md:py-12 space-y-10 bg-gradient-to-b from-white to-[#f8f7f6]/10">
                  {/* Inclusions Grid */}
                  <div className="grid gap-8 md:gap-10">
                    {content.included.categories.map((category, idx) => (
                      <div key={idx} className="space-y-5 group">
                        <div className="flex items-center gap-3 pb-3 border-b border-[#be8f74]/30">
                          <div className="h-8 w-1 bg-gradient-to-b from-[#be8f74] to-[#be8f74]/40 rounded-full"></div>
                          <h3 className="font-serif text-xl -mb-1.5 md:text-2xl text-[#be8f74] tracking-wide">
                            {category.title}
                          </h3>
                        </div>
                        <ul className="space-y-4 ml-4">
                          {category.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-4 text-base md:text-lg leading-relaxed group/item"
                            >
                              <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-[#be8f74]/10 flex items-center justify-center group-hover/item:bg-[#be8f74]/20 transition-colors duration-300">
                                <Check className="h-4 w-4 text-[#be8f74]" strokeWidth={3} />
                              </div>
                              <span className="text-[#004155]/90 text-pretty">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Decorative element bottom */}
        <div className="mt-16 text-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#be8f74]/40 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  )
}
