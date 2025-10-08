"use client"

import { useState } from "react"
import axios from "axios"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CountryAutocomplete } from "@/data/form/country-autocomplete"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  onSuccess?: () => void
  inCard?: boolean
}

export function ContactForm({ onSuccess, inCard = true }: ContactFormProps) {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    comments: "",
    isTravelAgent: false,
    consent: false,
  })

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" })
    } else {
      setErrors({ ...errors, email: "" })
    }
  }

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors({ ...errors, phone: "Please enter a valid phone number" })
    } else {
      setErrors({ ...errors, phone: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailValid = validateEmail(formData.email)
    const phoneValid = validatePhone(formData.phone)

    if (!emailValid || !phoneValid) {
      setErrors({
        email: !emailValid ? "Please enter a valid email address" : "",
        phone: !phoneValid ? "Please enter a valid phone number" : "",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Подготовка данных в формате Bitrix
      const formDataToSend = new FormData()

      const values = {
        LEAD_NAME: [formData.firstName],
        LEAD_LAST_NAME: [formData.lastName],
        LEAD_UF_CRM_5E0478535B314: [formData.email],
        LEAD_PHONE: [formData.phone],
        LEAD_UF_COUNTRY_FORM: [formData.country],
        LEAD_COMMENTS: [formData.comments],
        LEAD_UF_CRM_1759841340: formData.consent ? ["Y"] : [],
        hr_9263764: formData.isTravelAgent ? ["Y"] : [],
      }

      const consents = {
        AGREEMENT_8: formData.consent ? "Y" : "N",
      }

      const trace = {
        url: window.location.href,
        device: {
          isMobile: /Mobile|Android|iPhone/i.test(navigator.userAgent),
        },
        tags: {
          ts: Math.floor(Date.now() / 1000),
          list: {},
          gclid: null,
        },
        client: {
          gaId: "",
          yaId: "",
        },
        pages: {
          list: [[window.location.href, Math.floor(Date.now() / 1000), document.title]],
        },
        gid: null,
        previous: {
          list: [],
        },
      }

      formDataToSend.append("properties", JSON.stringify({}))
      formDataToSend.append("consents", JSON.stringify(consents))
      formDataToSend.append("recaptcha", "undefined")
      formDataToSend.append("timeZoneOffset", String(new Date().getTimezoneOffset()))
      formDataToSend.append("values", JSON.stringify(values))
      formDataToSend.append("id", "19")
      formDataToSend.append("sec", "3a5j4r")
      formDataToSend.append("lang", language)
      formDataToSend.append("trace", JSON.stringify(trace))
      formDataToSend.append("entities", JSON.stringify([]))
      formDataToSend.append("security_sign", "undefined")

      const response = await axios.post(
        "https://crm.swanhellenic.com/bitrix/services/main/ajax.php?action=crm.site.form.fill",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (response.data) {
        setIsSuccess(true)
        if (onSuccess) onSuccess()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">
          Thank You!
        </h3>
        <p className="text-muted-foreground text-lg">
          Your inquiry has been successfully submitted. We'll contact you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn(
      "w-full max-w-5xl mx-auto",
      inCard && "p-12 md:p-16 lg:p-20 bg-card rounded-sm border border-border/40 shadow-[0_2px_24px_rgba(0,0,0,0.04)]"
    )}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-14 bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 text-base font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="lastName" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="h-14 bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 text-base font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={handleEmailBlur}
            className={cn(
              "h-14 bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 text-base font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
              errors.email && "border-destructive focus:border-destructive"
            )}
          />
          {errors.email && <p className="text-xs text-destructive font-medium mt-2">{errors.email}</p>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onBlur={handlePhoneBlur}
            className={cn(
              "h-14 bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 text-base font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
              errors.phone && "border-destructive focus:border-destructive"
            )}
          />
          {errors.phone && <p className="text-xs text-destructive font-medium mt-2">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <Label htmlFor="country" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
          Country <span className="text-destructive">*</span>
        </Label>
        <CountryAutocomplete
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
          placeholder="Select country"
          required
        />
      </div>

      <div className="space-y-3 mt-8">
        <Label htmlFor="comments" className="text-xs uppercase tracking-widest font-medium text-foreground/70">
          Comment
        </Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          rows={1}
          className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 text-base font-light resize-y px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30 min-h-[3rem]"
        />
      </div>

      <div className="space-y-6 mt-10">
        <div className="flex items-start space-x-4">
          <Checkbox
            id="travelAgent"
            checked={formData.isTravelAgent}
            onCheckedChange={(checked) => setFormData({ ...formData, isTravelAgent: checked as boolean })}
            className="mt-1 rounded-sm border-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
          />
          <Label
            htmlFor="travelAgent"
            className="text-sm font-normal text-foreground/90 cursor-pointer leading-relaxed"
            onClick={(e) => {
              e.preventDefault()
              setFormData({ ...formData, isTravelAgent: !formData.isTravelAgent })
            }}
          >
            I'm Travel Agent
          </Label>
        </div>

        <div className="flex items-start space-x-4">
          <Checkbox
            id="consent"
            required
            checked={formData.consent}
            onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
            className="mt-1 rounded-sm border-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
          />
          <Label
            htmlFor="consent"
            className="text-sm font-normal text-foreground/80 cursor-pointer leading-relaxed"
            onClick={(e) => {
              e.preventDefault()
              setFormData({ ...formData, consent: !formData.consent })
            }}
          >
            I confirm that my personal data may be used for contractual processing and further information about the
            products and services offered by Swan Hellenic <span className="text-destructive">*</span>
          </Label>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-foreground/20 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 rounded-md text-white border-2 border-foreground/20 transition-all duration-300 font-semibold uppercase text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-foreground/40"
          style={{backgroundColor: '#004155'}}
        >
          {isSubmitting ? "Sending..." : "Begin Your Journey"}
        </button>
      </div>
    </form>
  )
}
