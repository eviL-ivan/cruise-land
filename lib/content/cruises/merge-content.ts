// Утилита для слияния базового контента с переопределениями для конкретного круиза

import { CRUISE_CODE } from "@/lib/cruise-config"
import type { CruiseContentOverride } from "./types"

/**
 * Глубокое слияние объектов
 * Переопределения имеют приоритет над базовыми значениями
 */
function deepMerge<T extends Record<string, any>>(base: T, override: Partial<T>): T {
  const result = { ...base }

  for (const key in override) {
    const overrideValue = override[key]
    const baseValue = result[key]

    if (overrideValue === undefined) {
      continue
    }

    // Если оба значения - объекты (но не массивы), мерджим рекурсивно
    if (
      typeof overrideValue === "object" &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue)
    } else {
      // Иначе просто заменяем значение
      result[key] = overrideValue as T[Extract<keyof T, string>]
    }
  }

  return result
}

/**
 * Применяет переопределения для текущего круиза к базовому контенту
 */
export async function applyCruiseOverrides<T extends Record<string, any>>(
  baseContent: T
): Promise<T> {
  try {
    // Динамически импортируем переопределения для текущего круиза
    const overrideModule = await import(`./${CRUISE_CODE}/override`)
    const override: CruiseContentOverride = overrideModule.override

    if (!override || Object.keys(override).length === 0) {
      return baseContent
    }

    // Применяем переопределения
    return deepMerge(baseContent, override as Partial<T>)
  } catch (error) {
    // Если файл с переопределениями не найден - возвращаем базовый контент
    console.log(`No overrides found for cruise ${CRUISE_CODE}, using base content`)
    return baseContent
  }
}

/**
 * Синхронная версия для использования в серверных компонентах
 * Использует require вместо динамического import
 */
export function applyCruiseOverridesSync<T extends Record<string, any>>(
  baseContent: T
): T {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const overrideModule = require(`./${CRUISE_CODE}/override`)
    const override: CruiseContentOverride = overrideModule.override

    if (!override || Object.keys(override).length === 0) {
      return baseContent
    }

    return deepMerge(baseContent, override as Partial<T>)
  } catch (error) {
    // Если файл с переопределениями не найден - возвращаем базовый контент
    return baseContent
  }
}
