"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
  MotionValue
} from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Activity,
  Sparkles,
  ArrowRight,
  Circle,
  Plus
} from "lucide-react";

// Floating Orb Component
function FloatingOrb({ mouseX, mouseY }: { mouseX: MotionValue; mouseY: MotionValue }) {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="absolute w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(190,143,116,0.1) 0%, transparent 70%)",
        x: useTransform(mouseX, [0, windowSize.width], [-100, 100]),
        y: useTransform(mouseY, [0, windowSize.height], [-100, 100]),
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function PremiumCruiseTimelineV2() {
  const { content } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cruiseEvents = content.itinerary.days;

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white via-[#f8f6f4] to-white">

      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingHero content={content} />
      </section>

      {/* Timeline Grid */}
      <section className="relative py-32 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <TimelineGrid
            events={cruiseEvents}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
      </section>

      {/* Floating Detail View */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <FloatingDetail
            event={cruiseEvents[hoveredIndex]}
            index={hoveredIndex}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Hero Component with floating elements
function FloatingHero({ content }: { content: any }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <div className="relative z-10 text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        {/* Floating badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-[#be8f74]/20 shadow-2xl"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-4 h-4 text-[#be8f74]" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#be8f74]">
            Premium Expedition
          </span>
        </motion.div>
      </motion.div>

      <div ref={titleRef}>
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-light mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block relative">
            <span className="relative z-10 bg-gradient-to-r from-[#004155] via-[#be8f74] to-[#004155] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {content.itinerary.title}
            </span>
            {/* Blur duplicate for depth */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#004155] via-[#be8f74] to-[#004155] bg-clip-text text-transparent blur-2xl opacity-50">
              {content.itinerary.title}
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-[#6d6e71] font-light max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {content.itinerary.subtitle}
        </motion.p>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full border-2 border-[#be8f74]/10 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

// Timeline Grid Component
function TimelineGrid({
  events,
  currentIndex,
  setCurrentIndex,
  hoveredIndex,
  setHoveredIndex,
  mouseX,
  mouseY
}: any) {
  return (
    <div className="relative">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be8f74" stopOpacity="0" />
            <stop offset="50%" stopColor="#be8f74" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#be8f74" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {events.map((event: any, index: number) => (
          <TimelineCard
            key={index}
            event={event}
            index={index}
            isActive={currentIndex === index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => setCurrentIndex(index)}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>
    </div>
  );
}

// Individual Timeline Card
function TimelineCard({
  event,
  index,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
  mouseX,
  mouseY
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = mouseX.get() - rect.left - rect.width / 2;
    const y = mouseY.get() - rect.top - rect.height / 2;
    setLocalMousePos({ x, y });
  }, [mouseX, mouseY, isHovered]);

  const rotateX = useSpring(useTransform(
    useMotionValue(localMousePos.y),
    [-200, 200],
    [10, -10]
  ));

  const rotateY = useSpring(useTransform(
    useMotionValue(localMousePos.x),
    [-200, 200],
    [-10, 10]
  ));

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
    >
      {/* Card Background */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white border border-[#e8e6e5] shadow-lg"
        animate={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(190,143,116,0.2)"
            : "0 10px 25px -5px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Day Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md"
            animate={{
              y: isHovered ? -5 : 0,
            }}
          >
            <span className="text-xs font-medium tracking-wider text-[#004155]">
              {event.day}
            </span>
          </motion.div>

          {/* Number Overlay */}
          <motion.div
            className="absolute bottom-4 right-4 text-6xl font-serif font-light text-white/20"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.4 : 0.2,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-serif font-light text-[#004155] mb-2">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-[#6d6e71] mb-4">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>

          <p className="text-sm text-[#6d6e71]/80 line-clamp-3 mb-4">
            {event.description}
          </p>

          {/* Activities Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.activities?.slice(0, 2).map((activity: string, i: number) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-[#f8f6f4] text-[#6d6e71] rounded-full"
              >
                {activity.split(' ').slice(0, 2).join(' ')}...
              </span>
            ))}
            {event.activities?.length > 2 && (
              <span className="px-2 py-1 text-xs bg-[#be8f74]/10 text-[#be8f74] rounded-full">
                +{event.activities.length - 2} more
              </span>
            )}
          </div>

          {/* Explore Button */}
          <motion.button
            className="w-full py-3 rounded-full border border-[#004155]/20 text-[#004155] text-sm font-medium tracking-wider flex items-center justify-center gap-2 group/btn"
            whileHover={{ backgroundColor: "rgba(0,65,85,0.05)" }}
          >
            <span>Explore Day {index + 1}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>

      {/* 3D Shadow */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-20 bg-gradient-to-t from-black/5 to-transparent rounded-3xl blur-2xl"
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.05 : 1,
        }}
      />
    </motion.div>
  );
}

// Floating Detail View
function FloatingDetail({ event, index, mouseX, mouseY }: any) {
  const detailRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={detailRef}
      className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
      animate={{
        opacity: 1,
        scale: 1,
        x: "-50%",
        y: "-50%",
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Blurred background card */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl" />

        {/* Content */}
        <div className="relative p-8 max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Circle className="w-3 h-3 text-[#be8f74]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#be8f74]">
              Quick Preview
            </span>
          </div>

          <h4 className="text-2xl font-serif font-light text-[#004155] mb-2">
            {event.title}
          </h4>

          <p className="text-sm text-[#6d6e71] mb-4">
            {event.location}
          </p>

          <div className="space-y-2">
            {event.activities?.slice(0, 3).map((activity: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#6d6e71]/80">
                <Plus className="w-3 h-3" />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#be8f74]/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-tr from-[#004155]/10 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
}