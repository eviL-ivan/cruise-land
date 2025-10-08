"use client"

import * as React from "react"
import { CountryAutocomplete } from "./country-autocomplete"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface LuxuryFormProps {
  className?: string
}

export function LuxuryForm({ className }: LuxuryFormProps) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    comment: "",
    isTravelAgent: false,
    consent: false,
  })

  const [errors, setErrors] = React.useState({
    email: "",
    phone: "",
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Accepts formats like: +1234567890, +1 234 567 890, (123) 456-7890, 123-456-7890, etc.
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

  const handleSubmit = (e: React.FormEvent) => {
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

    console.log("Form submitted:", formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-4xl mx-auto p-8 md:p-12 bg-card rounded-lg shadow-sm border border-border/50",
        className,
      )}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-light text-muted-foreground">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-12 bg-input/50 border-border/50 focus:bg-input focus:border-border transition-all duration-200 text-base font-light"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-light text-muted-foreground">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="h-12 bg-input/50 border-border/50 focus:bg-input focus:border-border transition-all duration-200 text-base font-light"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-light text-muted-foreground">
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
              "h-12 bg-input/50 border-border/50 focus:bg-input focus:border-border transition-all duration-200 text-base font-light",
              errors.email && "border-destructive focus:border-destructive",
            )}
          />
          {errors.email && <p className="text-xs text-destructive font-light mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-light text-muted-foreground">
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
              "h-12 bg-input/50 border-border/50 focus:bg-input focus:border-border transition-all duration-200 text-base font-light",
              errors.phone && "border-destructive focus:border-destructive",
            )}
          />
          {errors.phone && <p className="text-xs text-destructive font-light mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2 mt-6">
        <Label htmlFor="country" className="text-sm font-light text-muted-foreground">
          Country <span className="text-destructive">*</span>
        </Label>
        <CountryAutocomplete
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
          placeholder="Select country"
          required
        />
      </div>

      {/* Comment */}
      <div className="space-y-2 mt-6">
        <Label htmlFor="comment" className="text-sm font-light text-muted-foreground">
          Comment
        </Label>
        <Textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          rows={1}
          className="bg-input/50 border-border/50 focus:bg-input focus:border-border transition-all duration-200 text-base font-light resize-y min-h-[3rem]"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-4 mt-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="travelAgent"
            checked={formData.isTravelAgent}
            onCheckedChange={(checked) => setFormData({ ...formData, isTravelAgent: checked as boolean })}
            className="mt-1"
          />
          <Label
            htmlFor="travelAgent"
            className="text-sm font-light text-foreground cursor-pointer leading-relaxed"
            onClick={() => setFormData({ ...formData, isTravelAgent: !formData.isTravelAgent })}
          >
            I'm Travel Agent
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            required
            checked={formData.consent}
            onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
            className="mt-1"
          />
          <Label
            htmlFor="consent"
            className="text-sm font-light text-muted-foreground cursor-pointer leading-relaxed"
            onClick={() => setFormData({ ...formData, consent: !formData.consent })}
          >
            I confirm that my personal data may be used for contractual processing and further information about the
            products and services offered by Swan Hellenic
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          className="w-full md:w-auto px-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-light text-base tracking-wide transition-all duration-200"
        >
          Begin Your Journey
        </Button>
      </div>
    </form>
  )
}
