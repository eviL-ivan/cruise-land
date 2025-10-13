// Типы для переопределения контента круиза
// Позволяет переопределить любую часть контента для конкретного круиза

export interface CruiseContentOverride {
  // Переопределение overview секции
  overview?: {
    price?: string
    priceNote?: string
    description?: string
    detailedDescription?: string
  }

  // Переопределение meta
  meta?: {
    title?: string
    description?: string
  }

  // Переопределение hero
  hero?: {
    title?: string
    titleAccent?: string
    subtitle?: string
    highlight?: string
  }

  // Переопределение CTA
  cta?: {
    title?: string
    subtitle?: string
    stats?: Array<{
      number: string
      label: string
    }>
  }

  // Можно добавить любые другие секции для переопределения
  [key: string]: any
}
