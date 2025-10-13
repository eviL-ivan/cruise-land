# Cruise Configuration System

Система конфигурации круизов через переменные окружения.

## Как использовать

### 1. Настройка переменной окружения

В файле `.env.local` установите код круиза:

```bash
# Для круиза 2025 года
NEXT_PUBLIC_CRUISE_CODE=CPTUSH25

# Для круиза 2026 года
NEXT_PUBLIC_CRUISE_CODE=CPTUSH26
```

### 2. Использование в компонентах

```typescript
import { getCurrentCruiseConfig, getCruiseDateRange, getCruiseYear } from '@/lib/cruise-config'

// Получить полную конфигурацию
const config = getCurrentCruiseConfig()
console.log(config.dates.start) // "14 January 2025"

// Использовать хелперы
const dateRange = getCruiseDateRange() // "14 January 2025 - 12 February 2025"
const year = getCruiseYear() // "2025"
const duration = getCruiseDuration() // "30 days / 29 nights"
const route = getCruiseRoute() // "Cape Town - Ushuaia"
```

### 3. Пример интеграции в существующий контент

```typescript
// lib/content.ts
import { getCruiseYear, getCruiseDateRange } from './cruise-config'

export const content = {
  meta: {
    title: `Cruise ${getCruiseYear()} - Cape Town to Ushuaia`,
  },
  overview: {
    dates: getCruiseDateRange(),
  },
  footer: {
    copyright: `© ${getCruiseYear()} Swan Hellenic Ltd.`,
  },
}
```

## Добавление нового круиза

1. Добавьте новый код в `.env.local`:
```bash
NEXT_PUBLIC_CRUISE_CODE=NEWCODE27
```

2. Добавьте конфигурацию в `lib/cruise-config.ts`:
```typescript
export const CRUISE_CONFIGS: Record<string, CruiseConfig> = {
  // ... существующие
  "NEWCODE27": {
    code: "NEWCODE27",
    name: "New Route",
    year: "2027",
    route: {
      from: "Port A",
      to: "Port B",
    },
    dates: {
      start: "1 March 2027",
      end: "30 March 2027",
    },
    duration: {
      days: 30,
      nights: 29,
    },
  },
}
```

## Доступные конфигурации

- **CPTUSH25** - Cape Town to Ushuaia 2025 (14 Jan - 12 Feb 2025)
- **CPTUSH26** - Cape Town to Ushuaia 2026 (14 Jan - 12 Feb 2026)

## Расширение конфигурации

Вы можете добавить дополнительные поля в `CruiseConfig`:

```typescript
export interface CruiseConfig {
  // ... существующие поля
  prices?: {
    from: number
    currency: string
  }
  availability?: string
  bookingDeadline?: string
  itinerary?: {
    ports?: string[]
  }
}
```
