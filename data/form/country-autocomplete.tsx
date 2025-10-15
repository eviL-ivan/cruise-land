"use client"

import * as React from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

// Полный список стран из Bitrix24 с ISO кодами для автоопределения
const countries = [
  { value: "5907", label: "Bahamas", code: "BS" },
  { value: "5908", label: "Bermuda", code: "BM" },
  { value: "5909", label: "Canada", code: "CA" },
  { value: "5910", label: "Dominican Republic", code: "DO" },
  { value: "5911", label: "Jamaica", code: "JM" },
  { value: "5912", label: "Mexico", code: "MX" },
  { value: "5913", label: "St Pierre and Miquelon", code: "PM" },
  { value: "5914", label: "United States of America", code: "US" },
  { value: "5915", label: "Ireland", code: "IE" },
  { value: "5916", label: "Isle of Man", code: "IM" },
  { value: "5917", label: "United Kingdom", code: "GB" },
  { value: "5918", label: "Bangladesh", code: "BD" },
  { value: "5919", label: "Bhutan", code: "BT" },
  { value: "5920", label: "Brunei Darussalam", code: "BN" },
  { value: "5921", label: "Cambodia", code: "KH" },
  { value: "5922", label: "China", code: "CN" },
  { value: "5923", label: "Christmas Islands", code: "CX" },
  { value: "5924", label: "Fed States of Micronesia", code: "FM" },
  { value: "5925", label: "Hong Kong", code: "HK" },
  { value: "5926", label: "India", code: "IN" },
  { value: "5927", label: "Indonesia", code: "ID" },
  { value: "5928", label: "Korea, Republic of", code: "KR" },
  { value: "5929", label: "Lao People's Democratic Rep", code: "LA" },
  { value: "5930", label: "Macau", code: "MO" },
  { value: "5931", label: "Malaysia", code: "MY" },
  { value: "5932", label: "Maldives", code: "MV" },
  { value: "5933", label: "Marshall Islands", code: "MH" },
  { value: "5934", label: "Mongolia", code: "MN" },
  { value: "5935", label: "Myanmar (former Burma)", code: "MM" },
  { value: "5936", label: "Nepal", code: "NP" },
  { value: "5937", label: "Northern Marianas", code: "MP" },
  { value: "5938", label: "Pakistan", code: "PK" },
  { value: "5939", label: "Palau", code: "PW" },
  { value: "5940", label: "Philippines", code: "PH" },
  { value: "5941", label: "Singapore", code: "SG" },
  { value: "5942", label: "Sri Lanka", code: "LK" },
  { value: "5943", label: "Taiwan", code: "TW" },
  { value: "5944", label: "Thailand", code: "TH" },
  { value: "5945", label: "Vietnam", code: "VN" },
  { value: "5946", label: "Belgium", code: "BE" },
  { value: "5947", label: "France", code: "FR" },
  { value: "5948", label: "Guernsey", code: "GG" },
  { value: "5949", label: "Jersey", code: "JE" },
  { value: "5950", label: "Luxembourg", code: "LU" },
  { value: "5951", label: "Malta", code: "MT" },
  { value: "5952", label: "Monaco", code: "MC" },
  { value: "5953", label: "Netherlands", code: "NL" },
  { value: "5954", label: "Afghanistan", code: "AF" },
  { value: "5955", label: "Albania", code: "AL" },
  { value: "5956", label: "Armenia", code: "AM" },
  { value: "5957", label: "Azerbaijan", code: "AZ" },
  { value: "5958", label: "Belarus", code: "BY" },
  { value: "5959", label: "Bosnia and Herzegowina", code: "BA" },
  { value: "5960", label: "Bulgaria", code: "BG" },
  { value: "5961", label: "Croatia", code: "HR" },
  { value: "5962", label: "Czech Republic", code: "CZ" },
  { value: "5963", label: "Estonia", code: "EE" },
  { value: "5964", label: "Georgia", code: "GE" },
  { value: "5965", label: "Hungary", code: "HU" },
  { value: "5966", label: "Kazakhstan", code: "KZ" },
  { value: "5967", label: "Kyrgyzstan", code: "KG" },
  { value: "5968", label: "Latvia", code: "LV" },
  { value: "5969", label: "Lithuania", code: "LT" },
  { value: "5970", label: "Moldova", code: "MD" },
  { value: "5971", label: "Poland", code: "PL" },
  { value: "5972", label: "Romania", code: "RO" },
  { value: "5973", label: "Russian Federation", code: "RU" },
  { value: "5974", label: "Serbia", code: "RS" },
  { value: "5975", label: "Slovakia", code: "SK" },
  { value: "5976", label: "Slovenia", code: "SI" },
  { value: "5977", label: "Tajikistan", code: "TJ" },
  { value: "5978", label: "Turkmenistan", code: "TM" },
  { value: "5979", label: "Ukraine", code: "UA" },
  { value: "5980", label: "Uzbekistan", code: "UZ" },
  { value: "5981", label: "American samoa", code: "AS" },
  { value: "5982", label: "Australia", code: "AU" },
  { value: "5983", label: "Cook Islands", code: "CK" },
  { value: "5984", label: "Fiji", code: "FJ" },
  { value: "5985", label: "Kiribati", code: "KI" },
  { value: "5986", label: "Naurua", code: "NR" },
  { value: "5987", label: "New Caledonia", code: "NC" },
  { value: "5988", label: "New Zealand", code: "NZ" },
  { value: "5989", label: "Papua New Guinea", code: "PG" },
  { value: "5990", label: "Solomon Islands", code: "SB" },
  { value: "5991", label: "Tokelau", code: "TK" },
  { value: "5992", label: "Tuvalu", code: "TV" },
  { value: "5993", label: "US Minor Outlying Islands", code: "UM" },
  { value: "5994", label: "Vanuatu", code: "VU" },
  { value: "5995", label: "Wallis and Futuna Islands", code: "WF" },
  { value: "5996", label: "Åland Islands", code: "AX" },
  { value: "5997", label: "Denmark", code: "DK" },
  { value: "5998", label: "Faeroe Islands", code: "FO" },
  { value: "5999", label: "Finland", code: "FI" },
  { value: "6000", label: "Greenland", code: "GL" },
  { value: "6001", label: "Iceland", code: "IS" },
  { value: "6002", label: "Norway", code: "NO" },
  { value: "6003", label: "Svalbard and Jan Mayen", code: "SJ" },
  { value: "6004", label: "Sweden", code: "SE" },
  { value: "6005", label: "Andorra", code: "AD" },
  { value: "6006", label: "Cyprus", code: "CY" },
  { value: "6007", label: "Gibraltar", code: "GI" },
  { value: "6008", label: "Greece", code: "GR" },
  { value: "6009", label: "Italy", code: "IT" },
  { value: "6010", label: "Liechtenstein", code: "LI" },
  { value: "6011", label: "Macedonia", code: "MK" },
  { value: "6012", label: "Montenegro", code: "ME" },
  { value: "6013", label: "Portugal", code: "PT" },
  { value: "6014", label: "San Marino", code: "SM" },
  { value: "6015", label: "Spain", code: "ES" },
  { value: "6016", label: "Vatican City State", code: "VA" },
  { value: "6017", label: "Algeria", code: "DZ" },
  { value: "6018", label: "Angola", code: "AO" },
  { value: "6019", label: "Bahrain", code: "BH" },
  { value: "6020", label: "Benin", code: "BJ" },
  { value: "6021", label: "Botswana", code: "BW" },
  { value: "6022", label: "Burkina Faso", code: "BF" },
  { value: "6023", label: "Burundi", code: "BI" },
  { value: "6024", label: "Cameroon", code: "CM" },
  { value: "6025", label: "Cape Verde", code: "CV" },
  { value: "6026", label: "Central African Republic", code: "CF" },
  { value: "6027", label: "Comoros", code: "KM" },
  { value: "6028", label: "Cote d'Ivoire", code: "CI" },
  { value: "6029", label: "Egypt", code: "EG" },
  { value: "6030", label: "Equatorial Guinea", code: "GQ" },
  { value: "6031", label: "Eritrea", code: "ER" },
  { value: "6032", label: "Ethiopia", code: "ET" },
  { value: "6033", label: "French Southern Territories", code: "TF" },
  { value: "6034", label: "Gabon", code: "GA" },
  { value: "6035", label: "Gambia", code: "GM" },
  { value: "6036", label: "Ghana", code: "GH" },
  { value: "6037", label: "Guinea", code: "GN" },
  { value: "6038", label: "Iran (islamic republic of)", code: "IR" },
  { value: "6039", label: "Iraq", code: "IQ" },
  { value: "6040", label: "Israel", code: "IL" },
  { value: "6041", label: "Jordan", code: "JO" },
  { value: "6042", label: "Kenya", code: "KE" },
  { value: "6043", label: "Kuwait", code: "KW" },
  { value: "6044", label: "Lebanon", code: "LB" },
  { value: "6045", label: "Lesotho", code: "LS" },
  { value: "6046", label: "Liberia", code: "LR" },
  { value: "6047", label: "Libya", code: "LY" },
  { value: "6048", label: "Madagascar", code: "MG" },
  { value: "6049", label: "Malawi", code: "MW" },
  { value: "6050", label: "Mali", code: "ML" },
  { value: "6051", label: "Mauritania", code: "MR" },
  { value: "6052", label: "Mauritius", code: "MU" },
  { value: "6053", label: "Mayotte", code: "YT" },
  { value: "6054", label: "Morocco", code: "MA" },
  { value: "6055", label: "Mozambique", code: "MZ" },
  { value: "6056", label: "Namibia", code: "NA" },
  { value: "6057", label: "Niger", code: "NE" },
  { value: "6058", label: "Nigeria", code: "NG" },
  { value: "6059", label: "Oman", code: "OM" },
  { value: "6060", label: "Qatar", code: "QA" },
  { value: "6061", label: "Reunion", code: "RE" },
  { value: "6062", label: "Sao Tome and Principe", code: "ST" },
  { value: "6063", label: "Saudi Arabia", code: "SA" },
  { value: "6064", label: "Senegal", code: "SN" },
  { value: "6065", label: "Seychelles", code: "SC" },
  { value: "6066", label: "Sierra Leone", code: "SL" },
  { value: "6067", label: "Somalia", code: "SO" },
  { value: "6068", label: "South Africa", code: "ZA" },
  { value: "6069", label: "St. Helena, Ascension and Tristan da Cunha", code: "SH" },
  { value: "6070", label: "Sudan", code: "SD" },
  { value: "6071", label: "Swaziland", code: "SZ" },
  { value: "6072", label: "Syrian Arab Republic", code: "SY" },
  { value: "6073", label: "Tanzania", code: "TZ" },
  { value: "6074", label: "Togo", code: "TG" },
  { value: "6075", label: "Tunisia", code: "TN" },
  { value: "6076", label: "Turkey", code: "TR" },
  { value: "6077", label: "Uganda", code: "UG" },
  { value: "6078", label: "United Arab Emirates", code: "AE" },
  { value: "6079", label: "Western Sahara", code: "EH" },
  { value: "6080", label: "Yemen", code: "YE" },
  { value: "6081", label: "Zambia", code: "ZM" },
  { value: "6082", label: "Zimbabwe", code: "ZW" },
  { value: "6083", label: "Japan", code: "JP" },
  { value: "6084", label: "Anguilla", code: "AI" },
  { value: "6085", label: "Antarctica", code: "AQ" },
  { value: "6086", label: "Antigua and Barbuda", code: "AG" },
  { value: "6087", label: "Argentina", code: "AR" },
  { value: "6088", label: "Aruba", code: "AW" },
  { value: "6089", label: "Barbados", code: "BB" },
  { value: "6090", label: "Belize", code: "BZ" },
  { value: "6091", label: "Bolivia", code: "BO" },
  { value: "6092", label: "Brazil", code: "BR" },
  { value: "6093", label: "British Virgin Islands", code: "VG" },
  { value: "6094", label: "Cayman Islands", code: "KY" },
  { value: "6095", label: "Chile", code: "CL" },
  { value: "6096", label: "Colombia", code: "CO" },
  { value: "6097", label: "Costa Rica", code: "CR" },
  { value: "6098", label: "Cuba", code: "CU" },
  { value: "6099", label: "Curaçao", code: "CW" },
  { value: "6100", label: "Dominica", code: "DM" },
  { value: "6101", label: "Ecuador", code: "EC" },
  { value: "6102", label: "El Salvador", code: "SV" },
  { value: "6103", label: "Falkland Islands", code: "FK" },
  { value: "6104", label: "French Antilles", code: "GP" },
  { value: "6105", label: "French Guiana", code: "GF" },
  { value: "6106", label: "French Polynesia", code: "PF" },
  { value: "6107", label: "French West Indies", code: "MQ" },
  { value: "6108", label: "Grenada", code: "GD" },
  { value: "6109", label: "Guam", code: "GU" },
  { value: "6110", label: "Guatemala", code: "GT" },
  { value: "6111", label: "Guyana", code: "GY" },
  { value: "6112", label: "Haiti", code: "HT" },
  { value: "6113", label: "Honduras", code: "HN" },
  { value: "6114", label: "Martinique", code: "MQ" },
  { value: "6115", label: "Montserrat", code: "MS" },
  { value: "6116", label: "Nicaragua", code: "NI" },
  { value: "6117", label: "Norfolk Island", code: "NF" },
  { value: "6118", label: "Panama", code: "PA" },
  { value: "6119", label: "Paraguay", code: "PY" },
  { value: "6120", label: "Peru", code: "PE" },
  { value: "6121", label: "Puerto Rico", code: "PR" },
  { value: "6122", label: "Samoa Islands", code: "WS" },
  { value: "6123", label: "Sint Maarten", code: "SX" },
  { value: "6124", label: "South Georgia and the South Sandwich Islands", code: "GS" },
  { value: "6125", label: "St Kitts and Nevis", code: "KN" },
  { value: "6126", label: "St Lucia", code: "LC" },
  { value: "6127", label: "St Vincent and Grenadines", code: "VC" },
  { value: "6128", label: "Suriname", code: "SR" },
  { value: "6129", label: "Trinidad and Tobago", code: "TT" },
  { value: "6130", label: "Turks and Caicos Islands", code: "TC" },
  { value: "6131", label: "United States Virgin Islands", code: "VI" },
  { value: "6132", label: "Uruguay", code: "UY" },
  { value: "6133", label: "Venezuela", code: "VE" },
  { value: "6134", label: "Austria", code: "AT" },
  { value: "6135", label: "Germany", code: "DE" },
  { value: "6136", label: "Switzerland", code: "CH" },
]

// Дефолтные страны по языкам (с Bitrix ID)
const defaultCountryByLanguage: Record<string, string> = {
  en: "5914", // United States of America
  ru: "5973", // Russian Federation
  zh: "5922", // China
}

const getUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    const countryCode = data.country_code?.toUpperCase()

    // Ищем страну по ISO коду в массиве (только для стран с кодами)
    const found = countries.find(c => c.code === countryCode)
    return found?.value || null
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
  isCompact?: boolean
}

export function CountryAutocomplete({
  value,
  onValueChange,
  placeholder = "Country",
  required = false,
  autoDetect = true,
  isCompact = false,
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
    let isMounted = true

    const detectCountry = async () => {
      try {
        const detectedCountry = await getUserCountry()

        // Проверяем что компонент все еще смонтирован
        if (!isMounted) return

        // Проверяем что страна есть в списке
        const countryExists = countries.some(c => c.value === detectedCountry)

        if (detectedCountry && countryExists) {
          onValueChange?.(detectedCountry)
        } else {
          // Fallback на дефолтную страну по языку
          const defaultCountry = defaultCountryByLanguage[language] || "5914" // USA
          onValueChange?.(defaultCountry)
        }
      } catch (error) {
        // Игнорируем ошибки геолокации в Safari
        console.warn('Country detection failed:', error)
        if (isMounted) {
          const defaultCountry = defaultCountryByLanguage[language] || "5914" // USA
          onValueChange?.(defaultCountry)
        }
      }
    }

    detectCountry()

    return () => {
      isMounted = false
    }
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
        className={cn(
          "w-full flex items-center justify-between bg-transparent border-0 border-b-2 border-foreground/20 rounded-none hover:border-foreground/60 transition-all duration-300 font-light px-0 text-left focus:outline-none focus:border-foreground/60",
          isCompact ? "h-8 text-sm" : "h-14 text-base"
        )}
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
