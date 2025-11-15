// Currency utilities
export const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee' },
  USD: { symbol: '$', name: 'US Dollar' },
} as const

export type Currency = keyof typeof CURRENCIES

export function formatPrice(price: number, currency: Currency = 'INR'): string {
  const formatted = price.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return `${CURRENCIES[currency].symbol}${formatted}`
}

export function parsePrice(priceString: string): number {
  // Remove currency symbols and commas, then parse
  return parseFloat(priceString.replace(/[₹$,]/g, ''))
}
