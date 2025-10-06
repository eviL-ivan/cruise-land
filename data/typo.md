# Полная инструкция по типографике (с оригинальными шрифтами)

## 1. Импорт шрифтов из папки /fonts/

```css
/* ========================================
   NEUE MONTREAL - Main Font (все начертания)
   ======================================== */

/* Light (300) - Namibia */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Light.woff2") format("woff2"), url("/fonts/NeueMontreal-Light.woff")
      format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

/* Light Italic (300) - Argentina */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-LightItalic.woff2") format("woff2"), url("/fonts/NeueMontreal-LightItalic.woff")
      format("woff");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

/* Regular (400) - Antarctica */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Regular.woff2") format("woff2"), url("/fonts/NeueMontreal-Regular.woff")
      format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Italic (400) - Ecuador */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Italic.woff2") format("woff2"), url("/fonts/NeueMontreal-Italic.woff")
      format("woff");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

/* Medium (500) - Iceland */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Medium.woff2") format("woff2"), url("/fonts/NeueMontreal-Medium.woff")
      format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Medium Italic (500) - Greenland */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-MediumItalic.woff2") format("woff2"), url("/fonts/NeueMontreal-MediumItalic.woff")
      format("woff");
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

/* Bold (700) - Madagascar */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Bold.woff2") format("woff2"), url("/fonts/NeueMontreal-Bold.woff")
      format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Bold Italic (700) - Norway */
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-BoldItalic.woff2") format("woff2"), url("/fonts/NeueMontreal-BoldItalic.woff")
      format("woff");
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

/* ========================================
   NON NATURAL GROTESK - Display Font (все начертания)
   ======================================== */

/* Light (300) - Namibia */
@font-face {
  font-family: "NON Natural Grotesk";
  src: url("/fonts/NONNaturalGrotesk-Light.woff2") format("woff2"), url("/fonts/NONNaturalGrotesk-Light.woff")
      format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

/* Regular (400) - Antarctica */
@font-face {
  font-family: "NON Natural Grotesk";
  src: url("/fonts/NONNaturalGrotesk-Regular.woff2") format("woff2"), url("/fonts/NONNaturalGrotesk-Regular.woff")
      format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Medium (500) - Iceland */
@font-face {
  font-family: "NON Natural Grotesk";
  src: url("/fonts/NONNaturalGrotesk-Medium.woff2") format("woff2"), url("/fonts/NONNaturalGrotesk-Medium.woff")
      format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Bold (700) - Madagascar */
@font-face {
  font-family: "NON Natural Grotesk";
  src: url("/fonts/NONNaturalGrotesk-Bold.woff2") format("woff2"), url("/fonts/NONNaturalGrotesk-Bold.woff")
      format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## 2. Google Fonts для Noto Sans (CJK языки)

```html
<!-- В <head> для логографических языков -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

## 3. CSS Variables (полная версия)

```css
:root {
  /* ========================================
     COLORS (из брендбука)
     ======================================== */

  /* Primary Colors */
  --color-fathom-100: #004657;
  --color-fathom-100-cmyk: 100% 10% 20% 70%;
  --color-fathom-100-rgb: 0, 70, 87;
  --color-fathom-100-pantone: 7706 U;

  --color-fathom-60: #4d8a98;
  --color-fathom-40: #99bdc5;

  /* Accent Color */
  --color-accent: #be8f74;
  --color-accent-cmyk: 9% 31% 31% 16%;
  --color-accent-rgb: 190, 143, 118;
  --color-accent-pantone: 4715 U;

  /* Neutrals */
  --color-black: #6d6e71;
  --color-black-cmyk: 0% 0% 0% 80%;
  --color-black-rgb: 109, 110, 113;

  --color-white: #ffffff;

  --color-grey: #e8e6e5;
  --color-grey-cmyk: 5% 5% 5% 5%;
  --color-grey-rgb: 232, 231, 230;

  /* ========================================
     TYPOGRAPHY
     ======================================== */

  /* Font Families */
  --font-display: "NON Natural Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
    sans-serif;
  --font-main: "Neue Montreal", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-logographic-jp: "Noto Sans JP", sans-serif;
  --font-logographic-sc: "Noto Sans SC", sans-serif;
  --font-logographic: "Noto Sans JP", "Noto Sans SC", "Noto Sans", sans-serif;

  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-bold: 700;

  /* Font Sizes (из брендбука) */
  --text-10: 10pt;
  --text-12: 12pt;
  --text-14: 14pt;
  --text-16: 16pt;
  --text-18: 18pt;
  --text-20: 20pt;
  --text-22: 22pt;
  --text-24: 24pt;

  /* Line Heights */
  --leading-tight: 1.3;
  --leading-snug: 1.4;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
}
```

## 4. Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary Colors
        fathom: {
          DEFAULT: "#004657",
          100: "#004657",
          60: "#4D8A98",
          40: "#99BDC5",
        },
        // Accent Color
        accent: {
          DEFAULT: "#be8f74",
        },
        // Neutrals
        black: "#6D6E71",
        grey: "#e8e6e5",
        white: "#FFFFFF",
      },
      fontFamily: {
        // Display font для заголовков
        display: [
          "NON Natural Grotesk",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],

        // Main font для основного текста
        sans: ["Neue Montreal", "system-ui", "-apple-system", "sans-serif"],

        // Для китайского и японского текста
        "noto-jp": ["Noto Sans JP", "sans-serif"],
        "noto-sc": ["Noto Sans SC", "sans-serif"],
        logographic: [
          "Noto Sans JP",
          "Noto Sans SC",
          "Noto Sans",
          "sans-serif",
        ],
      },
      fontWeight: {
        light: "300", // Namibia
        regular: "400", // Antarctica
        medium: "500", // Iceland
        bold: "700", // Madagascar
      },
      fontSize: {
        10: ["10pt", { lineHeight: "1.4" }],
        12: ["12pt", { lineHeight: "1.5" }],
        14: ["14pt", { lineHeight: "1.5" }],
        16: ["16pt", { lineHeight: "1.6" }],
        18: ["18pt", { lineHeight: "1.6" }],
        20: ["20pt", { lineHeight: "1.4" }],
        22: ["22pt", { lineHeight: "1.3" }],
        24: ["24pt", { lineHeight: "1.3" }],
      },
    },
  },
};
```

## 5. Готовые CSS классы

```css
/* ========================================
   NEUE MONTREAL - Typography Classes
   ======================================== */

/* Light (300) - Namibia */
.text-montreal-light {
  font-family: var(--font-main);
  font-weight: 300;
  font-style: normal;
}

.text-montreal-light-italic {
  font-family: var(--font-main);
  font-weight: 300;
  font-style: italic;
}

/* Regular (400) - Antarctica */
.text-montreal-regular {
  font-family: var(--font-main);
  font-weight: 400;
  font-style: normal;
}

.text-montreal-italic {
  font-family: var(--font-main);
  font-weight: 400;
  font-style: italic;
}

/* Medium (500) - Iceland */
.text-montreal-medium {
  font-family: var(--font-main);
  font-weight: 500;
  font-style: normal;
}

.text-montreal-medium-italic {
  font-family: var(--font-main);
  font-weight: 500;
  font-style: italic;
}

/* Bold (700) - Madagascar */
.text-montreal-bold {
  font-family: var(--font-main);
  font-weight: 700;
  font-style: normal;
}

.text-montreal-bold-italic {
  font-family: var(--font-main);
  font-weight: 700;
  font-style: italic;
}

/* ========================================
   NON NATURAL GROTESK - Typography Classes
   ======================================== */

/* Light (300) - Namibia */
.text-grotesk-light {
  font-family: var(--font-display);
  font-weight: 300;
  font-style: normal;
}

/* Regular (400) - Antarctica */
.text-grotesk-regular {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: normal;
}

/* Medium (500) - Iceland */
.text-grotesk-medium {
  font-family: var(--font-display);
  font-weight: 500;
  font-style: normal;
}

/* Bold (700) - Madagascar */
.text-grotesk-bold {
  font-family: var(--font-display);
  font-weight: 700;
  font-style: normal;
}

/* ========================================
   FONT SIZE CLASSES
   ======================================== */

.text-10pt {
  font-size: var(--text-10);
  line-height: 1.4;
}
.text-12pt {
  font-size: var(--text-12);
  line-height: 1.5;
}
.text-14pt {
  font-size: var(--text-14);
  line-height: 1.5;
}
.text-16pt {
  font-size: var(--text-16);
  line-height: 1.6;
}
.text-18pt {
  font-size: var(--text-18);
  line-height: 1.6;
}
.text-20pt {
  font-size: var(--text-20);
  line-height: 1.4;
}
.text-22pt {
  font-size: var(--text-22);
  line-height: 1.3;
}
.text-24pt {
  font-size: var(--text-24);
  line-height: 1.3;
}

/* ========================================
   COLOR UTILITY CLASSES
   ======================================== */

/* Background Colors */
.bg-fathom {
  background-color: var(--color-fathom-100);
}
.bg-fathom-60 {
  background-color: var(--color-fathom-60);
}
.bg-fathom-40 {
  background-color: var(--color-fathom-40);
}
.bg-accent {
  background-color: var(--color-accent);
}
.bg-grey {
  background-color: var(--color-grey);
}
.bg-black {
  background-color: var(--color-black);
}
.bg-white {
  background-color: var(--color-white);
}

/* Text Colors */
.text-fathom {
  color: var(--color-fathom-100);
}
.text-fathom-60 {
  color: var(--color-fathom-60);
}
.text-fathom-40 {
  color: var(--color-fathom-40);
}
.text-accent {
  color: var(--color-accent);
}
.text-grey {
  color: var(--color-grey);
}
.text-black {
  color: var(--color-black);
}
.text-white {
  color: var(--color-white);
}

/* ========================================
   LOGOGRAPHIC FONTS
   ======================================== */

.text-japanese {
  font-family: var(--font-logographic-jp);
}

.text-chinese {
  font-family: var(--font-logographic-sc);
}
```

## 6. Базовые стили для элементов

```css
/* ========================================
   BASE STYLES
   ======================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: var(--text-16);
  line-height: 1.6;
  color: var(--color-black);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ========================================
   HEADINGS
   ======================================== */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  color: var(--color-fathom-100);
  margin-bottom: 1rem;
}

h1 {
  font-size: var(--text-24);
  line-height: 1.3;
  font-weight: 700; /* Bold - Madagascar */
}

h2 {
  font-size: var(--text-22);
  line-height: 1.3;
  font-weight: 500; /* Medium - Iceland */
}

h3 {
  font-size: var(--text-20);
  line-height: 1.4;
  font-weight: 400; /* Regular - Antarctica */
}

h4 {
  font-size: var(--text-18);
  line-height: 1.4;
  font-weight: 500; /* Medium - Iceland */
}

h5 {
  font-size: var(--text-16);
  line-height: 1.5;
  font-weight: 500; /* Medium - Iceland */
}

h6 {
  font-size: var(--text-14);
  line-height: 1.5;
  font-weight: 700; /* Bold - Madagascar */
}

/* ========================================
   TEXT ELEMENTS
   ======================================== */

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

strong,
b {
  font-weight: 700; /* Bold - Madagascar */
}

em,
i {
  font-style: italic;
}

small {
  font-size: var(--text-12);
}

/* ========================================
   LINKS
   ======================================== */

a {
  color: var(--color-fathom-100);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

/* ========================================
   LANGUAGE SPECIFIC
   ======================================== */

:lang(ja) {
  font-family: var(--font-logographic-jp);
}

:lang(zh) {
  font-family: var(--font-logographic-sc);
}
```

## 7. Примеры использования

### Пример 1: Все начертания шрифтов

```html
<!-- ========================================
     NEUE MONTREAL - Все стили из брендбука
     ======================================== -->

<!-- NAMIBIA - Light -->
<p class="font-sans font-light text-16pt text-fathom">
  Namibia style - Light (300)
</p>

<!-- ARGENTINA - Light Italic -->
<p class="font-sans font-light italic text-16pt text-fathom">
  Argentina style - Light Italic (300)
</p>

<!-- ANTARCTICA - Regular -->
<p class="font-sans font-regular text-16pt text-black">
  Antarctica style - Regular (400) - Основной текст
</p>

<!-- ECUADOR - Italic -->
<p class="font-sans font-regular italic text-16pt text-black">
  Ecuador style - Italic (400)
</p>

<!-- ICELAND - Medium -->
<p class="font-sans font-medium text-16pt text-fathom">
  Iceland style - Medium (500)
</p>

<!-- GREENLAND - Medium Italic -->
<p class="font-sans font-medium italic text-16pt text-fathom">
  Greenland style - Medium Italic (500)
</p>

<!-- MADAGASCAR - Bold -->
<p class="font-sans font-bold text-18pt text-fathom">
  Madagascar style - Bold (700)
</p>

<!-- NORWAY - Bold Italic -->
<p class="font-sans font-bold italic text-18pt text-fathom">
  Norway style - Bold Italic (700)
</p>

<!-- ========================================
     NON NATURAL GROTESK - Все стили
     ======================================== -->

<!-- NAMIBIA - Light -->
<h1 class="font-display font-light text-24pt text-fathom">
  Namibia style - Light Display (300)
</h1>

<!-- ANTARCTICA - Regular -->
<h2 class="font-display font-regular text-22pt text-fathom">
  Antarctica style - Regular Display (400)
</h2>

<!-- ICELAND - Medium -->
<h3 class="font-display font-medium text-20pt text-fathom">
  Iceland style - Medium Display (500)
</h3>

<!-- MADAGASCAR - Bold -->
<h4 class="font-display font-bold text-18pt text-fathom">
  Madagascar style - Bold Display (700)
</h4>
```

### Пример 2: Типографическая шкала

```html
<div class="space-y-4">
  <p class="text-10pt font-sans text-black">
    10pt - Мелкий текст, сноски, копирайт
  </p>

  <p class="text-12pt font-sans text-black">
    12pt - Подписи к изображениям, вспомогательный текст
  </p>

  <p class="text-14pt font-sans text-black">
    14pt - Малый текст, навигация, метаданные
  </p>

  <p class="text-16pt font-sans text-black">
    16pt - Основной текст, параграфы (базовый размер)
  </p>

  <p class="text-18pt font-sans text-fathom">
    18pt - Крупный текст, лид-параграфы, важные акценты
  </p>

  <p class="text-20pt font-display font-medium text-fathom">
    20pt - Подзаголовок H3, заголовки карточек
  </p>

  <p class="text-22pt font-display font-medium text-fathom">
    22pt - Подзаголовок H2, заголовки секций
  </p>

  <p class="text-24pt font-display font-bold text-fathom">
    24pt - Главный заголовок H1, заголовки страниц
  </p>
</div>
```

### Пример 3: Цветовые комбинации

```html
<!-- Primary Fathom 100% -->
<div class="bg-fathom text-white p-8 mb-4">
  <h2 class="font-display font-bold text-22pt mb-3">Fathom 100% (#004657)</h2>
  <p class="font-sans text-16pt">
    Основной цвет бренда. CMYK: 100 10 20 70, RGB: 0 70 87, PANTONE: 7706 U
  </p>
</div>

<!-- Fathom 60% -->
<div class="bg-fathom-60 text-white p-8 mb-4">
  <h2 class="font-display font-medium text-20pt mb-3">Fathom 60% (#4D8A98)</h2>
  <p class="font-sans text-16pt">
    60% оттенок для вариаций и secondary элементов
  </p>
</div>

<!-- Fathom 40% -->
<div class="bg-fathom-40 text-fathom p-8 mb-4">
  <h2 class="font-display font-medium text-20pt mb-3">Fathom 40% (#99BDC5)</h2>
  <p class="font-sans text-16pt text-black">
    40% оттенок для фонов и светлых вариаций
  </p>
</div>

<!-- Accent Color -->
<div class="bg-accent text-white p-8 mb-4">
  <h2 class="font-display font-bold text-20pt mb-3">Accent Color (#be8f74)</h2>
  <p class="font-sans text-16pt">
    Акцентный цвет. CMYK: 9 31 31 16, RGB: 190 143 118, PANTONE: 4715 U
  </p>
</div>

<!-- Grey Background -->
<div class="bg-grey text-black p-8 mb-4">
  <h2 class="font-display font-medium text-20pt text-fathom mb-3">
    Grey Background (#e8e6e5)
  </h2>
  <p class="font-sans text-16pt">
    Нейтральный фон. CMYK: 5 5 5 5, RGB: 232 231 230
  </p>
</div>

<!-- Black Text -->
<div class="bg-white text-black p-8 border border-grey">
  <h2 class="font-display font-medium text-20pt text-fathom mb-3">
    Black/Dark Grey (#6D6E71)
  </h2>
  <p class="font-sans text-16pt">
    Основной цвет текста. CMYK: 0 0 0 80, RGB: 109 110 113
  </p>
</div>
```

### Пример 4: Карточка продукта

```html
<article class="bg-white rounded-lg shadow-lg overflow-hidden max-w-md">
  <!-- Header с фоном -->
  <div class="bg-fathom text-white p-6">
    <h2 class="font-display font-bold text-22pt mb-2">Название продукта</h2>
    <p class="font-sans font-light text-14pt">Категория</p>
  </div>

  <!-- Content -->
  <div class="p-6">
    <!-- Лид текст -->
    <p class="font-sans font-medium text-18pt text-fathom mb-4">
      Краткое описание продукта, которое привлекает внимание
    </p>

    <!-- Основной текст -->
    <p class="font-sans font-regular text-16pt text-black mb-4">
      Подробное описание со всеми характеристиками. Используем
      <strong>жирный текст</strong> для акцентов и <em>курсив</em> для
      выделений.
    </p>

    <!-- Список характеристик -->
    <ul class="space-y-2 mb-6">
      <li class="font-sans text-14pt text-black">• Характеристика 1</li>
      <li class="font-sans text-14pt text-black">• Характеристика 2</li>
      <li class="font-sans text-14pt text-black">• Характеристика 3</li>
    </ul>

    <!-- Цена -->
    <div class="flex items-baseline gap-2 mb-6">
      <span class="font-display font-bold text-24pt text-accent"> $299 </span>
      <span class="font-sans font-light text-14pt text-black line-through">
        $399
      </span>
    </div>

    <!-- Кнопка -->
    <button
      class="w-full bg-fathom hover:bg-accent text-white font-sans font-medium text-16pt py-3 px-6 rounded transition-colors duration-200"
    >
      Купить сейчас
    </button>

    <!-- Мелкий текст -->
    <p class="font-sans font-light text-12pt text-black mt-4 text-center">
      * Бесплатная доставка при заказе от $100
    </p>
  </div>
</article>
```

### Пример 5: Навигация

```html
<nav class="bg-white border-b border-grey">
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Лого -->
      <a href="/" class="font-display font-bold text-20pt text-fathom">
        Fathom
      </a>

      <!-- Меню -->
      <ul class="flex gap-8">
        <li>
          <a
            href="#"
            class="font-sans font-medium text-14pt text-black hover:text-fathom transition-colors"
          >
            Продукты
          </a>
        </li>
        <li>
          <a
            href="#"
            class="font-sans font-medium text-14pt text-black hover:text-fathom transition-colors"
          >
            О нас
          </a>
        </li>
        <li>
          <a
            href="#"
            class="font-sans font-medium text-14pt text-black hover:text-fathom transition-colors"
          >
            Контакты
          </a>
        </li>
      </ul>

      <!-- CTA Button -->
      <button
        class="bg-accent hover:bg-fathom text-white font-sans font-medium text-14pt px-6 py-2 rounded transition-colors duration-200"
      >
        Начать
      </button>
    </div>
  </div>
</nav>
```

### Пример 6: Форма

```html
<form class="bg-grey p-8 rounded-lg max-w-lg">
  <h2 class="font-display font-bold text-22pt text-fathom mb-6">
    Свяжитесь с нами
  </h2>

  <!-- Имя -->
  <div class="mb-4">
    <label class="font-sans font-medium text-14pt text-black block mb-2">
      Ваше имя
    </label>
    <input
      type="text"
      class="w-full font-sans text-16pt text-black px-4 py-3 rounded border border-grey focus:border-fathom focus:outline-none"
      placeholder="Иван Иванов"
    />
  </div>

  <!-- Email -->
  <div class="mb-4">
    <label class="font-sans font-medium text-14pt text-black block mb-2">
      Email
    </label>
    <input
      type="email"
      class="w-full font-sans text-16pt text-black px-4 py-3 rounded border border-grey focus:border-fathom focus:outline-none"
      placeholder="ivan@example.com"
    />
  </div>

  <!-- Сообщение -->
  <div class="mb-6">
    <label class="font-sans font-medium text-14pt text-black block mb-2">
      Сообщение
    </label>
    <textarea
      rows="4"
      class="w-full font-sans text-16pt text-black px-4 py-3 rounded border border-grey focus:border-fathom focus:outline-none resize-none"
      placeholder="Ваше сообщение..."
    ></textarea>
  </div>

  <!-- Submit -->
  <button
    type="submit"
    class="w-full bg-fathom hover:bg-accent text-white font-sans font-bold text-16pt py-3 rounded transition-colors duration-200"
  >
    Отправить
  </button>

  <p class="font-sans font-light text-12pt text-black text-center mt-4">
    Мы ответим в течение 24 часов
  </p>
</form>
```

### Пример 7: CJK языки

```html
<!-- Японский текст -->
<div lang="ja" class="p-6 border border-grey rounded">
  <h2 class="font-logographic text-20pt font-medium text-fathom mb-4">
    日本語のタイトル
  </h2>
  <p class="font-logographic text-16pt text-black leading-relaxed">
    これは日本語のテキストの例です。Noto Sans JPフォントを使用しています。
    このフォントは、Neue MontrealやNON Natural Groteskと調和するように
    選ばれました。
  </p>
</div>

<!-- Китайский текст -->
<div lang="zh" class="p-6 border border-grey rounded mt-4">
  <h2 class="font-logographic text-20pt font-medium text-fathom mb-4">
    中文标题
  </h2>
  <p class="font-logographic text-16pt text-black leading-relaxed">
    这是中文文本示例。使用Noto Sans SC字体。 此字体与Neue Montreal和NON Natural
    Grotesk和谐搭配。
  </p>
</div>
```

## 8. Готовый HTML шаблон

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fathom Brand Typography</title>

    <!-- Google Fonts для CJK -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />

    <!-- Preload критичных шрифтов -->
    <link
      rel="preload"
      href="/fonts/NeueMontreal-Regular.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="/fonts/NONNaturalGrotesk-Bold.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <style>
      /* Импорт всех шрифтов */
      /* (Вставьте сюда все @font-face из раздела 1) */

      /* CSS Variables */
      /* (Вставьте сюда все переменные из раздела 3) */

      /* Base Styles */
      /* (Вставьте сюда базовые стили из раздела 6) */

      /* Utility Classes */
      /* (Вставьте сюда классы из раздела 5) */
    </style>

    <!-- Или подключите Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              fathom: {
                DEFAULT: "#004657",
                60: "#4D8A98",
                40: "#99BDC5",
              },
              accent: "#be8f74",
              black: "#6D6E71",
              grey: "#e8e6e5",
            },
            fontFamily: {
              display: ["NON Natural Grotesk", "sans-serif"],
              sans: ["Neue Montreal", "sans-serif"],
              logographic: ["Noto Sans JP", "Noto Sans SC", "sans-serif"],
            },
          },
        },
      };
    </script>
  </head>
  <body class="font-sans text-black bg-white">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <h1 class="font-display font-bold text-24pt text-fathom mb-6">
        Добро пожаловать в Fathom
      </h1>

      <p class="font-sans font-medium text-18pt text-fathom mb-4">
        Краткое описание с крупным текстом
      </p>

      <p class="font-sans font-regular text-16pt text-black mb-4">
        Основной текст вашего контента. Используйте <strong>жирный</strong> для
        выделения важного и <em>курсив</em> для акцентов.
      </p>

      <button
        class="bg-fathom hover:bg-accent text-white font-sans font-medium text-16pt px-6 py-3 rounded transition-colors"
      >
        Кнопка действия
      </button>
    </div>
  </body>
</html>
```

## 9. Чек-лист правильного использования

### ✅ Шрифты

- **Заголовки (H1-H6):** NON Natural Grotesk (font-display)
- **Основной текст:** Neue Montreal (font-sans)
- **CJK языки:** Noto Sans JP/SC (font-logographic)

### ✅ Начертания (из брендбука)

- **Light (300):** Namibia - тонкий текст
- **Regular (400):** Antarctica - основной текст
- **Medium (500):** Iceland - подзаголовки
- **Bold (700):** Madagascar - акценты

### ✅ Цвета

- **Primary:** #004657 (Fathom 100%)
- **Secondary:** #4D8A98 (Fathom 60%), #99BDC5 (Fathom 40%)
- **Accent:** #be8f74
- **Text:** #6D6E71 (Black)
- **Background:** #e8e6e5 (Grey), #FFFFFF (White)

### ✅ Размеры (из брендбука)

- **10pt:** Сноски
- **12pt:** Подписи
- **14pt:** Навигация
- **16pt:** Основной текст
- **18pt:** Лид-параграфы
- **20pt:** H3
- **22pt:** H2
- **24pt:** H1

Теперь у вас есть полная типографическая система с оригинальными шрифтами! 🎉
