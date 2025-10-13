// Переопределения контента для круиза CPTUSH25
// Здесь можно переопределить любые поля из базового контента

import type { CruiseContentOverride } from "../types"

export const override: CruiseContentOverride = {
  // Переопределяем статистику для 30-дневного круиза
  cta: {
    stats: [
      { number: "30", label: "Days of Travel" },
      { number: "5", label: "Penguin Species" },
      { number: "∞", label: "Unforgettable Moments" },
    ],
  },

  // Примеры других возможных переопределений:

  // Цена
  // overview: {
  //   price: "$15,280",
  // },

  // Описание
  // overview: {
  //   description: "Специальное описание для круиза 2025 года",
  // },

  // Заголовок Hero
  // hero: {
  //   title: "Summer Antarctic Expedition",
  // },
}
