"use client"

import { useEffect } from "react"

export function ErudaInit() {
  useEffect(() => {
    // Инициализировать eruda только в браузере
    if (typeof window !== "undefined") {
      import("eruda").then((eruda) => {
        eruda.default.init()
        eruda.default.show()
      })
    }
  }, [])

  return null
}
