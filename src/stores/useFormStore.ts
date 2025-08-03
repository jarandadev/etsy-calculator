// store/formStore.ts
import { create } from "zustand";
import type { CurrencyCode } from "@/lib/currencies";
import { defaultTaxRates, type TaxRate } from '../lib/taxRates';

interface FormStore {
  taxRates: TaxRate[];
  productCost: number;
  productPrice: number;
  profitPercent: number;
  currencyCode: CurrencyCode;
  setTaxRates: (rates: TaxRate[]) => void;
  setProductCost: (cost: number) => void;
  setProductPrice: (price: number) => void;
  setProfitPercent: (percent: number) => void;
  setCurrencyCode: (code: CurrencyCode) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  taxRates: defaultTaxRates,
  productCost: 0,
  productPrice: 0,
  profitPercent: 100,
  currencyCode: "EUR",
  setTaxRates: (rates) => set({ taxRates: rates }),
  setProductCost: (cost) => set({ productCost: cost }),
  setProductPrice: (price) => { console.log("Setting product price:", price); set({ productPrice: price }) },
  setProfitPercent: (percent) => set({ profitPercent: percent }),
  setCurrencyCode: (code) => set({ currencyCode: code }),
}));
