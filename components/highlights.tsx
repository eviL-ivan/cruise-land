"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export function Highlights() {
  const { content } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.highlights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, content.highlights.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.highlights.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + content.highlights.length) % content.highlights.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto relative">
          {/* Slider Container */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {content.highlights.map((highlight, index) => (
                <div key={index} className="min-w-full relative">
                  <div className="relative h-[500px] md:h-[600px]">
                    <Image
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                      <div className="max-w-3xl">
                        {/* <div className="inline-block px-4 py-2 bg-accent/90 rounded-full text-accent-foreground font-bold mb-4">
                          {highlight.number}
                        </div> */}
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                          {highlight.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed text-pretty">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {content.highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-secondary"
                    : "w-2 bg-secondary/30 hover:bg-secondary/50"
                }`}
                aria-label={`${content.ui.slideLabel} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
