"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface TimelineEvent {
  days: string
  title: string
  location: string
  description: string
  image: string
  highlights?: string[]
}

const cruiseEvents: TimelineEvent[] = [
  {
    days: "День 1-2",
    title: "Кейптаун",
    location: "Южная Африка",
    description: "Один из самых красивых мегаполисов мира и главный культурный центр Южной Африки",
    image: "/cape-town-table-mountain-sunset-cityscape.jpg",
    highlights: ["Мыс Доброй Надежды", "Столовая гора", "Набережная V&A Waterfront"],
  },
  {
    days: "День 3-4",
    title: "В море",
    location: "Атлантический океан",
    description: "Экспедиция через Атлантику на борту экспедиционного судна высокого ледового класса",
    image: "/atlantic-ocean-waves-expedition-ship-sailing.jpg",
    highlights: ["Лекции о полярных исследователях", "Наблюдение за китами", "Мастер-классы по фотографии"],
  },
  {
    days: "День 5",
    title: "Тристан-да-Кунья",
    location: "Самый отдаленный остров",
    description: "Самый отдаленный от других материков остров на Земле с уникальной природой",
    image: "/tristan-da-cunha-remote-island-volcanic-peaks-ocea.jpg",
    highlights: ["Встреча рассвета", "Северные хохлатые пингвины", "Морские львы"],
  },
  {
    days: "День 6-7",
    title: "В море",
    location: "Южный океан",
    description: "Погружение в воды Южного океана с температурой от -2°C до +10°C",
    image: "/southern-ocean-icebergs-albatross-flying-dramatic-.jpg",
    highlights: ["Странствующие альбатросы", "Пересечение 50-й параллели", "Полярные лекции"],
  },
  {
    days: "День 8-11",
    title: "Южная Георгия",
    location: "Субантарктика",
    description: "Мир, где дикая природа торжествует над временем и пространством",
    image: "/south-georgia-king-penguins-colony-mountains-glaci.jpg",
    highlights: ["Королевские пингвины", "Могила Шеклтона", "Заброшенные китобойные станции"],
  },
  {
    days: "День 12-13",
    title: "В море",
    location: "Южный океан",
    description: "Продолжение экспедиции к самому холодному материку планеты",
    image: "/antarctic-waters-icebergs-seals-expedition-ship.jpg",
    highlights: ["Айсберги", "Морские котики", "Подготовка к Антарктиде"],
  },
  {
    days: "День 14-17",
    title: "Антарктический полуостров",
    location: "Антарктида",
    description: "Самый труднодоступный и последний открытый континент планеты",
    image: "/antarctica-peninsula-glaciers-penguins-pristine-ic.jpg",
    highlights: ["5 видов пингвинов", "Круизы на Зодиаках", "Высадки на континент"],
  },
  {
    days: "День 18-19",
    title: "Пролив Дрейка",
    location: "Возвращение",
    description: "Пересечение легендарного пролива Дрейка на пути к Южной Америке",
    image: "/drake-passage-rough-seas-albatross-dramatic-ocean.jpg",
    highlights: ["Прощание с Антарктидой", "Подведение итогов", "Сертификаты участников"],
  },
  {
    days: "День 20-21",
    title: "Ушуайя",
    location: "Аргентина",
    description: "Самый южный город мира - завершение великой экспедиции",
    image: "/ushuaia-argentina-harbor-mountains-end-of-world-ci.jpg",
    highlights: ["Высадка в порту", "Город на краю света", "Завершение круиза"],
  },
]

export function CruiseTimeline() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getCardTopPosition = (index: number) => {
    if (index === 0) return 0

    let position = 0
    for (let i = 1; i <= index; i++) {
      if (i % 2 === 1) {
        position += 180
      } else {
        position += 360 + 50
      }
    }
    return position
  }

  return (
    <div className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 text-balance">Антарктическая экспедиция</h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Путешествие через 3 континента и 2 океана на борту SH Diana
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Desktop version - absolute positioning */}
        <div className="hidden md:block relative" style={{ minHeight: `${cruiseEvents.length * 280}px` }}>
          {/* SVG с пунктирными линиями между карточками */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
            viewBox="0 0 1000 3000"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <marker id="hand-drawn-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 L 2 5 Z" fill="hsl(var(--primary))" opacity="0.5" />
              </marker>
            </defs>
            {cruiseEvents.slice(0, -1).map((_, index) => {
              const isCurrentLeft = index % 2 === 0
              const currentTop = getCardTopPosition(index) + 180
              const nextTop = getCardTopPosition(index + 1) + 180

              // Абсолютные координаты для более надежной отрисовки
              const startX = isCurrentLeft ? 650 : 350
              const endX = isCurrentLeft ? 350 : 650

              const midY = (currentTop + nextTop) / 2
              const controlX1 = isCurrentLeft ? 580 : 420
              const controlX2 = isCurrentLeft ? 420 : 580

              return (
                <path
                  key={index}
                  d={`M ${startX} ${currentTop} C ${controlX1} ${currentTop + 50}, ${controlX2} ${nextTop - 50}, ${endX} ${nextTop}`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.5"
                  markerEnd="url(#hand-drawn-arrow)"
                />
              )
            })}
          </svg>

          {cruiseEvents.map((event, index) => {
            const isLeft = index % 2 === 0

            const parallaxOffset = (scrollY - index * 400) * 0.05

            const topPosition = getCardTopPosition(index)

            return (
              <div
                key={index}
                className="absolute w-full"
                style={{
                  top: `${topPosition}px`,
                  zIndex: cruiseEvents.length - index + 10,
                }}
              >
                {/* Card */}
                <div
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                  style={{
                    zIndex: 10,
                    transform: `translateY(${parallaxOffset}px) rotate(${isLeft ? -1 : 1}deg)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <Card className="w-full max-w-md overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:scale-[1.02] hover:rotate-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute top-6 left-6">
                        <div className="font-serif italic text-white/90 text-lg tracking-wide">{event.days}</div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-4xl font-serif font-light text-white mb-2 text-balance">{event.title}</h3>
                        <p className="text-base text-white/95 font-medium">{event.location}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-card">
                      <p className="text-muted-foreground leading-relaxed mb-4 text-base">{event.description}</p>
                      {event.highlights && (
                        <div className="space-y-2">
                          {event.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                              <span className="text-foreground/80 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile version - простой flex layout для мобильных */}
        <div className="md:hidden flex flex-col gap-8">
          {cruiseEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden border-2 shadow-lg">
              <div className="relative h-56 overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div className="font-serif italic text-white/90 text-base tracking-wide">{event.days}</div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-serif font-light text-white mb-1 text-balance">{event.title}</h3>
                  <p className="text-sm text-white/95 font-medium">{event.location}</p>
                </div>
              </div>

              <div className="p-5 bg-card">
                <p className="text-muted-foreground leading-relaxed mb-3 text-sm">{event.description}</p>
                {event.highlights && (
                  <div className="space-y-2">
                    {event.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-foreground/80 text-xs">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center mt-32 md:mt-64">
        <div className="inline-block p-8 bg-card rounded-2xl border-2 shadow-xl">
          <h2 className="text-3xl font-serif font-light mb-3">SH Diana</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Бутик-отель на воде с открытым бассейном-инфинити, ресторанами высокой кухни и просторными каютами с
            панорамными балконами
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-muted rounded-full">
              <span className="font-medium">Каюты с балконом</span> • 25 м²
            </div>
            <div className="px-4 py-2 bg-muted rounded-full">
              <span className="font-medium">Сьюты</span> • 41 м²
            </div>
            <div className="px-4 py-2 bg-muted rounded-full">
              <span className="font-medium">Премиум сьюты</span> • 41 м²
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
