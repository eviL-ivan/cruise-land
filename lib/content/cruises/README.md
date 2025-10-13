# Система переопределений контента для круизов

Эта система позволяет переопределять любой контент для конкретного круиза без изменения базовых файлов локализации.

## Структура папок

```
lib/content/cruises/
├── types.ts              # Типы для переопределений
├── merge-content.ts      # Логика слияния контента
├── CPTUSH25/            # Папка для круиза 2025
│   └── override.ts      # Переопределения для CPTUSH25
└── CPTUSH26/            # Папка для круиза 2026
    └── override.ts      # Переопределения для CPTUSH26
```

## Как это работает

### 1. Базовая конфигурация

В `lib/cruise-config.ts` определяются основные параметры круиза (даты, код, продолжительность). Эти данные автоматически подставляются в локали через функции:

```typescript
getCruiseCode()         // Код круиза (D2925111520 или D2826102320)
getCruiseRoute()        // Маршрут (Cape Town - Ushuaia)
getCruiseDatesShort()   // Даты в формате MM.DD.YY-MM.DD.YY
getCruiseDatesLong()    // Даты в формате YYYY.MM.DD - YYYY.MM.DD
getCruiseNights()       // Количество ночей
```

### 2. Переопределения контента

Для каждого круиза можно создать файл `override.ts` в соответствующей папке. В этом файле можно переопределить **любые** поля из базового контента.

**Пример переопределения** (`lib/content/cruises/CPTUSH26/override.ts`):

```typescript
import type { CruiseContentOverride } from "../types"

export const override: CruiseContentOverride = {
  // Переопределяем цену для второго круиза
  overview: {
    price: "$14,500",
    priceNote: "per person (special offer)",
  },

  // Меняем заголовок Hero
  hero: {
    title: "Winter Antarctic Expedition",
    subtitle: "Experience the magic of Antarctic spring",
  },

  // Обновляем статистику
  cta: {
    stats: [
      { number: "21", label: "Days of Travel" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Unforgettable Moments" },
    ],
  },

  // Можно переопределить мета-данные
  meta: {
    title: "Antarctic Spring Expedition 2025 | SH Diana",
    description: "Special winter departure with unique wildlife viewing opportunities.",
  },
}
```

### 3. Автоматическое применение

Переопределения применяются автоматически на основе переменной окружения `NEXT_PUBLIC_CRUISE_CODE`:

```bash
# .env.local
NEXT_PUBLIC_CRUISE_CODE=CPTUSH26
```

Система:
1. Загружает базовый контент из локали
2. Ищет файл `lib/content/cruises/{CRUISE_CODE}/override.ts`
3. Глубоко мерджит переопределения с базовым контентом
4. Возвращает финальный контент

## Примеры использования

### Переопределение цены

```typescript
export const override: CruiseContentOverride = {
  overview: {
    price: "$15,280",
  },
}
```

### Изменение описания

```typescript
export const override: CruiseContentOverride = {
  overview: {
    description: "Специальное зимнее предложение с уникальными возможностями наблюдения за дикой природой.",
  },
}
```

### Обновление нескольких секций

```typescript
export const override: CruiseContentOverride = {
  overview: {
    price: "$13,980",
    description: "Early bird special price!",
  },
  hero: {
    title: "Antarctic Adventure",
    titleAccent: "of a Lifetime",
  },
  cta: {
    title: "Reserve Your Spot Today",
    subtitle: "Limited availability - book now!",
  },
}
```

### Переопределение вложенных полей

Система использует глубокое слияние, поэтому переопределяются только указанные поля:

```typescript
// Базовый контент
overview: {
  price: "$13,780",
  priceNote: "per person",
  description: "...",
}

// Переопределение
overview: {
  price: "$14,500",  // Изменится
  // priceNote и description останутся из базового контента
}
```

## Добавление нового круиза

1. Создайте папку с кодом круиза:
   ```bash
   mkdir lib/content/cruises/CPTUSH27
   ```

2. Создайте файл переопределений:
   ```typescript
   // lib/content/cruises/CPTUSH27/override.ts
   import type { CruiseContentOverride } from "../types"

   export const override: CruiseContentOverride = {
     overview: {
       price: "$16,200",
     },
     // ... другие переопределения
   }
   ```

3. Добавьте конфигурацию в `lib/cruise-config.ts`:
   ```typescript
   "CPTUSH27": {
     code: "D2927...",
     // ... параметры круиза
   }
   ```

4. Установите переменную окружения:
   ```bash
   NEXT_PUBLIC_CRUISE_CODE=CPTUSH27
   ```

## Преимущества системы

✅ **Модульность** - каждый круиз в отдельной папке
✅ **Не дублируем код** - переопределяем только то, что нужно
✅ **Типобезопасность** - TypeScript проверяет корректность переопределений
✅ **Легко масштабируется** - добавление нового круиза = создание одной папки
✅ **Не ломает существующий код** - если файла нет, используется базовый контент

## TypeScript типы

Вы можете расширить `CruiseContentOverride` для добавления новых полей:

```typescript
// lib/content/cruises/types.ts
export interface CruiseContentOverride {
  overview?: {
    price?: string
    // ... другие поля
  }

  // Добавьте свои секции
  highlights?: Array<{
    title?: string
    description?: string
  }>

  // Или используйте индекс для полной гибкости
  [key: string]: any
}
```
