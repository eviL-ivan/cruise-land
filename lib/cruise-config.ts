// Cruise code from environment variable
export const CRUISE_CODE = process.env.NEXT_PUBLIC_CRUISE_CODE || "CPTUSH25"

// Типы для конфигурации круиза
export interface CruiseConfig {
  code: string
  name: string
  year: string
  route: {
    from: string
    to: string
  }
  dates: {
    start: string // Формат: "DD Month YYYY"
    end: string
  }
  duration: {
    days: number
    nights: number
  }
  // Можно добавить другие параметры
  prices?: {
    from: number
    currency: string
  }
  availability?: string
  bookingDeadline?: string
  itinerary?: {
    // Можно добавить специфичные данные по маршруту
    ports?: string[]
  }
}

// Конфигурации для разных круизов
export const CRUISE_CONFIGS: Record<string, CruiseConfig> = {
  "CPTUSH25": {
    code: "D2925111520",
    name: "Cape Town to Ushuaia",
    year: "2025",
    route: {
      from: "Cape Town",
      to: "Ushuaia",
    },
    dates: {
      start: "14 January 2025",
      end: "12 February 2025",
    },
    duration: {
      days: 30,
      nights: 29,
    },
  },
  "CPTUSH26": {
    code: "D2826102320", // Cruise code for 2026
    name: "Cape Town to Ushuaia",
    year: "2026",
    route: {
      from: "Cape Town",
      to: "Ushuaia",
    },
    dates: {
      start: "23 October 2026",
      end: "12 November 2026",
    },
    duration: {
      days: 21,
      nights: 20,
    },
  },
}

// Получить текущую конфигурацию круиза
export function getCurrentCruiseConfig(): CruiseConfig {
  return CRUISE_CONFIGS[CRUISE_CODE] || CRUISE_CONFIGS["CPTUSH25"]
}

// Хелпер для форматирования дат
export function getCruiseDateRange(): string {
  const config = getCurrentCruiseConfig()
  return `${config.dates.start} - ${config.dates.end}`
}

// Хелпер для получения продолжительности
export function getCruiseDuration(): string {
  const config = getCurrentCruiseConfig()
  return `${config.duration.days} days / ${config.duration.nights} nights`
}

// Хелпер для получения года
export function getCruiseYear(): string {
  return getCurrentCruiseConfig().year
}

// Хелпер для получения маршрута
export function getCruiseRoute(): string {
  const config = getCurrentCruiseConfig()
  return `${config.route.from} - ${config.route.to}`
}

// Хелпер для получения copyright с годом круиза
export function getCopyrightYear(): string {
  return getCurrentCruiseConfig().year
}
