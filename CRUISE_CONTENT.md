# Система управления контентом для круизов

Быстрое руководство по настройке контента для разных круизов.

## Как это работает

1. **Базовая конфигурация** (`lib/cruise-config.ts`) - даты, коды, продолжительность
2. **Базовый контент** (`lib/content.*.ts`) - тексты, переводы
3. **Переопределения** (`lib/content/cruises/{CRUISE_CODE}/override.ts`) - уникальный контент для конкретного круиза

## Быстрый старт

### 1. Выбор круиза

Установите код круиза в `.env.local`:

```bash
NEXT_PUBLIC_CRUISE_CODE=CPTUSH26
```

Доступные коды: `CPTUSH25`, `CPTUSH26`

### 2. Переопределение контента

Создайте или отредактируйте файл для вашего круиза:

```typescript
// lib/content/cruises/CPTUSH26/override.ts
export const override = {
  // Изменить цену
  overview: {
    price: "$14,500",
  },

  // Изменить заголовок
  hero: {
    title: "Special Winter Expedition",
  },

  // Изменить статистику
  cta: {
    stats: [
      { number: "21", label: "Days" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Memories" },
    ],
  },
}
```

### 3. Что можно переопределить

- ✅ Цены и описания (`overview`)
- ✅ Заголовки и подзаголовки (`hero`)
- ✅ Мета-теги SEO (`meta`)
- ✅ Статистику и CTA (`cta`)
- ✅ Любые другие поля из базового контента

## Примеры

### Изменить только цену

```typescript
export const override = {
  overview: { price: "$15,280" },
}
```

### Специальное зимнее предложение

```typescript
export const override = {
  overview: {
    price: "$13,980",
    priceNote: "Early bird special",
    description: "Limited time winter expedition offer!",
  },
  hero: {
    title: "Antarctic Winter Adventure",
    subtitle: "Experience the magic of polar spring",
  },
}
```

### Обновить мета-теги

```typescript
export const override = {
  meta: {
    title: "Winter Antarctic Expedition 2025 | Special Offer",
    description: "Book now for special winter pricing on our Antarctic cruise.",
  },
}
```

## Добавить новый круиз

1. Создайте папку:
   ```bash
   mkdir lib/content/cruises/CPTUSH27
   ```

2. Добавьте конфигурацию в `lib/cruise-config.ts`:
   ```typescript
   "CPTUSH27": {
     code: "D2927...",
     dates: { start: "...", end: "..." },
     duration: { days: 21, nights: 20 },
     // ...
   }
   ```

3. Создайте override файл:
   ```typescript
   // lib/content/cruises/CPTUSH27/override.ts
   export const override = {
     overview: { price: "$16,200" },
   }
   ```

## Полная документация

- Подробное руководство: [`lib/content/cruises/README.md`](./lib/content/cruises/README.md)
- Переменные окружения: [`ENV.md`](./ENV.md)
- Конфигурация круизов: [`lib/cruise-config.ts`](./lib/cruise-config.ts)

## Структура файлов

```
lib/
├── cruise-config.ts                    # Базовая конфигурация
├── content.en.ts                       # Английский контент
├── content.ts                          # Русский контент
├── content.zh.ts                       # Китайский контент
└── content/
    └── cruises/
        ├── README.md                   # Полная документация
        ├── types.ts                    # TypeScript типы
        ├── merge-content.ts            # Логика слияния
        ├── CPTUSH25/
        │   └── override.ts             # Переопределения для 2025
        └── CPTUSH26/
            └── override.ts             # Переопределения для 2026
```

## Преимущества

- 🎯 **Простота** - один файл на круиз
- 🔄 **Переиспользование** - не дублируем контент
- 🌍 **Мультиязычность** - работает для всех локалей
- 🛡️ **Безопасность типов** - TypeScript проверяет корректность
- ⚡ **Гибкость** - переопределяй только то, что нужно
