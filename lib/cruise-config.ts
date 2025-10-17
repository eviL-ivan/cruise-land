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
  // Промо-блок
  promoEnabled?: boolean
  promoImages?: {
    desktop: string
    mobile: string
  }
  // Баннер следующего года
  nextYearBanner?: {
    enabled: boolean
    url: string
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
      start: "15 November 2025",
      end: "5 December 2025",
    },
    duration: {
      days: 21,
      nights: 20,
    },
    nextYearBanner: {
      enabled: true,
      url: "https://cape-ushuaia26.swanhellenic.com/",
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
    promoEnabled: true,
    promoImages: {
      desktop: "/luxury/desk.png",
      mobile: "/luxury/mob.png",
    },
  },
  "USHCPT26": {
    code: "D0626030520",
    name: "Ushuaia to Cape Town",
    year: "2026",
    route: {
      from: "Ushuaia",
      to: "Cape Town",
    },
    dates: {
      start: "5 March 2026",
      end: "25 March 2026",
    },
    duration: {
      days: 21,
      nights: 20,
    },
    promoEnabled: true,
    promoImages: {
      desktop: "/luxury/desk.png",
      mobile: "/luxury/mob.png",
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

// Хелпер для получения кода круиза
export function getCruiseCode(): string {
  return getCurrentCruiseConfig().code
}

// Хелпер для получения дат в формате "15 Nov 25 - 5 Dec 25" (английский формат)
export function getCruiseDatesShort(): string {
  const config = getCurrentCruiseConfig()
  const start = new Date(config.dates.start)
  const end = new Date(config.dates.end)

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = String(date.getFullYear()).slice(-2)
    return `${day} ${month} ${year}`
  }

  return `${formatDate(start)} - ${formatDate(end)}`
}

// Хелпер для получения дат в формате DD.MM.YY-DD.MM.YY (русский/европейский формат)
export function getCruiseDatesShortRU(): string {
  const config = getCurrentCruiseConfig()
  const start = new Date(config.dates.start)
  const end = new Date(config.dates.end)

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${day}.${month}.${year}`
  }

  return `${formatDate(start)}-${formatDate(end)}`
}

// Хелпер для получения дат в формате YYYY.MM.DD - YYYY.MM.DD (для китайского)
export function getCruiseDatesLong(): string {
  const config = getCurrentCruiseConfig()
  const start = new Date(config.dates.start)
  const end = new Date(config.dates.end)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  return `${formatDate(start)} - ${formatDate(end)}`
}

// Хелпер для получения только количества ночей
export function getCruiseNights(): number {
  return getCurrentCruiseConfig().duration.nights
}
