import { InputDecimal } from "./InputDecimal"
import { getSymbol, type CurrencyCode } from "@/lib/currencies"
import { useState, useEffect } from "react"
import { LabelWithTooltip } from "./LabelWithTooltip"

type GenericPriceInputProps = {
  label: string
  tooltip: string
  value: number
  setValue: (val: number) => void
  currencyCode: CurrencyCode
}

export function InputDecimalPrice({
  label,
  tooltip,
  value,
  setValue,
  currencyCode,
}: GenericPriceInputProps) {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (value !== 0 && inputValue === "") {
      setInputValue(value.toString())
    }
  }, [value])

  const handleValueChange = (val: number) => {
    if (val === 0) {
      setInputValue("")
    } else {
      setInputValue(val.toString())
    }
    setValue(val)
  }

  return (
    <div className="space-y-2">
      <LabelWithTooltip label={label} tooltip={tooltip} />

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
  )
}
