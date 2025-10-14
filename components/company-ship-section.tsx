'use client'

import { useScrollSnapManager } from "@/hooks/useScrollSnapManager"
import { useScreens } from "@/hooks/useScreens"
import { Company } from "./company"
import { Ship } from "./ship"

export function CompanyShipSection() {
  const { isBeforeLgScreen } = useScreens()

  // Высота хедера: 72px везде
  const headerHeight = 72
  const headerOffset = `${headerHeight}px`

  // Мобильные: 4 секции (внутренние div), Десктоп: 2 секции (section elements)
  const totalSections = isBeforeLgScreen ? 4 : 2
  const sectionSelector = isBeforeLgScreen
    ? "[data-snap-section-mobile='company-ship']"
    : "[data-snap-section-desktop='company-ship']"

  const { containerRef } = useScrollSnapManager({
    direction: "vertical",
    type: "mandatory",
    threshold: 0.01,
    rootMargin: "0px",
    sectionSelector: sectionSelector,
    totalSections: totalSections,
    headerOffset: headerOffset,
    debug: true,
  })

  return (
    <div ref={containerRef}>
      <Company />
      <div id="ship">
        <Ship />
      </div>
    </div>
  )
}
