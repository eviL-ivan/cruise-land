"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollSnapOptions {
  // Направление снэпа: вертикальный или горизонтальный
  direction?: "vertical" | "horizontal";
  // Строгость снэпа: обязательный или приближенный
  type?: "mandatory" | "proximity";
  // Порог видимости для активации (0-1)
  threshold?: number;
  // Отступ от viewport для определения видимости
  rootMargin?: string;
  // CSS селектор для элементов, к которым применяется snap
  sectionSelector?: string;
  // Общее количество секций (для определения границ)
  totalSections?: number;
  // Включить ли отладочный режим
  debug?: boolean;
}

export function useScrollSnapManager(options: ScrollSnapOptions = {}) {
  const {
    direction = "vertical",
    type = "mandatory",
    threshold = 0.1,
    rootMargin = "0px",
    sectionSelector = "[data-snap-section]",
    totalSections = 0,
    debug = false,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isSnapActive, setIsSnapActive] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(-1);
  const previousScrollSnapType = useRef<string>("");
  const previousScrollBehavior = useRef<string>("");
  const currentSnapType = useRef<"mandatory" | "proximity">(type);

  // Функция для обновления типа snap (вынесем из useEffect)
  const updateScrollSnapType = useCallback((newType: "mandatory" | "proximity") => {
    const htmlElement = document.documentElement;
    const snapDirection = direction === "vertical" ? "y" : "x";
    const newValue = `${snapDirection} ${newType}`;

    // Используем setProperty с important для гарантии применения
    htmlElement.style.setProperty("scroll-snap-type", newValue, "important");

    // if (debug) {
    //   console.log(`🔁 Updated scroll-snap-type to: ${newValue}`);
    //   console.log(`🔁 Actual HTML value: ${htmlElement.style.scrollSnapType}`);
    //   console.log(`🔁 Computed style: ${window.getComputedStyle(htmlElement).scrollSnapType}`);
    // }
  }, [direction, debug]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Сохраняем текущие значения для восстановления
    const htmlElement = document.documentElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    previousScrollSnapType.current = computedStyle.scrollSnapType || "none";
    previousScrollBehavior.current = computedStyle.scrollBehavior || "auto";

    // if (debug) {
    //   console.log("📌 useScrollSnapManager initialized");
    //   console.log("Container ref:", containerRef.current);
    // }

    // Создаём observer для контейнера
    const containerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // if (debug) {
          //   console.log("👁 Container visibility changed:", {
          //     isIntersecting: entry.isIntersecting,
          //     intersectionRatio: entry.intersectionRatio,
          //     target: entry.target
          //   });
          // }

          if (entry.isIntersecting) {
            // if (debug) console.log("🎯 Scroll snap container entered viewport");
            setIsSnapActive(true);
            enableScrollSnap();
          } else {
            // if (debug) console.log("👋 Scroll snap container left viewport");
            setIsSnapActive(false);
            disableScrollSnap();
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    // Создаём observer для секций (для отслеживания текущей секции)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleCount = entries.filter((e) => e.isIntersecting).length;
        setVisibleSections(visibleCount);

        // Находим наиболее видимую секцию
        let mostVisibleEntry = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry) {
          const target = mostVisibleEntry.target as HTMLElement;
          const sectionIndex = parseInt(target.dataset.sectionIndex || "-1");

          if (sectionIndex !== -1) {
            setCurrentSectionIndex(sectionIndex);

            // Определяем тип snap в зависимости от позиции
            const isFirstSection = sectionIndex === 0;
            const isLastSection = totalSections > 0 && sectionIndex === totalSections - 1;

            const newSnapType = (isFirstSection || isLastSection) ? "proximity" : "mandatory";

            if (currentSnapType.current !== newSnapType) {
              currentSnapType.current = newSnapType;

              // if (debug) {
              //   console.log(`🔄 Switching snap type to ${newSnapType} for section ${sectionIndex}`);
              // }

              // Применяем новый тип snap напрямую, если контейнер активен
              const htmlElement = document.documentElement;
              if (htmlElement.classList.contains("scroll-snap-active")) {
                // Обновляем немедленно
                updateScrollSnapType(newSnapType);

                // И еще раз в следующем цикле event loop для гарантии
                setTimeout(() => {
                  if (htmlElement.classList.contains("scroll-snap-active")) {
                    updateScrollSnapType(newSnapType);
                  }
                }, 0);
              }
            }
          }
        }

        // if (debug && mostVisibleEntry) {
        //   console.log(`📍 Most visible section:`, mostVisibleEntry.target);
        // }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.3, 0.5, 0.7, 1],
      }
    );

    // Функции для управления scroll-snap
    function enableScrollSnap() {
      const htmlElement = document.documentElement;
      const snapDirection = direction === "vertical" ? "y" : "x";

      // Используем текущий тип snap, который уже должен быть установлен правильно
      const snapTypeToUse = currentSnapType.current || type;

      // Применяем scroll-snap-type к html элементу с текущим типом (с important)
      htmlElement.style.setProperty("scroll-snap-type", `${snapDirection} ${snapTypeToUse}`, "important");
      htmlElement.style.scrollBehavior = "smooth";

      // Добавляем класс для CSS
      htmlElement.classList.add("scroll-snap-active");
      if (direction === "horizontal") {
        htmlElement.classList.add("scroll-snap-horizontal");
      }

      // Применяем scroll-snap-align к секциям
      const sections = document.querySelectorAll(sectionSelector);
      sections.forEach((section) => {
        (section as HTMLElement).style.scrollSnapAlign = "start";
        (section as HTMLElement).style.scrollSnapStop = "always";
      });

      // if (debug) {
      //   console.log(`✅ Scroll snap enabled: ${snapDirection} ${snapTypeToUse}`);
      // }
    }

    function disableScrollSnap() {
      const htmlElement = document.documentElement;

      // Удаляем inline стили полностью для чистоты
      htmlElement.style.removeProperty("scroll-snap-type");
      htmlElement.style.scrollBehavior = previousScrollBehavior.current || "auto";

      // Удаляем классы
      htmlElement.classList.remove("scroll-snap-active", "scroll-snap-horizontal");

      // Удаляем scroll-snap-align с секций
      const sections = document.querySelectorAll(sectionSelector);
      sections.forEach((section) => {
        (section as HTMLElement).style.scrollSnapAlign = "";
        (section as HTMLElement).style.scrollSnapStop = "";
      });

      // if (debug) {
      //   console.log("❌ Scroll snap disabled");
      // }
    }

    // Начинаем наблюдение
    if (containerRef.current) {
      containerObserver.observe(containerRef.current);

      // Наблюдаем за секциями и добавляем индексы если их нет
      const sections = containerRef.current.querySelectorAll(sectionSelector);
      sections.forEach((section, index) => {
        // Добавляем индекс к секции если его нет
        if (!(section as HTMLElement).dataset.sectionIndex) {
          (section as HTMLElement).dataset.sectionIndex = index.toString();
        }
        sectionObserver.observe(section);

        // Проверяем если эта секция уже видима при инициализации
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && rect.top <= window.innerHeight / 2) {
          // Установим правильный начальный тип для видимой секции
          const isFirst = index === 0;
          const isLast = totalSections > 0 && index === totalSections - 1;
          currentSnapType.current = (isFirst || isLast) ? "proximity" : "mandatory";

          // if (debug) {
          //   console.log(`🎯 Initial visible section: ${index}, snap type: ${currentSnapType.current}`);
          // }
        }
      });
    }

    // Cleanup
    return () => {
      containerObserver.disconnect();
      sectionObserver.disconnect();
      disableScrollSnap();
    };
  }, [direction, type, threshold, rootMargin, sectionSelector, totalSections, debug, updateScrollSnapType]);

  return {
    containerRef,
    isSnapActive,
    visibleSections,
    currentSectionIndex,
  };
}