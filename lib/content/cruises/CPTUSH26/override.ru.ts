// Переопределения контента для круиза CPTUSH26 (Кейптаун → Ушуайя 2026)
// Отправление в октябре 2026 с обновленными ценами

import type { CruiseContentOverride } from "../types"
import { cabins } from "./cabins.ru"

export const override: CruiseContentOverride = {
  // Переопределение цен на каюты для сезона 2026
  cabins,

  // Переопределение базовой цены и карты для маршрута Кейптаун → Ушуайя
  overview: {
    price: "$16,650",
    mapImage: "/map-cape-usu.png",
  },
}
