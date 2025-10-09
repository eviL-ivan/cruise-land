"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { ChevronDown, MapPin, Anchor, Compass, Globe, Waves, Ship } from "lucide-react";

export function PremiumCruiseTimeline() {
  const { content } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const cruiseEvents = content.itinerary.days;

  // Create refs for each section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setCurrentStep(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [cruiseEvents]);

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-88px)] flex items-center justify-center overflow-hidden">
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
          {/* Animated Icons */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center gap-8 mb-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            >
              <Anchor className="w-8 h-8 text-primary/50" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <Compass className="w-8 h-8 text-secondary/50" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Globe className="w-8 h-8 text-accent/50" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8"
          >
            <span className="block text-foreground/80 text-2xl md:text-3xl font-light tracking-[0.3em] uppercase mb-4">
              Premium Expedition
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {content.itinerary.title}
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
          >
            {content.itinerary.subtitle}
          </motion.p>

          {/* Design Concept */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 max-w-4xl mx-auto relative"
          >
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-6xl text-primary/10 font-serif">"</div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-6xl text-primary/10 font-serif">"</div>
            <p className="text-base md:text-lg text-foreground/60 font-light tracking-wide italic">
              We go beyond the ordinary journey, each experience delving beneath the surface
              — past the visible tip of the iceberg —
              to reveal the essence of every destination
            </p>
          </motion.div>

          {/* Animated Waves */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 overflow-hidden h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              animate={{
                x: [0, -100, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Waves className="w-full h-32 text-primary/20" />
            </motion.div>
          </motion.div>

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
          ref={(el) => (sectionRefs.current[index] = el)}
          className="relative min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-88px)]"
        >
          <FullScreenItineraryCard
            event={event}
            index={index}
            isActive={currentStep === index}
            totalEvents={cruiseEvents.length}
          />
        </section>
      ))}

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-8"
          >
            <Ship className="w-16 h-16 mx-auto text-primary/50" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-serif font-light mb-6"
          >
            Ready to embark on this
            <span className="block text-4xl md:text-6xl font-normal bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-2">
              extraordinary journey?
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Join us for an unforgettable expedition beyond the ordinary
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}

interface FullScreenItineraryCardProps {
  event: any;
  index: number;
  isActive: boolean;
  totalEvents: number;
}

function FullScreenItineraryCard({
  event,
  index,
  isActive,
  totalEvents,
}: FullScreenItineraryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for variety
  const imageY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  // Alternate between left and right overlay
  const isLeftLayout = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[calc(100svh-80px)] md:h-[calc(100svh-88px)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover scale-110"
          sizes="100vw"
          priority={index < 2}
        />
      </motion.div>

      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ opacity: overlayOpacity }}
      >
        <div className={`absolute inset-0 ${
          isLeftLayout
            ? "bg-gradient-to-r from-black/90 via-black/50 to-transparent"
            : "bg-gradient-to-l from-black/90 via-black/50 to-transparent"
        }`} />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-20 h-full w-full"
        style={{ scale: contentScale }}
      >
        {isLeftLayout ? (
          <OverlayLeftLayout event={event} index={index} isInView={isInView} />
        ) : (
          <OverlayRightLayout event={event} index={index} isInView={isInView} />
        )}
      </motion.div>
    </motion.div>
  );
}

// Layout Components
function OverlayLeftLayout({ event, index, isInView }: any) {
  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0 w-full md:w-2/3 lg:w-1/2 h-full bg-gradient-to-r from-slate-900/95 via-slate-800/75 to-transparent">
        <div className="h-full flex items-center p-8 md:p-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white/60 text-sm font-light tracking-[0.3em] uppercase">
                {event.day}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white mt-4 mb-6">
                {event.title}
              </h2>
              <div className="flex items-center gap-2 text-white/80 mb-8">
                <MapPin className="w-4 h-4" />
                <span className="text-base">{event.location}</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-base leading-relaxed mb-8"
            >
              {event.description}
            </motion.p>

            {event.activities && event.activities.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className="text-white/60 text-sm uppercase tracking-wider mb-4">Activities</div>
                {event.activities.slice(0, 4).map((activity: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="flex items-center gap-3 text-white/80 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                    <span>{activity}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayRightLayout({ event, index, isInView }: any) {
  return (
    <div className="relative h-full">
      <div className="absolute right-0 top-0 w-full md:w-2/3 lg:w-1/2 h-full bg-gradient-to-l from-slate-900/95 via-slate-800/75 to-transparent">
        <div className="h-full flex items-center justify-end p-8 md:p-16">
          <div className="max-w-2xl text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white/60 text-sm font-light tracking-[0.3em] uppercase">
                {event.day}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white mt-4 mb-6">
                {event.title}
              </h2>
              <div className="flex items-center justify-end gap-2 text-white/80 mb-8">
                <span className="text-base">{event.location}</span>
                <MapPin className="w-4 h-4" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-base leading-relaxed mb-8"
            >
              {event.description}
            </motion.p>

            {event.activities && event.activities.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className="text-white/60 text-sm uppercase tracking-wider mb-4">Activities</div>
                {event.activities.slice(0, 4).map((activity: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="flex items-center justify-end gap-3 text-white/80 text-sm"
                  >
                    <span>{activity}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
