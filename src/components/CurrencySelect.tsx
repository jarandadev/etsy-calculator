import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { currencies } from "@/lib/currencies"
import { useFormStore } from "@/stores/useFormStore";
import { Label } from "./ui/label";


export function CurrencySelect() {
  const { currencyCode, setCurrencyCode } = useFormStore();
  
  return (
    <div className="space-y-2">
      <Label>Currency</Label>

      <Select
        defaultValue="EUR"
        value={currencyCode}
        onValueChange={setCurrencyCode}
      >

        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>

        <SelectContent>
          {Object.values(currencies).map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.name} {currency.symbol} ({currency.code})
            </SelectItem>
          ))}
        </SelectContent>

      </Select>
    </div>
  )
}
