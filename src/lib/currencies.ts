export type CurrencyCode = keyof typeof currencies

export const currencies = {
  EUR: { code: "EUR", name: "Euro", symbol: "€" },
  USD: { code: "USD", name: "US Dollar", symbol: "$" },
  GBP: { code: "GBP", name: "British Pound", symbol: "£" },
} as const

export const getSymbol = (code: CurrencyCode): string => {
  return currencies[code]?.symbol || ""
}