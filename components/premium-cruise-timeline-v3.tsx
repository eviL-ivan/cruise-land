"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
  useAnimation
} from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  MapPin,
  Activity,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export function PremiumCruiseTimelineV3() {
  const { content } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cruiseEvents = content.itinerary.days;

  return (
    <div ref={containerRef} className="relative bg-[#fefdfb]">
      {/* Organic Background Pattern */}
      <div className="fixed inset-0 overflow-hidden opacity-30 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <filter id="organic">
              <feTurbulence baseFrequency="0.02" numOctaves="3" seed="1" />
              <feColorMatrix values="0 0 0 0 0.98 0 0 0 0 0.97 0 0 0 0 0.95 0 0 0 0.08 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#organic)" />
        </svg>
      </div>

      {/* Minimal Hero */}
      <section className="relative min-h-[60vh] flex items-center px-8 md:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-8">
              <motion.div
                className="w-2 h-2 bg-[#72d7a0] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs tracking-[0.3em] uppercase text-[#72d7a0] font-medium">
                Now booking
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.8] mb-8">
              <span className="font-thin">I design & build</span>
              <br />
              <span className="font-normal">journeys that</span>
              <span className="block mt-4 bg-gradient-to-r from-[#72d7a0] via-[#6ec9d4] to-[#8b9dc3] bg-clip-text text-transparent font-thin italic">
                inspire
              </span>
            </h1>

            <div className="flex gap-8 mt-12">
              <motion.button
                className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-sm tracking-wider"
                whileHover={{ scale: 1.05, backgroundColor: "#2a2a2a" }}
                whileTap={{ scale: 0.95 }}
              >
                Book a call
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-[#1a1a1a]/20 rounded-full text-sm tracking-wider"
                whileHover={{ borderColor: "#1a1a1a", backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                View projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Liquid Timeline */}
      <section className="relative py-32">
        <LiquidTimeline
          events={cruiseEvents}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </section>

      {/* Floating Detail Panel */}
      <AnimatePresence>
        {activeIndex !== null && (
          <FloatingPanel
            event={cruiseEvents[activeIndex]}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Liquid morphing timeline
function LiquidTimeline({ events, activeIndex, setActiveIndex }: any) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative max-w-[1600px] mx-auto px-8 md:px-16">
      {/* Organic connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
            />
          </filter>
        </defs>

        {/* Draw organic connections between cards */}
        {events.map((_: any, i: number) => {
          if (i === events.length - 1) return null;
          const x1 = ((i % 3) * 33.33) + 16.66;
          const y1 = Math.floor(i / 3) * 400 + 200;
          const x2 = (((i + 1) % 3) * 33.33) + 16.66;
          const y2 = Math.floor((i + 1) / 3) * 400 + 200;

          return (
            <motion.path
              key={i}
              d={`M ${x1}% ${y1} Q ${(x1 + x2) / 2}% ${(y1 + y2) / 2 + 50} ${x2}% ${y2}`}
              stroke="rgba(114, 215, 160, 0.1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
              filter="url(#goo)"
            />
          );
        })}
      </svg>

      {/* Timeline Items */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
        {events.map((event: any, index: number) => (
          <LiquidCard
            key={index}
            event={event}
            index={index}
            isActive={activeIndex === index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

// Individual liquid card with morphing effects
function LiquidCard({ event, index, isActive, isHovered, onHover, onLeave, onClick }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Liquid morph effect on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const liquidX = useTransform(mouseX, [0, 1], [-20, 20]);
  const liquidY = useTransform(mouseY, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      animate={controls}
    >
      {/* Morphing blob background */}
      <motion.div
        className="absolute -inset-4 -z-10"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#72d7a0" />
              <stop offset="100%" stopColor="#8b9dc3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M40,100 Q60,40 100,40 T160,100 Q140,160 100,160 T40,100"
            fill={`url(#gradient-${index})`}
            fillOpacity="0.2"
            style={{
              x: liquidX,
              y: liquidY,
            }}
          />
        </svg>
      </motion.div>

      {/* Main content container */}
      <div className="relative">
        {/* Minimal image treatment */}
        <div className="relative h-[400px] overflow-hidden rounded-[2rem] bg-white">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover mix-blend-multiply opacity-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

          {/* Floating day number */}
          <motion.div
            className="absolute top-8 left-8 text-[120px] font-serif font-thin leading-none text-[#1a1a1a]/10"
            animate={{
              x: isHovered ? 10 : 0,
              y: isHovered ? -10 : 0,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>

          {/* Content overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8"
            animate={{
              y: isHovered ? -10 : 0,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-1 bg-[#72d7a0] rounded-full" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#6d6e71]">
                {event.day}
              </span>
            </div>

            <h3 className="text-3xl font-serif mb-2">
              {event.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-[#6d6e71]">
              <MapPin className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
          </motion.div>
        </div>

        {/* Minimal CTA */}
        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-sm text-[#6d6e71]">
            {event.activities?.length || 0} experiences
          </span>
          <motion.button
            className="flex items-center gap-1 text-sm font-medium"
            whileHover={{ x: 5 }}
          >
            <span>Explore</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Floating detail panel
function FloatingPanel({ event, index, onClose }: any) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Image side with organic mask */}
          <div className="relative">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
          </div>

          {/* Content side */}
          <div className="p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#72d7a0]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#72d7a0] font-medium">
                {event.day}
              </span>
            </div>

            <h2 className="text-5xl font-serif mb-4">
              {event.title}
            </h2>

            <div className="flex items-center gap-2 text-sm text-[#6d6e71] mb-8">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>

            <p className="text-[#6d6e71] leading-relaxed mb-8">
              {event.description}
            </p>

            {/* Activities */}
            <div className="space-y-3 mb-8">
              {event.activities?.map((activity: string, i: number) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#72d7a0]/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#72d7a0]" />
                  </div>
                  <span className="text-sm">{activity}</span>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve this day
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-[#1a1a1a]/20 rounded-full text-sm tracking-wider"
                onClick={onClose}
                whileHover={{ borderColor: "#1a1a1a" }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>

        {/* Decorative blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-[#72d7a0]/20 to-[#8b9dc3]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}