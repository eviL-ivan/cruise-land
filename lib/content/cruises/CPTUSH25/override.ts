// Переопределения контента для круиза CPTUSH25
// Здесь можно переопределить любые поля из базового контента

import type { CruiseContentOverride } from "../types"

export const override: CruiseContentOverride = {
  // Переопределяем статистику для 21-дневного круиза
  cta: {
    stats: [
      { number: "21", label: "Days of Travel" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Unforgettable Moments" },
    ],
  },

  // Переопределяем карту для маршрута Cape Town → Ushuaia
  overview: {
    mapImage: "/map-cape-usu.png",
  },
}
