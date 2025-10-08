"use client"

import * as React from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

const countries = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "nl", label: "Netherlands" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "dk", label: "Denmark" },
  { value: "fi", label: "Finland" },
  { value: "ch", label: "Switzerland" },
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "ie", label: "Ireland" },
  { value: "nz", label: "New Zealand" },
  { value: "jp", label: "Japan" },
  { value: "sg", label: "Singapore" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "ru", label: "Russia" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "ar", label: "Argentina" },
  { value: "za", label: "South Africa" },
]

// Дефолтные страны по языкам
const defaultCountryByLanguage: Record<string, string> = {
  en: "us",
  ru: "ru",
  zh: "cn",
}

const getUserCountry = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/')
    const data = await response.json()
    return data.countryCode?.toLowerCase() || null
  } catch (error) {
    return null
  }
}

interface CountryAutocompleteProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  autoDetect?: boolean
}

export function CountryAutocomplete({
  value,
  onValueChange,
  placeholder = "Country",
  required = false,
  autoDetect = true,
}: CountryAutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const { language } = useLanguage()
  const hasAutoDetected = React.useRef(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Автоопределение страны при монтировании (только один раз)
  React.useEffect(() => {
    if (!autoDetect || hasAutoDetected.current) return

    hasAutoDetected.current = true

    const detectCountry = async () => {
      const detectedCountry = await getUserCountry()

      // Проверяем что страна есть в списке
      const countryExists = countries.some(c => c.value === detectedCountry)

      if (detectedCountry && countryExists) {
        onValueChange?.(detectedCountry)
      } else {
        // Fallback на дефолтную страну по языку
        const defaultCountry = defaultCountryByLanguage[language] || "us"
        onValueChange?.(defaultCountry)
      }
    }

    detectCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Автофокус на поиске и закрытие при клике вне
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus()
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (countryValue: string) => {
    onValueChange?.(countryValue)
    setOpen(false)
    setSearchQuery("")
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-14 flex items-center justify-between bg-transparent border-0 border-b-2 border-foreground/20 rounded-none hover:border-foreground/60 transition-all duration-300 text-base font-light px-0 text-left focus:outline-none focus:border-foreground/60"
      >
        <span className={cn("text-foreground/50", value && "text-foreground")}>
          {value ? countries.find((country) => country.value === value)?.label : placeholder}
          {required && !value && <span className="text-destructive ml-1">*</span>}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-md shadow-md"
        >
          {/* Search */}
          <div className="flex items-center border-b border-border px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* List */}
          <div className="max-h-[300px] overflow-y-auto p-1">
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No country found.
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.value}
                  type="button"
                  onClick={() => handleSelect(country.value)}
                  className="w-full flex items-center px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-left"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
