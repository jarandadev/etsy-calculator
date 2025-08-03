// type
export interface TaxRate {
  name: string;
  shippingCost: number;
  taxRate: number;
}

export const defaultTaxRates: TaxRate[] = [
  {
    name: "European Union",
    shippingCost: 3, // Default shipping cost for EU
    taxRate: 21 // Average VAT rate
  },
  {
    name: "United Kingdom",
    shippingCost: 5, // Default shipping cost for UK
    taxRate: 20, // Standard VAT rate
  },
  {
    name: "United States",
    shippingCost: 7, // Default shipping cost for US
    taxRate: 7.5, // Average sales tax rate
  },
  {
    name: "Other countries",
    shippingCost: 9, // Default shipping cost for Other
    taxRate: 15, // Average VAT rate in major countries
  },
] as const;
