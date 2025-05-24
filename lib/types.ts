export interface PaymentData {
  id: string
  phone?: string
  country?: string
  amount?: string
  timestamp?: string
}

export interface LocationResponse {
  country_name: string
  timestamp?: string
  error?: string
}

export interface PaymentFormData {
  phoneNumber: string
  amount: string
}

export interface ValidationResult {
  isValid: boolean
  message?: string
}
