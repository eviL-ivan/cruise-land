"use client"

import { useState } from 'react'
import axios from 'axios'
import { useLanguage } from '@/lib/language-context'

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  comments: string
}

export function BookingForm() {
  const { content } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comments: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateGid = () => {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => {
      return Math.floor(Math.random() * 16).toString(16)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const BITRIX_URL = 'https://crm.swanhellenic.com/bitrix/services/main/ajax.php'
    const FORM_ID = '19'
    const FORM_SEC = '3a5j4r'

    try {
      // 1. Отправка аналитики
      const analyticsData = new FormData()
      analyticsData.append('counter', 'view')
      analyticsData.append('formId', FORM_ID)

      await axios.post(`${BITRIX_URL}?action=crm.site.form.handleAnalytics`, analyticsData)

      // 2. Отправка формы
      const submitData = new FormData()

      const values = {
        LEAD_NAME: [formData.firstName],
        LEAD_LAST_NAME: [formData.lastName],
        LEAD_PHONE: [formData.phone],
        LEAD_UF_CRM_5E0478535B314: [formData.email],
        LEAD_UF_CRM_1759841340: [],
        LEAD_COMMENTS: [formData.comments]
      }

      const trace = {
        url: window.location.href,
        ref: document.referrer || '',
        device: { isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) },
        tags: { ts: Math.floor(Date.now() / 1000), list: {}, gclid: null },
        client: {},
        pages: { list: [[window.location.href, Math.floor(Date.now() / 1000), document.title]] },
        gid: generateGid(),
        previous: { list: [] }
      }

      submitData.append('properties', '{}')
      submitData.append('consents', '{}')
      submitData.append('recaptcha', 'undefined')
      submitData.append('timeZoneOffset', String(new Date().getTimezoneOffset()))
      submitData.append('values', JSON.stringify(values))
      submitData.append('id', FORM_ID)
      submitData.append('sec', FORM_SEC)
      submitData.append('lang', 'en')
      submitData.append('trace', JSON.stringify(trace))
      submitData.append('entities', '[]')
      submitData.append('security_sign', 'undefined')

      const response = await axios.post(`${BITRIX_URL}?action=crm.site.form.fill`, submitData)

      if (response.data.result) {
        setSuccess(true)
        setFormData({ firstName: '', lastName: '', phone: '', email: '', comments: '' })

        if (response.data.result.redirect?.url) {
          setTimeout(() => {
            window.location.href = response.data.result.redirect.url
          }, response.data.result.redirect.delay * 1000)
        }
      }
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-2" style={{ color: '#004657' }}>Thank You!</h3>
        <p className="text-gray-600">Your request has been successfully submitted.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 border-2"
          style={{ color: '#004657', borderColor: '#004657' }}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#004657' }}>
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
            style={{ focusRing: '#004657' }}
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#004657' }}>
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#004657' }}>
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
          placeholder="+1 (234) 567-89-00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#004657' }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#004657' }}>
          Comments
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition resize-none"
          placeholder="Your message..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase border-2"
        style={{
          backgroundColor: loading ? '#99bdc5' : '#004657',
          color: 'white',
          borderColor: '#004657'
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Request'
        )}
      </button>
    </form>
  )
}
