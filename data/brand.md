# Рекомендации для фронтендера на основе брендбука

## Tailwind CSS Configuration

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
          60: "#4D8A98", // calculated 60% tint
          40: "#99BDC5", // calculated 40% tint
        },
        accent: {
          DEFAULT: "#be8f74",
        },
        // Neutrals
        black: "#6D6E71",
        grey: "#e8e6e5",
      },
      fontFamily: {
        display: ["NON Natural Grotesk", "sans-serif"],
        sans: ["Neue Montreal", "sans-serif"],
        logographic: [
          "Noto Sans",
          "Noto Sans JP",
          "Noto Sans SC",
          "sans-serif",
        ],
      },
      fontSize: {
        10: "10pt",
        12: "12pt",
        14: "14pt",
        16: "16pt",
        18: "18pt",
        20: "20pt",
        22: "22pt",
        24: "24pt",
      },
    },
  },
};
```

## CSS Variables

```css
:root {
  /* Primary Colors */
  --color-fathom-100: #004657;
  --color-fathom-100-cmyk: 100% 10% 20% 70%;
  --color-fathom-100-rgb: 0, 70, 87;

  --color-fathom-60: #4d8a98;
  --color-fathom-40: #99bdc5;

  --color-accent: #be8f74;
  --color-accent-cmyk: 9% 31% 31% 16%;
  --color-accent-rgb: 190, 143, 118;

  /* Neutrals */
  --color-black: #6d6e71;
  --color-black-cmyk: 0% 0% 0% 80%;
  --color-black-rgb: 109, 110, 113;

  --color-white: #ffffff;

  --color-grey: #e8e6e5;
  --color-grey-cmyk: 5% 5% 5% 5%;
  --color-grey-rgb: 232, 231, 230;

  /* Typography */
  --font-display: "NON Natural Grotesk", sans-serif;
  --font-main: "Neue Montreal", sans-serif;
  --font-logographic: "Noto Sans", "Noto Sans JP", "Noto Sans SC", sans-serif;
}
```

## Готовые CSS классы

```css
/* Typography Classes */
.text-display {
  font-family: var(--font-display);
}

.text-main {
  font-family: var(--font-main);
}

.text-logographic {
  font-family: var(--font-logographic);
}

/* Color Classes */
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

.text-fathom {
  color: var(--color-fathom-100);
}

.text-accent {
  color: var(--color-accent);
}

.text-black {
  color: var(--color-black);
}
```

## Примеры использования

```html
<!-- С Tailwind -->
<h1 class="font-display text-4xl text-fathom">Заголовок</h1>
<p class="font-sans text-16 text-black">Основной текст</p>
<button class="bg-fathom text-white px-6 py-3">Кнопка</button>
<div class="bg-accent text-white p-4">Акцентный блок</div>

<!-- С обычным CSS -->
<h1 class="text-display" style="color: var(--color-fathom-100);">Заголовок</h1>
<p class="text-main" style="color: var(--color-black);">Текст</p>
```

## Импорт шрифтов

```css
/* Подключение шрифтов */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

/* NON Natural Grotesk и Neue Montreal - потребуют лицензии и локального размещения */
@font-face {
  font-family: "NON Natural Grotesk";
  src: url("/fonts/NONNaturalGrotesk-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
```
