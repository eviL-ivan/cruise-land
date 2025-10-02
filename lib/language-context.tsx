'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { content as ruContent } from './content'
import { content as enContent } from './content.en'
import { content as zhContent } from './content.zh'

type Language = 'ru' | 'en' | 'zh'
type Content = typeof ruContent

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  content: Content
}>({
  language: 'en',
  setLanguage: () => {},
  content: enContent,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Динамическая загрузка контента в зависимости от языка
  const content = useMemo((): Content => {
    switch (language) {
      case 'ru':
        return ruContent
      case 'en':
        return enContent
      case 'zh':
        return zhContent
      default:
        return enContent
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
