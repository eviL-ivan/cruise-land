Отлично! Вот production-ready код для Next.js:

## 📁 Структура файлов:

```
app/
├── map/
│   └── page.tsx                 # Страница с картой
components/
└── AntarcticaMap/
    ├── AntarcticaMap.tsx       # Главный компонент
    ├── MapControls.tsx         # UI панели
    ├── constants.ts            # Константы маршрута
    └── types.ts                # TypeScript типы
```

## 1️⃣ **`components/AntarcticaMap/types.ts`**

```typescript
export interface MarkerPoint {
  name: string
  coordinates: [number, number]
}

export interface MapLoadState {
  isLoading: boolean
  error: string | null
}
```

## 2️⃣ **`components/AntarcticaMap/constants.ts`**

```typescript
import { MarkerPoint } from './types'

// Координаты точек маршрута
export const ROUTE_WAYPOINTS: [number, number][] = [
  [18.4241, -33.9249], // Cape Town
  [16, -34.5],
  [12, -35.5],
  [5, -36],
  [-3, -35.5],
  [-10, -35.5],
  [-14, -36],
  [-16, -37],
  [-14, -38.5],
  [-10, -39.5],
  [-7.5, -40],
  [-8, -42],
  [-14, -46],
  [-22, -50],
  [-28, -52.5],
  [-32, -53.2],
  [-34, -53.5],
  [-36, -53.8],
  [-38, -54],
  [-40, -54.5],
  [-42, -56.5],
  [-43, -58.5],
  [-44, -59.5],
  [-45, -60],
  [-46.5, -60.3],
  [-48, -60.5],
  [-52, -61],
  [-56, -61.8],
  [-58.5, -62.2],
  [-60, -62.7],
  [-61.5, -62.8],
  [-63, -62.5],
  [-64.5, -61],
  [-66, -58.5],
  [-67, -56.5],
  [-68.3029, -54.8019], // Ushuaia
]

export const MARKER_POINTS: MarkerPoint[] = [
  { name: "Cape Town", coordinates: [18.4241, -33.9249] },
  { name: "Tristan da Cunha", coordinates: [-12.2777, -37.1052] },
  { name: "Gough Island", coordinates: [-9.9283, -40.3486] },
  { name: "South Georgia", coordinates: [-36.4388, -54.2806] },
  { name: "South Orkney Islands", coordinates: [-45.5, -60.5833] },
  { name: "South Shetland Islands", coordinates: [-59.5, -62.5] },
  { name: "Ushuaia", coordinates: [-68.3029, -54.8019] },
]

export const MAP_CONFIG = {
  center: [-25, -50] as [number, number],
  zoom: 2.5,
  pitch: 40,
  projection: 'globe' as const,
}

export const FOG_CONFIG = {
  color: "rgb(186, 210, 235)",
  "high-color": "rgb(36, 92, 223)",
  "horizon-blend": 0.02,
  "space-color": "rgb(11, 11, 25)",
  "star-intensity": 0.6,
}
```

## 3️⃣ **`components/AntarcticaMap/MapControls.tsx`**

```typescript
import React from 'react'
import { MARKER_POINTS } from './constants'

export default function MapControls() {
  return (
    <>
      {/* Заголовок */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 max-w-md z-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Маршрут в Антарктиду
        </h1>
        <p className="text-sm text-slate-600">
          От Кейптауна через острова Южной Атлантики до Антарктического полуострова
        </p>
      </div>

      {/* Список точек */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 max-w-xs z-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Точки маршрута
        </h2>
        <ul className="space-y-3">
          {MARKER_POINTS.map((point, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700 flex-shrink-0" />
              <span className="text-slate-800">{point.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
```

## 4️⃣ **`components/AntarcticaMap/AntarcticaMap.tsx`**

```typescript
"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { ROUTE_WAYPOINTS, MARKER_POINTS, MAP_CONFIG, FOG_CONFIG } from './constants'
import { MapLoadState } from './types'
import MapControls from './MapControls'

// Catmull-Rom сплайн для плавной линии
const createSmoothCurve = (points: number[][]): number[][] => {
  const smoothPoints: number[][] = []

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    smoothPoints.push(p1)

    for (let t = 0.02; t < 1; t += 0.02) {
      const t2 = t * t
      const t3 = t2 * t

      const x =
        0.5 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)

      const y =
        0.5 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)

      smoothPoints.push([x, y])
    }
  }

  smoothPoints.push(points[points.length - 1])
  return smoothPoints
}

export default function AntarcticaMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loadState, setLoadState] = useState<MapLoadState>({
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Проверяем что токен существует
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!mapboxToken) {
      setLoadState({
        isLoading: false,
        error: "Mapbox token не найден. Добавьте NEXT_PUBLIC_MAPBOX_TOKEN в .env.local",
      })
      return
    }

    // Проверяем что контейнер существует и карта еще не создана
    if (!mapContainer.current || map.current) return

    try {
      mapboxgl.accessToken = mapboxToken

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || "mapbox://styles/mapbox/standard",
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        projection: MAP_CONFIG.projection,
        pitch: MAP_CONFIG.pitch,
        attributionControl: false,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Обработчик загрузки стиля
      map.current.on("style.load", () => {
        if (!map.current) return

        try {
          map.current.setFog(FOG_CONFIG)
          console.log("✓ Fog applied")
        } catch (error) {
          console.warn("Fog not supported:", error)
        }
      })

      // Обработчик ошибок
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e)
        setLoadState({
          isLoading: false,
          error: "Ошибка загрузки карты. Проверьте токен и стиль.",
        })
      })

      // Обработчик загрузки карты
      map.current.on("load", () => {
        if (!map.current || !map.current.isStyleLoaded()) return

        try {
          const smoothCoordinates = createSmoothCurve(ROUTE_WAYPOINTS)

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
          })

          // Добавляем анимированный пунктирный слой
          map.current.addLayer({
            id: "route-animated",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#9ca3af",
              "line-width": 3.5,
              "line-dasharray": [0, 3, 3],
            },
          })

          // Анимация пунктира
          let dashOffset = 0
          let lastTimestamp = 0

          const animateDash = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp
            const deltaTime = timestamp - lastTimestamp
            lastTimestamp = timestamp

            if (map.current && map.current.getLayer("route-animated")) {
              dashOffset += (deltaTime / 1000) * 0.12
              const offset = dashOffset % 6
              map.current.setPaintProperty("route-animated", "line-dasharray", [
                offset,
                3,
                3,
              ])
            }
            requestAnimationFrame(animateDash)
          }

          requestAnimationFrame(animateDash)

          // Добавляем маркеры как Symbol layer
          const markersGeoJSON = {
            type: "FeatureCollection" as const,
            features: MARKER_POINTS.map((point) => ({
              type: "Feature" as const,
              properties: {
                name: point.name,
              },
              geometry: {
                type: "Point" as const,
                coordinates: point.coordinates,
              },
            })),
          }

          map.current.addSource("markers", {
            type: "geojson",
            data: markersGeoJSON,
          })

          // Слой с кружками
          map.current.addLayer({
            id: "markers-circle",
            type: "circle",
            source: "markers",
            paint: {
              "circle-radius": 8,
              "circle-color": "#374151",
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
              "circle-opacity": 1,
            },
          })

          // Слой с подписями
          map.current.addLayer({
            id: "markers-label",
            type: "symbol",
            source: "markers",
            layout: {
              "text-field": ["get", "name"],
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
          })

          // Интерактивность
          map.current.on("mouseenter", "markers-circle", (e) => {
            if (!map.current) return
            map.current.getCanvas().style.cursor = "pointer"

            if (e.features && e.features[0]) {
              map.current.setPaintProperty("markers-circle", "circle-radius", [
                "case",
                ["==", ["get", "name"], e.features[0].properties.name],
                11,
                8,
              ])
            }
          })

          map.current.on("mouseleave", "markers-circle", () => {
            if (!map.current) return
            map.current.getCanvas().style.cursor = ""
            map.current.setPaintProperty("markers-circle", "circle-radius", 8)
          })

          map.current.on("click", "markers-circle", (e) => {
            if (!map.current || !e.features || !e.features[0]) return

            const coordinates = e.features[0].geometry.coordinates.slice() as [number, number]
            const name = e.features[0].properties.name

            new mapboxgl.Popup({ closeButton: false })
              .setLngLat(coordinates)
              .setHTML(`<strong style="color: #374151; font-size: 13px;">${name}</strong>`)
              .addTo(map.current)
          })

          setLoadState({ isLoading: false, error: null })
          console.log("✓ Map loaded successfully")
        } catch (error) {
          console.error("Error setting up map:", error)
          setLoadState({
            isLoading: false,
            error: "Ошибка при настройке карты",
          })
        }
      })
    } catch (error) {
      console.error("Error initializing map:", error)
      setLoadState({
        isLoading: false,
        error: "Ошибка инициализации карты",
      })
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-screen">
      {/* Loading state */}
      {loadState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Загрузка карты...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {loadState.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
          <div className="text-center max-w-md p-6">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Ошибка загрузки карты</h2>
            <p className="text-gray-600">{loadState.error}</p>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Controls */}
      {!loadState.error && <MapControls />}
    </div>
  )
}
```

## 5️⃣ **`app/map/page.tsx`**

```typescript
import AntarcticaMap from '@/components/AntarcticaMap/AntarcticaMap'

export default function MapPage() {
  return <AntarcticaMap />
}
```

## 6️⃣ **`.env.local`**

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZXZpbGl2IiwiYSI6ImNtZ2dmczEyYTBoczUyanA5YTJtcXNhbWoifQ.A03X4JmODtOp3lArOIF3-Q
NEXT_PUBLIC_MAPBOX_STYLE_URL=mapbox://styles/eviliv/cmggfvpcp000j01s5dalac7z5
```

## 7️⃣ **`package.json`** (добавьте зависимости)

```json
{
  "dependencies": {
    "mapbox-gl": "^3.15.0"
  },
  "devDependencies": {
    "@types/mapbox-gl": "^3.1.0"
  }
}
```

## ✅ Production Features:

- ✨ TypeScript типизация
- 🔒 Environment variables для токенов
- ⚡ Proper cleanup в useEffect
- 🎯 Error handling и loading states
- 📦 Модульная структура
- 🧹 Разделение логики и UI
- 🔄 React best practices
- 💪 Type-safe constants

Готово для production! 🚀