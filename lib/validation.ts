import type { ValidationResult } from "./types"

export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: "رقم الهاتف مطلوب" }
  }

  if (!/^[0-9]{8}$/.test(phone)) {
    return { isValid: false, message: "يجب أن يكون رقم الهاتف مكون من 8 أرقام" }
  }

  return { isValid: true }
}

export const validateAmount = (amount: string): ValidationResult => {
  const numericAmount = Number.parseFloat(amount.replace(/[^\d.]/g, ""))

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { isValid: false, message: "يجب إدخال مبلغ صحيح" }
  }

  if (numericAmount < 1) {
    return { isValid: false, message: "الحد الأدنى للمبلغ هو 1 دينار كويتي" }
  }

  if (numericAmount > 100) {
    return { isValid: false, message: "الحد الأقصى للمبلغ هو 100 دينار كويتي" }
  }

  return { isValid: true }
}

export const formatCurrency = (amount: string): string => {
  const numericValue = Number.parseFloat(amount.replace(/[^\d.]/g, ""))
  return isNaN(numericValue) ? "0.000" : numericValue.toFixed(3)
}
