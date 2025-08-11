import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(value: number, maximumFractionDigits = 1) {
  try {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits }).format(value)
  } catch {
    return String(value)
  }
}
