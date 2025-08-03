import { InputDecimal } from "./InputDecimal"
import { useFormStore } from "@/stores/useFormStore"
import { getSymbol } from "@/lib/currencies"
import { Label } from "./ui/label"
import { useState, useEffect } from "react"
import { LabelWithTooltip } from "./LabelWithTooltip"

export function ProductCostInput() {
  const { currencyCode, productCost, setProductCost } = useFormStore()
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (productCost !== 0 && inputValue === "") {
      setInputValue(productCost.toString())
    }
  }, [productCost])

  // Cuando InputDecimal llama a onValueChange
  const handleValueChange = (val: number) => {
    if (val === 0) {
      setInputValue("") // visualmente vacío
    } else {
      setInputValue(val.toString())
    }
    setProductCost(val)
  }

  return (
    <div className="space-y-2">
      <LabelWithTooltip label="Product Cost" tooltip="The cost of producing the product." />
      <div className="relative">
        <InputDecimal
          decimals={2}
          fixed={true}
          value={inputValue}
          onValueChange={handleValueChange}
          placeholder="0"
          className="pr-7 no-spin"
          inputMode="decimal"
          endText={getSymbol(currencyCode)}
        />
      </div>
    </div>
  )
}
