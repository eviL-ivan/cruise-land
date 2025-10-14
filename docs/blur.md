# Blur Placeholders Implementation

Реализация blur-плейсхолдеров для изображений (эффект как в Instagram при загрузке).

## Описание

Система автоматически генерирует размытые превью-версии всех изображений в формате base64 и показывает их во время загрузки полноразмерных изображений. Это создает плавный переход и улучшает воспринимаемую производительность.

## Архитектура

### 1. Генерация blur-данных

**Скрипт:** `scripts/generate-blur-data-auto.mjs`

Автоматически сканирует все изображения в папке `public/` и генерирует для них blur-плейсхолдеры размером 32×32px.

**Как запустить:**
```bash
npm run generate-blur
```

**Что делает скрипт:**
1. Рекурсивно сканирует папку `public/`
2. Находит все изображения (`.jpg`, `.jpeg`, `.png`, `.webp`)
3. Для каждого изображения создает blur-версию 32×32px используя библиотеку `plaiceholder`
4. Конвертирует blur в base64
5. Сохраняет все данные в `lib/blur-data.json`

**Размер blur-данных:** ~463KB для 157 изображений

**Важно:** Запускайте этот скрипт каждый раз при добавлении новых изображений в проект!

### 2. Компонент ImageWithBlur

**Файл:** `components/ui/image-with-blur.tsx`

Обёртка над `next/image`, которая автоматически добавляет blur placeholder.

**Использование:**
```tsx
import { ImageWithBlur } from "@/components/ui/image-with-blur"

// Обычное изображение с шириной/высотой
<ImageWithBlur
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
/>

// Изображение с fill (абсолютное позиционирование)
<ImageWithBlur
  src="/images/photo.jpg"
  alt="Description"
  fill
  className="object-cover"
/>
```

**Как работает:**

- **Для обычных изображений** (с width/height): использует встроенный механизм Next.js `placeholder="blur"`
- **Для fill-изображений**: создает два элемента:
  1. `<div>` с blur-фоном (CSS background с `filter: blur(20px)`)
  2. `<Image>` с актуальным изображением
  - Blur начинает с `opacity: 1` и плавно исчезает при загрузке изображения
  - Изображение начинает с `opacity: 0` и плавно появляется

**Z-индексы:**
- Blur background: `z-0`
- Актуальное изображение: `z-10`
- Градиенты и текст поверх должны иметь `z-20` и выше

### 3. Компонент VideoWithBlur

**Файл:** `components/ui/video-with-blur.tsx`

Компонент для видео с blur-плейсхолдером постера.

**Использование:**
```tsx
import { VideoWithBlur } from "@/components/ui/video-with-blur"

<VideoWithBlur
  autoPlay
  loop
  muted
  playsInline
  poster="/bg.webp"
  className="object-cover"
>
  <source src="/videos/hero.mp4" type="video/mp4" />
</VideoWithBlur>
```

**Как работает:**
1. Показывает blur-версию постера из `blur-data.json`
2. Предзагружает постер используя `new Image()`
3. Когда постер полностью загружен, скрывает blur
4. Видео загружается параллельно с постером

## Использованные технологии

- **plaiceholder** (v3.0.0) - генерация blur-плейсхолдеров
- **sharp** (v0.34.4) - обработка изображений (используется plaiceholder)

## Важные детали реализации

### Проблема с overflow

Изначально blur-фон имел `transform: scale(1.1)` для предотвращения белых краёв при размытии. Это вызывало горизонтальный скролл.

**Решение:** Убрали `transform: scale(1.1)` из всех компонентов:
- `components/ui/image-with-blur.tsx`
- `components/ui/video-with-blur.tsx`
- `components/journey.tsx`

### Проблема с z-index

Текст и градиенты поверх изображений исчезали вместе с blur, так как не имели z-index.

**Решение:** Добавили z-index для всех оверлеев:
- Градиенты: `z-20`
- Текст: `z-30`

**Исправленные компоненты:**
- `components/highlights.tsx`
- `components/overview.tsx`
- `components/wildlife.tsx`
- `components/company.tsx` (уже был правильный z-index)
- `components/journey.tsx` (уже был правильный z-index)

### Проблема с серым placeholder

На изображениях океана и неба blur выглядел как серый блок, так как эти изображения сами по себе имеют низкий контраст и монохромные цвета.

**Решение:** Это нормальное поведение. Увеличили размер blur с 10px до 32px для более качественного preview.

## Файлы и их назначение

```
├── scripts/
│   └── generate-blur-data-auto.mjs    # Скрипт генерации blur-данных
├── lib/
│   └── blur-data.json                  # Сгенерированные blur-данные (463KB)
├── components/
│   └── ui/
│       ├── image-with-blur.tsx         # Компонент для изображений
│       └── video-with-blur.tsx         # Компонент для видео
└── docs/
    └── blur.md                          # Эта документация
```

## Удалённые файлы

- `lib/shimmer.ts` - не использовался
- `scripts/generate-blur-data.mjs` - старый скрипт с ручным списком изображений

## Команды

```bash
# Сгенерировать blur-данные для всех изображений
npm run generate-blur

# Запустить dev-сервер
npm run dev

# Собрать проект
npm run build
```

## Производительность

- **Размер blur-data.json:** 463KB
- **Количество изображений:** 157
- **Размер одного blur-плейсхолдера:** ~32×32px base64 (~3KB)
- **Влияние на FCP/LCP:** положительное (пользователь сразу видит preview)
- **Bundle size:** blur-данные включаются в client bundle

## Рекомендации

1. **Запускайте `npm run generate-blur`** при добавлении новых изображений
2. **Используйте ImageWithBlur** вместо обычного `next/image` для всех изображений
3. **Добавляйте z-index** для текста и градиентов поверх изображений (z-20+)
4. **Не используйте transform: scale()** на blur-фонах (вызывает overflow)
5. **Оптимизируйте исходные изображения** - blur не заменяет оптимизацию

## Примеры использования

### Карточка с изображением и текстом
```tsx
<div className="relative h-64 overflow-hidden rounded-lg">
  <ImageWithBlur
    src="/images/photo.jpg"
    alt="Photo"
    fill
    className="object-cover"
  />
  {/* Градиент должен иметь z-20+ */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20" />
  {/* Текст должен иметь z-30+ */}
  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
    <h3 className="text-white">Title</h3>
    <p className="text-white/90">Description</p>
  </div>
</div>
```

### Hero-секция с видео
```tsx
<div className="relative h-screen">
  <VideoWithBlur
    autoPlay
    loop
    muted
    playsInline
    poster="/bg.webp"
    className="object-cover"
  >
    <source src="/hero.mp4" type="video/mp4" />
  </VideoWithBlur>
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10" />
  <div className="absolute inset-0 z-20">
    <h1>Hero Title</h1>
  </div>
</div>
```

## Troubleshooting

### Blur не появляется
- Проверьте что запустили `npm run generate-blur`
- Проверьте что путь к изображению начинается с `/` (например: `/images/photo.jpg`)
- Проверьте что изображение существует в папке `public/`

### Текст исчезает вместе с blur
- Добавьте `z-20` или выше для градиента
- Добавьте `z-30` или выше для текста

### Горизонтальный скролл
- Убедитесь что нет `transform: scale()` на blur-фонах
- Проверьте что родительский контейнер имеет `overflow-hidden`

### Blur выглядит серым
- Это нормально для низкоконтрастных изображений (небо, океан)
- Blur повторяет цвета исходного изображения
