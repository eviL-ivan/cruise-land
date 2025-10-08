"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  ROUTE_WAYPOINTS,
  MARKER_POINTS,
  MAP_CONFIG,
  FOG_CONFIG,
} from "./constants";
import { MapLoadState } from "./types";
import MapControls from "./MapControls";
import { MapPopup } from "./MapPopup";
import { useLanguage } from "@/lib/language-context";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Catmull-Rom сплайн для плавной линии (оптимизированный)
const createSmoothCurve = (points: number[][]): number[][] => {
  const smoothPoints: number[][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    smoothPoints.push(p1);

    // Уменьшено с 0.02 до 0.1 для уменьшения количества точек (в 5 раз меньше)
    for (let t = 0.1; t < 1; t += 0.1) {
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

      const y =
        0.5 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

      smoothPoints.push([x, y]);
    }
  }

  smoothPoints.push(points[points.length - 1]);
  return smoothPoints;
};

export default function AntarcticaMap() {
  const { content } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isMarkerClickRef = useRef(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const isMapVisibleRef = useRef(false);
  const hoveredMarkerIdRef = useRef<string | null>(null);
  const [loadState, setLoadState] = useState<MapLoadState>({
    isLoading: true,
    error: null,
  });
  const [selectedMarker, setSelectedMarker] = useState<{
    name: string;
    description: string;
    image?: string;
    x: number;
    y: number;
    coordinates: [number, number];
  } | null>(null);

  // Update popup position when map moves
  useEffect(() => {
    if (!map.current || !selectedMarker) return;

    const updatePopupPosition = () => {
      if (!map.current || !selectedMarker) return;
      const point = map.current.project(selectedMarker.coordinates);
      setSelectedMarker((prev) =>
        prev ? { ...prev, x: point.x, y: point.y } : null
      );
    };

    map.current.on("move", updatePopupPosition);
    map.current.on("zoom", updatePopupPosition);

    return () => {
      if (map.current) {
        map.current.off("move", updatePopupPosition);
        map.current.off("zoom", updatePopupPosition);
      }
    };
  }, [selectedMarker?.coordinates]);

  // Close popup on click outside
  useEffect(() => {
    if (!selectedMarker) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Skip if this was a marker click
      if (isMarkerClickRef.current) {
        isMarkerClickRef.current = false;
        return;
      }

      const target = e.target as HTMLElement;
      // Check if click is outside popup
      if (!target.closest(".map-popup-content")) {
        setSelectedMarker(null);
      }
    };

    // Add slight delay to prevent immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMarker]);

  // Intersection Observer для отслеживания видимости карты
  useEffect(() => {
    if (!mapContainer.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isMapVisibleRef.current;
          isMapVisibleRef.current = entry.isIntersecting;

          // Если карта стала невидимой, остановить анимацию
          if (!entry.isIntersecting && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          // Если карта стала видимой и не было взаимодействия, перезапустить анимацию
          else if (entry.isIntersecting && !wasVisible && !isUserInteractingRef.current) {
            if (idleTimeoutRef.current) {
              clearTimeout(idleTimeoutRef.current);
            }
            idleTimeoutRef.current = setTimeout(() => {
              if (!isUserInteractingRef.current && isMapVisibleRef.current) {
                // Перезапустить анимацию покачивания
                if (animationFrameRef.current) {
                  cancelAnimationFrame(animationFrameRef.current);
                }
                // Эта функция будет доступна после загрузки карты
                const startIdleAnimation = (window as any).__mapStartIdleAnimation;
                if (startIdleAnimation) startIdleAnimation();
              }
            }, 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(mapContainer.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Проверяем что контейнер существует и карта еще не создана
    if (!mapContainer.current || map.current) return;

    // Устанавливаем начальное состояние видимости
    isMapVisibleRef.current = true;

    try {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZXZpbGl2IiwiYSI6ImNtZ2dmczEyYTBoczUyanA5YTJtcXNhbWoifQ.A03X4JmODtOp3lArOIF3-Q";

      // Определяем зум в зависимости от размера экрана
      const isMobile = window.innerWidth < 768;
      const initialZoom = isMobile ? 1.5 : MAP_CONFIG.zoom;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/eviliv/cmggfvpcp000j01s5dalac7z5?optimize=true",
        center: MAP_CONFIG.center,
        zoom: initialZoom,
        projection: MAP_CONFIG.projection,
        pitch: MAP_CONFIG.pitch,
        attributionControl: false,
        // Оптимизация загрузки
        preserveDrawingBuffer: false,
        refreshExpiredTiles: false,
        fadeDuration: 0,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Обработчик загрузки стиля
      map.current.on("style.load", () => {
        if (!map.current) return;

        try {
          map.current.setFog(FOG_CONFIG);
          console.log("✓ Fog applied");
        } catch (error) {
          console.warn("Fog not supported:", error);
        }
      });

      // Обработчик ошибок
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setLoadState({
          isLoading: false,
          error: "Ошибка загрузки карты. Проверьте токен и стиль.",
        });
      });

      // Обработчик загрузки карты
      map.current.on("load", () => {
        if (!map.current || !map.current.isStyleLoaded()) return;

        try {
          const smoothCoordinates = createSmoothCurve(ROUTE_WAYPOINTS);

          // Добавляем источник маршрута
          map.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: smoothCoordinates,
              },
            },
          });

          // Добавляем слой с свечением и пунктиром
          map.current.addLayer({
            id: "route-glow",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#e5e7eb",
              "line-width": 4,
              "line-blur": 4,
              "line-opacity": 0.8,
              "line-dasharray": [2, 3], // Пунктир: 2px линия, 3px пробел
            },
          });

          // Добавляем маркеры как Symbol layer с локализованными названиями
          const markersGeoJSON = {
            type: "FeatureCollection" as const,
            features: MARKER_POINTS.map((point, index) => ({
              type: "Feature" as const,
              properties: {
                name: point.name,
                localizedName: content.map.points[index]?.name || point.name,
              },
              geometry: {
                type: "Point" as const,
                coordinates: point.coordinates,
              },
              id: index, // Важно: добавляем id для feature-state
            })),
          };

          map.current.addSource("markers", {
            type: "geojson",
            data: markersGeoJSON,
            generateId: true, // Автоматическая генерация ID если не указан
          });

          // Слой с кружками (используем feature-state для hover)
          map.current.addLayer({
            id: "markers-circle",
            type: "circle",
            source: "markers",
            paint: {
              "circle-radius": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                11, // Размер при hover
                8   // Обычный размер
              ],
              "circle-color": "#374151",
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
              "circle-opacity": 1,
            },
          });

          // Слой с подписями (используем локализованное название)
          map.current.addLayer({
            id: "markers-label",
            type: "symbol",
            source: "markers",
            layout: {
              "text-field": ["get", "localizedName"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.5],
              "text-anchor": "top",
              "text-size": 12,
            },
            paint: {
              "text-color": "#1f2937",
              "text-halo-color": "#ffffff",
              "text-halo-width": 2,
            },
          });

          // Интерактивность с использованием feature-state (best practice)
          map.current.on("mouseenter", "markers-circle", (e) => {
            if (!map.current || !e.features || !e.features[0]) return;
            map.current.getCanvas().style.cursor = "pointer";

            // Убираем hover с предыдущего маркера
            if (hoveredMarkerIdRef.current !== null) {
              map.current.setFeatureState(
                { source: "markers", id: hoveredMarkerIdRef.current },
                { hover: false }
              );
            }

            // Устанавливаем hover на текущий маркер
            const featureId = e.features[0].id;
            if (featureId !== undefined) {
              hoveredMarkerIdRef.current = featureId as string;
              map.current.setFeatureState(
                { source: "markers", id: featureId },
                { hover: true }
              );
            }
          });

          map.current.on("mouseleave", "markers-circle", () => {
            if (!map.current) return;
            map.current.getCanvas().style.cursor = "";

            // Убираем hover состояние
            if (hoveredMarkerIdRef.current !== null) {
              map.current.setFeatureState(
                { source: "markers", id: hoveredMarkerIdRef.current },
                { hover: false }
              );
              hoveredMarkerIdRef.current = null;
            }
          });

          map.current.on("click", "markers-circle", (e) => {
            if (!map.current || !e.features || !e.features[0]) return;

            // Mark this as marker click
            isMarkerClickRef.current = true;

            const coordinates = e.features[0].geometry.coordinates.slice() as [
              number,
              number
            ];
            const name = e.features[0].properties.name;

            // Найдём данные маркера с картинкой
            const markerData = MARKER_POINTS.find((m) => m.name === name);
            const markerIndex = MARKER_POINTS.findIndex((m) => m.name === name);
            const pointData =
              markerIndex >= 0 ? content.map.points[markerIndex] : null;

            // Конвертируем координаты в пиксели на экране
            const point = map.current.project(coordinates);

            setSelectedMarker({
              name: pointData?.name || name,
              description: pointData?.description || "",
              image: markerData?.image,
              x: point.x,
              y: point.y,
              coordinates: coordinates,
            });
          });

          setLoadState({ isLoading: false, error: null });
          console.log("✓ Map loaded successfully");

          // Добавляем обработчики взаимодействия пользователя
          const handleUserInteraction = () => {
            isUserInteractingRef.current = true;
            if (idleTimeoutRef.current) {
              clearTimeout(idleTimeoutRef.current);
            }
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            // Возобновить покачивание через 3 секунды после последнего взаимодействия
            idleTimeoutRef.current = setTimeout(() => {
              isUserInteractingRef.current = false;
              startIdleAnimation();
            }, 3000);
          };

          map.current.on("mousedown", handleUserInteraction);
          map.current.on("touchstart", handleUserInteraction);
          map.current.on("wheel", handleUserInteraction);
          map.current.on("drag", handleUserInteraction);

          // Функция анимации покачивания
          const startIdleAnimation = () => {
            if (!map.current || isUserInteractingRef.current || !isMapVisibleRef.current) return;

            const initialBearing = map.current.getBearing();
            let startTime: number | null = null;

            const animate = (timestamp: number) => {
              if (!map.current || isUserInteractingRef.current || !isMapVisibleRef.current) return;

              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;

              // Плавное покачивание: синусоида от -3 до +3 градусов, период 6 секунд
              const bearing = initialBearing + Math.sin(elapsed / 3000) * 3;

              map.current.setBearing(bearing);

              animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);
          };

          // Сохранить функцию для доступа из Intersection Observer
          (window as any).__mapStartIdleAnimation = startIdleAnimation;

          // Начать покачивание через 2 секунды после загрузки
          const initialTimeout = setTimeout(() => {
            if (!isUserInteractingRef.current && isMapVisibleRef.current) {
              startIdleAnimation();
            }
          }, 2000);

          // Сохраняем timeout для очистки
          if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current);
          }
          idleTimeoutRef.current = initialTimeout;
        } catch (error) {
          console.error("Error setting up map:", error);
          setLoadState({
            isLoading: false,
            error: "Ошибка при настройке карты",
          });
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoadState({
        isLoading: false,
        error: "Ошибка инициализации карты",
      });
    }

    // Cleanup
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Очистка глобальной функции
      if ((window as any).__mapStartIdleAnimation) {
        delete (window as any).__mapStartIdleAnimation;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: "#2d3748",
        backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                        radial-gradient(1px 1px at 60px 70px, white, transparent),
                        radial-gradient(1px 1px at 50px 50px, white, transparent),
                        radial-gradient(1px 1px at 130px 80px, white, transparent),
                        radial-gradient(1px 1px at 90px 10px, white, transparent)`,
        backgroundSize: "150px 150px",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className="relative w-full h-[50vh] md:h-[70vh]"
        style={{
          boxShadow:
            "inset 0 10px 30px -5px rgba(0, 0, 0, 0.6), inset 0 -10px 30px -5px rgba(0, 0, 0, 0.5), inset 8px 0 15px -8px rgba(0, 0, 0, 0.4), inset -8px 0 15px -8px rgba(0, 0, 0, 0.4)",
          borderTop: "2px solid rgba(0, 0, 0, 0.15)",
          borderBottom: "2px solid rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Loading state */}
        {loadState.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white">{content.map.loading}</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {loadState.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
            <div className="text-center max-w-md p-6">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Ошибка загрузки карты
              </h2>
              <p className="text-gray-600">{loadState.error}</p>
            </div>
          </div>
        )}

        {/* Map container */}
        <div ref={mapContainer} className="w-full h-full" />

        {/* Controls */}
        {!loadState.error && <MapControls />}

        {/* Custom Popup */}
        {selectedMarker &&
          (() => {
            const containerWidth = mapContainer.current?.clientWidth || 0;
            const containerHeight = mapContainer.current?.clientHeight || 0;
            const popupWidth = 340;
            const popupHeight = 420; // Approximate height with padding
            const padding = 10;

            // Calculate horizontal position (keep within bounds)
            let left = selectedMarker.x;
            if (left - popupWidth / 2 < padding) {
              left = popupWidth / 2 + padding;
            } else if (left + popupWidth / 2 > containerWidth - padding) {
              left = containerWidth - popupWidth / 2 - padding;
            }

            // Calculate vertical position - smart positioning
            let top = selectedMarker.y;
            let transform = "";

            const spaceAbove = selectedMarker.y;
            const spaceBelow = containerHeight - selectedMarker.y;

            // Try to show above marker
            if (spaceAbove >= popupHeight + 30) {
              // Enough space above
              top = selectedMarker.y;
              transform = "translate(-50%, calc(-100% - 20px))";
            }
            // Try to show below marker
            else if (spaceBelow >= popupHeight + 30) {
              // Enough space below
              top = selectedMarker.y;
              transform = "translate(-50%, 20px)";
            }
            // Not enough space in either direction - position to fit
            else {
              // Center vertically in available space, or pin to edges
              if (containerHeight < popupHeight + padding * 2) {
                // Container too small, pin to top
                top = padding;
                transform = "translate(-50%, 0)";
              } else {
                // Position so popup fits in container
                const idealTop = Math.min(
                  containerHeight - popupHeight - padding,
                  Math.max(padding, selectedMarker.y - popupHeight / 2)
                );
                top = idealTop;
                transform = "translate(-50%, 0)";
              }
            }

            return (
              <div
                className="absolute z-[999999] pointer-events-none max-h-full overflow-visible"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  transform,
                }}
              >
                <div className="pointer-events-auto relative map-popup-content">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white shadow-lg"
                    onClick={() => setSelectedMarker(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <MapPopup
                    name={selectedMarker.name}
                    description={selectedMarker.description}
                    image={selectedMarker.image}
                  />
                </div>
              </div>
            );
          })()}
      </div>
    </section>
  );
}
