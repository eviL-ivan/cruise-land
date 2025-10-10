"use client";

import { useEffect, useState, useRef, memo } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useScrollSnapManager } from "@/hooks/useScrollSnapManager";
import { ChevronDown, MapPin } from "lucide-react";
import {useScreens} from "@/hooks/useScreens";

export function OptimizedCruiseTimeline() {
  const { content } = useLanguage();

  const cruiseEvents = content.itinerary.days;
  const totalSections = cruiseEvents.length + 1; // +1 for hero section

    const { isBeforeMdScreen } = useScreens();
// Определяем высоту хедера: 80px на мобильных, 88px на десктопе
    const headerHeight = isBeforeMdScreen ? 80 : 88;
    const headerOffset = `${headerHeight}px`;

  // Используем хук для управления scroll-snap
  const { containerRef, isSnapActive, currentSectionIndex } = useScrollSnapManager({
    direction: "vertical",
    type: "mandatory", // Базовый тип - будет меняться динамически
    threshold: 0.01, // Снижаем порог для более раннего срабатывания
    rootMargin: "0px", // Убираем отступы для упрощения
    sectionSelector: "[data-snap-section='cruise-day']",
    totalSections: totalSections,
      headerOffset: headerOffset,
    debug: true, // Отключаем отладку в финальной версии
  });

  // Определяем тип snap для текущей секции
  // const isFirstSection = currentSectionIndex === 0;
  // const isLastSection = currentSectionIndex === totalSections - 1;
  // const currentSnapType = (isFirstSection || isLastSection) ? 'proximity' : 'mandatory';

  return (
    <div ref={containerRef} className="relative">
      {/*/!* Индикатор активного snap режима - только в dev режиме *!/*/}
      {/*{process.env.NODE_ENV === 'development' && (*/}
      {/*  <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-xs font-medium backdrop-blur-sm transition-all space-y-1 ${*/}
      {/*    isSnapActive*/}
      {/*      ? 'bg-green-500/80 text-white'*/}
      {/*      : 'bg-red-500/80 text-white'*/}
      {/*  }`}>*/}
      {/*    <div>Snap: {isSnapActive ? 'Active' : 'Inactive'}</div>*/}
      {/*    <div>Section: {currentSectionIndex + 1}/{totalSections}</div>*/}
      {/*    <div>Type: {currentSnapType}</div>*/}
      {/*    <div className="text-[10px] opacity-80">*/}
      {/*      {isFirstSection && '(First - can scroll up)'}*/}
      {/*      {isLastSection && '(Last - can scroll down)'}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      {/* Hero Section */}
      <section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        data-snap-section="cruise-day"
        data-section-index="0"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10 max-w-7xl mx-auto px-4 md:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance"
          >
            {content.itinerary.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
          >
            {content.itinerary.subtitle}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground/50 mx-auto" />
              <span className="text-xs text-muted-foreground/50 mt-2 block">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Itinerary Sections */}
      {cruiseEvents.map((event, index) => (
        <section
          key={index}
          className="relative min-h-[100svh]"
          data-snap-section="cruise-day"
          data-section-index={index + 1}
        >
          <FullScreenItineraryCard
            event={event}
            index={index}
          />
        </section>
      ))}
    </div>
  );
}

interface FullScreenItineraryCardProps {
  event: any;
  index: number;
}

const FullScreenItineraryCard = memo(function FullScreenItineraryCard({
  event,
  index,
}: FullScreenItineraryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Alternate between left and right overlay
  const isLeftLayout = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[100svh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image - Static */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index < 2}
          loading={index > 2 ? "lazy" : undefined}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 h-full w-full">
        {isLeftLayout ? (
          <OverlayLeftLayout event={event} index={index} isInView={isInView} />
        ) : (
          <OverlayRightLayout event={event} index={index} isInView={isInView} />
        )}
      </div>
    </motion.div>
  );
});

// Layout Components
const OverlayLeftLayout = memo(function OverlayLeftLayout({ event, index, isInView }: any) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasVerticalOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [event]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 5;
    setIsScrolledToBottom(isAtBottom);
  };

  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0 w-full md:w-3/4 lg:w-3/5 h-full bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-transparent">
        <div className="h-full flex items-center p-8 md:pr-6 md:p-16">
          <div className="relative max-w-2xl">
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="max-h-[calc(100svh-160px)] md:max-h-[calc(100svh-200px)] overflow-y-auto overflow-x-hidden pr-6 scrollbar-custom"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white/60 text-xs md:text-sm font-light tracking-[0.3em] uppercase">
                  {event.day}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mt-3 mb-4 md:mb-6">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-white/80 mb-6 md:mb-8">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm md:text-base">{event.location}</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-8"
              >
                {event.description}
              </motion.p>

              {event.activities && event.activities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 0.6 }}
                  className="pb-4"
                >
                  <div className="text-white/60 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Activities</div>
                  <div className="space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2">
                    {event.activities.map((activity: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className="flex items-start gap-3 text-white/80 text-xs md:text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 mt-1.5" />
                        <span>{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Scroll Indicator - Right Side */}
          {hasOverflow && !isScrolledToBottom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 0.6 : 0 }}
              transition={{ delay: 1.5 }}
              className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            >
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-white/60" />
              </motion.div>
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
});

const OverlayRightLayout = memo(function OverlayRightLayout({ event, index, isInView }: any) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasVerticalOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [event]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 5;
    setIsScrolledToBottom(isAtBottom);
  };

  return (
    <div className="relative h-full">
      <div className="absolute right-0 top-0 w-full md:w-3/4 lg:w-3/5 h-full bg-gradient-to-l from-slate-900/70 via-slate-900/40 to-transparent">
        <div className="h-full flex items-center justify-end p-8 pr-4 md:pr-4 md:pl-6 md:p-16">
          {/* Scroll Indicator - Left Side */}
          {hasOverflow && !isScrolledToBottom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 0.6 : 0 }}
              transition={{ delay: 1.5 }}
              className="absolute left-1 md:left-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            >
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-white/60" />
              </motion.div>
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          )}

          <div className="relative max-w-2xl">
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="max-h-[calc(100svh-160px)] md:max-h-[calc(100svh-200px)] overflow-y-auto overflow-x-hidden px-3 scrollbar-custom text-right"
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white/60 text-xs md:text-sm font-light tracking-[0.3em] uppercase">
                  {event.day}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mt-3 mb-4 md:mb-6">
                  {event.title}
                </h2>
                <div className="flex items-center justify-end gap-2 text-white/80 mb-6 md:mb-8">
                  <span className="text-sm md:text-base">{event.location}</span>
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-8"
              >
                {event.description}
              </motion.p>

              {event.activities && event.activities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 0.6 }}
                  className="pb-4"
                >
                  <div className="text-white/60 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 text-right">Activities</div>
                  <div className="space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2">
                    {event.activities.map((activity: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className="flex items-start justify-end gap-3 text-white/80 text-xs md:text-sm"
                      >
                        <span className="text-right">{activity}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 mt-1.5" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
