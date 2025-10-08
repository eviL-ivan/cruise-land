"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { useScreens } from "@/hooks/useScreens";

export function CruiseTimeline() {
  const { content } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const { isMdScreen } = useScreens();

  // RAF-based scroll handler for optimal performance
  useEffect(() => {
    // Skip scroll listener on mobile devices
    if (!isMdScreen) return;

    let rafId: number | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      // Cancel previous RAF if still pending
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Only update if scroll position actually changed
        if (currentScrollY !== lastScrollY) {
          lastScrollY = currentScrollY;
          setScrollY(currentScrollY);
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMdScreen]);

  const getCardTopPosition = (index: number) => {
    if (index === 0) return 0;

    let position = 0;
    for (let i = 1; i <= index; i++) {
      if (i % 2 === 1) {
        position += 250;
      } else {
        position += 400;
      }
    }
    return position;
  };

  const cruiseEvents = content.itinerary.days;

  // Рассчитываем реальную высоту блока на основе последней карточки
  const getTotalHeight = () => {
    if (cruiseEvents.length === 0) return 0;
    const lastCardPosition = getCardTopPosition(cruiseEvents.length - 1);
    const cardHeight = 450; // примерная высота карточки (изображение + контент)
    return lastCardPosition + cardHeight;
  };

  return (
    <div className="relative py-20 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 text-balance">
          {content.itinerary.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          {content.itinerary.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Desktop/Tablet version - absolute positioning */}
        <div
          className="hidden md:block relative"
          style={{ minHeight: `${getTotalHeight()}px` }}
        >
          {cruiseEvents.map((event, index) => {
            const isLeft = index % 2 === 0;

            const parallaxOffset = (scrollY - index * 400) * 0.05;

            const topPosition = getCardTopPosition(index);

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
                  className={`relative flex ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                  style={{
                    zIndex: 10,
                    transform: `translateY(${parallaxOffset}px) rotate(${
                      isLeft ? -1 : 1
                    }deg)`,
                    willChange: isMdScreen ? "transform" : "auto",
                  }}
                >
                  <Card className="w-full max-w-md overflow-hidden group hover:shadow-2xl transition-shadow duration-500 border-2 hover:scale-[1.02] hover:rotate-0 transition-transform">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        sizes="448px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="font-serif italic text-white text-base tracking-wide [text-shadow:_0_2px_8px_rgba(0,0,0,0.6),_0_0_6px_rgba(0,0,0,0.5),_1px_1px_4px_rgba(0,0,0,0.7)]">
                          {event.day}
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-3xl font-serif font-light text-white mb-1 text-balance [text-shadow:_0_2px_10px_rgba(0,0,0,0.7),_0_0_8px_rgba(0,0,0,0.5),_2px_2px_6px_rgba(0,0,0,0.8)]">
                          {event.title}
                        </h3>
                        <p className="text-sm text-white font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.6),_0_0_6px_rgba(0,0,0,0.5),_1px_1px_4px_rgba(0,0,0,0.7)]">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-card">
                      <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
                        {event.description}
                      </p>
                      {event.activities && (
                        <div className="space-y-2">
                          {event.activities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                              <span className="text-foreground/80 text-sm">
                                {activity}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile version - простой вертикальный список */}
        <div className="md:hidden flex flex-col gap-8">
          {cruiseEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden border-2 shadow-lg">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), 448px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="font-serif italic text-white text-base tracking-wide [text-shadow:_0_2px_8px_rgba(0,0,0,0.6),_0_0_6px_rgba(0,0,0,0.5),_1px_1px_4px_rgba(0,0,0,0.7)]">
                    {event.day}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-serif font-light text-white mb-1 text-balance [text-shadow:_0_2px_10px_rgba(0,0,0,0.7),_0_0_8px_rgba(0,0,0,0.5),_2px_2px_6px_rgba(0,0,0,0.8)]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.6),_0_0_6px_rgba(0,0,0,0.5),_1px_1px_4px_rgba(0,0,0,0.7)]">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-card">
                <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                  {event.description}
                </p>
                {event.activities && (
                  <div className="space-y-2">
                    {event.activities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-foreground/80 text-xs">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
