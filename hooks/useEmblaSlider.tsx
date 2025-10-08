'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaOptionsType } from 'embla-carousel'

interface UseEmblaSliderOptions {
  autoplay?: boolean
  autoplayDelay?: number
  stopOnInteraction?: boolean
  loop?: boolean
  align?: 'start' | 'center' | 'end'
  slidesToScroll?: number
  startIndex?: number
}

export function useEmblaSlider(options: UseEmblaSliderOptions = {}) {
  const {
    autoplay = false,
    autoplayDelay = 4000,
    stopOnInteraction = false,
    loop = true,
    align = 'start',
    slidesToScroll = 1,
    startIndex = 0,
  } = options

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Setup embla carousel options
  const emblaOptions: EmblaOptionsType = {
    loop,
    align,
    slidesToScroll,
    startIndex,
  }

  // Setup plugins
  const plugins = autoplay
    ? [Autoplay({ delay: autoplayDelay, stopOnInteraction })]
    : []

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins)

  // Update selected index on scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Initialize scroll snaps
  const onInit = useCallback(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [emblaApi])

  // Navigation methods
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()

    // Reset autoplay timer so it doesn't immediately switch after manual selection
    if (autoplay) {
      const autoplayPlugin = emblaApi.plugins()?.autoplay
      if (autoplayPlugin) {
        autoplayPlugin.reset()
      }
    }
  }, [emblaApi, autoplay])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()

    // Reset autoplay timer so it doesn't immediately switch after manual selection
    if (autoplay) {
      const autoplayPlugin = emblaApi.plugins()?.autoplay
      if (autoplayPlugin) {
        autoplayPlugin.reset()
      }
    }
  }, [emblaApi, autoplay])

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)

      // Reset autoplay timer so it doesn't immediately switch after manual selection
      if (autoplay) {
        const autoplayPlugin = emblaApi.plugins()?.autoplay
        if (autoplayPlugin) {
          autoplayPlugin.reset()
        }
      }
    },
    [emblaApi, autoplay]
  )

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        scrollNext()
      } else {
        scrollPrev()
      }
    }
  }, [scrollNext, scrollPrev])

  // Setup event listeners
  useEffect(() => {
    if (!emblaApi) return

    onInit()
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}
