"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CountryAutocomplete } from "@/data/form/country-autocomplete";
import { cn } from "@/lib/utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface ContactFormProps {
  onSuccess?: () => void;
  inCard?: boolean;
  isCompact?: boolean;
}

export function ContactForm({ onSuccess, inCard = true, isCompact = false }: ContactFormProps) {
  const { language, content } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    comments: "",
    isTravelAgent: false,
    consent: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return false;
    try {
      return isValidPhoneNumber(phone);
    } catch {
      return false;
    }
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setErrors({ ...errors, email: content.forms.contact.emailError });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors({ ...errors, phone: content.forms.contact.phoneError });
    } else {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем что заполнено хотя бы одно поле
    if (!formData.email && !formData.phone) {
      setErrors({
        email:
          content.forms.contact.emailError || "Please provide email or phone",
        phone:
          content.forms.contact.phoneError || "Please provide email or phone",
      });
      return;
    }

    // Валидируем только заполненные поля
    const emailValid = !formData.email || validateEmail(formData.email);
    const phoneValid = !formData.phone || validatePhone(formData.phone);

    if (!emailValid || !phoneValid) {
      setErrors({
        email:
          formData.email && !emailValid ? content.forms.contact.emailError : "",
        phone:
          formData.phone && !phoneValid ? content.forms.contact.phoneError : "",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Подготовка данных в формате Bitrix
      const formDataToSend = new FormData();

      const values = {
        LEAD_NAME: [formData.firstName],
        LEAD_LAST_NAME: [formData.lastName],
        LEAD_UF_CRM_5E0478535B314: [formData.email],
        LEAD_PHONE: [formData.phone],
        LEAD_UF_COUNTRY_FORM: [formData.country],
        LEAD_COMMENTS: [formData.comments],
        LEAD_UF_CRM_1759841340: formData.consent ? ["Y"] : [],
        hr_9263764: formData.isTravelAgent ? ["Y"] : [],
      };

      const consents = {
        AGREEMENT_8: formData.consent ? "Y" : "N",
      };

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
          list: [
            [
              window.location.href,
              Math.floor(Date.now() / 1000),
              document.title,
            ],
          ],
        },
        gid: null,
        previous: {
          list: [],
        },
      };

      formDataToSend.append("properties", JSON.stringify({}));
      formDataToSend.append("consents", JSON.stringify(consents));
      formDataToSend.append("recaptcha", "undefined");
      formDataToSend.append(
        "timeZoneOffset",
        String(new Date().getTimezoneOffset())
      );
      formDataToSend.append("values", JSON.stringify(values));
      formDataToSend.append("id", "19");
      formDataToSend.append("sec", "3a5j4r");
      formDataToSend.append("lang", language);
      formDataToSend.append("trace", JSON.stringify(trace));
      formDataToSend.append("entities", JSON.stringify([]));
      formDataToSend.append("security_sign", "undefined");

      const response = await axios.post(
        "https://crm.swanhellenic.com/bitrix/services/main/ajax.php?action=crm.site.form.fill",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        if (onSuccess) onSuccess();
        // Redirect to thank-you page
        router.push("/thank-you");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(content.forms.contact.errorSubmitting);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-5xl mx-auto",
        inCard &&
          "p-12 md:p-16 lg:p-20 bg-card rounded-sm border border-border/40 shadow-[0_2px_24px_rgba(0,0,0,0.04)]"
      )}
    >
      <div className={cn("grid md:grid-cols-2", isCompact ? "gap-3" : "gap-6")}>
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-xs uppercase tracking-widest font-medium text-foreground/70"
          >
            {content.forms.contact.firstName}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className={cn(
              "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
              isCompact ? "h-8 py-0.5 text-sm" : "h-10 py-1 text-base"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-xs uppercase tracking-widest font-medium text-foreground/70"
          >
            {content.forms.contact.lastName}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className={cn(
              "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
              isCompact ? "h-8 py-0.5 text-sm" : "h-10 py-1 text-base"
            )}
          />
        </div>
      </div>

      <div className={isCompact ? "mt-3" : "mt-2"}>
        <div className={cn("grid md:grid-cols-2", isCompact ? "gap-y-3 gap-x-3 md:gap-3" : "gap-6")}>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs uppercase tracking-widest font-medium text-foreground/70"
            >
              {content.forms.contact.email}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={handleEmailBlur}
              className={cn(
                "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 font-light px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
                isCompact ? "h-8 py-0.5 text-sm" : "h-10 py-1 text-base",
                errors.email && "border-destructive focus:border-destructive"
              )}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium mt-2">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-xs uppercase tracking-widest font-medium text-foreground/70"
            >
              {content.forms.contact.phone}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <PhoneInput
              id="phone"
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(value) =>
                setFormData({ ...formData, phone: value || "" })
              }
              onBlur={handlePhoneBlur}
              className={cn(
                "phone-input-custom bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus-within:border-foreground/60 transition-all duration-300",
                isCompact ? "phone-input-compact h-8 text-sm" : "h-10 text-base",
                errors.phone &&
                  "border-destructive focus-within:border-destructive"
              )}
            />
            {errors.phone && (
              <p className="text-xs text-destructive font-medium mt-2">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={cn("space-y-2", isCompact ? "mt-3" : "mt-2")}>
        <Label
          htmlFor="country"
          className="text-xs uppercase tracking-widest font-medium text-foreground/70"
        >
          {content.forms.contact.country}{" "}
          <span className="text-destructive">*</span>
        </Label>
        <CountryAutocomplete
          value={formData.country}
          onValueChange={(value) =>
            setFormData({ ...formData, country: value })
          }
          placeholder={content.forms.contact.countryPlaceholder}
          required
          isCompact={isCompact}
        />
      </div>

      {/* Mobile: collapsed by default, Desktop: always expanded */}
      {isCompact && !showComments ? (
        <div className={cn("mt-2 md:hidden")}>
          <button
            type="button"
            onClick={() => setShowComments(true)}
            className="text-sm text-foreground/60 hover:text-foreground transition-colors underline underline-offset-2"
          >
            + {content.forms.contact.comments}
          </button>
        </div>
      ) : null}

      <div className={cn(
        "space-y-2",
        isCompact ? "mt-3" : "mt-2",
        isCompact && !showComments ? "hidden md:block" : ""
      )}>
        <Label
          htmlFor="comments"
          className="text-xs uppercase tracking-widest font-medium text-foreground/70"
        >
          {content.forms.contact.comments}
        </Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
          rows={1}
          className={cn(
            "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none focus:border-foreground/60 focus:bg-transparent transition-all duration-300 font-light resize-y px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-foreground/30",
            isCompact ? "min-h-[2rem] text-sm py-0.5" : "min-h-[3rem] text-base py-1"
          )}
        />
      </div>

      <div className={cn(isCompact ? "space-y-2 mt-3" : "space-y-4 mt-4")}>
        <div className={cn("flex items-start", isCompact ? "space-x-3" : "space-x-4")}>
          <Checkbox
            id="travelAgent"
            checked={formData.isTravelAgent}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isTravelAgent: checked as boolean })
            }
            className="mt-1 rounded-sm border-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
          />
          <Label
            htmlFor="travelAgent"
            className={cn(
              "font-normal text-foreground/90 cursor-pointer leading-relaxed",
              isCompact ? "text-xs" : "text-sm"
            )}
            onClick={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                isTravelAgent: !formData.isTravelAgent,
              });
            }}
          >
            {content.forms.contact.isTravelAgent}
          </Label>
        </div>

        <div className={cn("flex items-start", isCompact ? "space-x-3" : "space-x-4")}>
          <Checkbox
            id="consent"
            required
            checked={formData.consent}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, consent: checked as boolean })
            }
            className="mt-1 rounded-sm border-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
          />
          <Label
            htmlFor="consent"
            className={cn(
              "font-normal text-foreground/80 cursor-pointer leading-relaxed",
              isCompact ? "text-xs" : "text-sm"
            )}
            onClick={(e) => {
              e.preventDefault();
              setFormData({ ...formData, consent: !formData.consent });
            }}
          >
            {content.forms.contact.consent}{" "}
            <span className="text-destructive">*</span>
          </Label>
        </div>
      </div>

      <div className={cn(
        "border-foreground/20 flex justify-center",
        isCompact ? "mt-5 pt-0" : "mt-2 pt-6"
      )}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 rounded-md text-white border-2 border-foreground/20 transition-all duration-300 font-semibold uppercase text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-foreground/40"
          style={{ backgroundColor: "#004155" }}
        >
          {isSubmitting
            ? content.forms.contact.submitting
            : content.forms.contact.submit}
        </button>
      </div>
    </form>
  );
}
