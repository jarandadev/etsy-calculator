import { InputDecimal } from "./InputDecimal"
import { getSymbol, type CurrencyCode } from "@/lib/currencies"
import { useState, useEffect } from "react"
import { LabelWithTooltip } from "./LabelWithTooltip"
import { Slider } from "./ui/slider"

type GenericPriceInputProps = {
  label: string
  tooltip: string
  value: number
  productPrice: number
  productCost: number
  setValue: (val: number) => void
  currencyCode: CurrencyCode
}

export function ProfitSlider({
  label,
  tooltip,
  value,
  setValue,
  currencyCode,
  productPrice,
  productCost
}: GenericPriceInputProps) {
  const maxProfit = productPrice - productCost;
  return (
    <div className="flex flex-col gap-1.5">
      <LabelWithTooltip label={label} tooltip={tooltip} />
      <span className="text-sm text-muted-foreground">
        {value !== 0 ? `${value}%` : "0%"} ({(maxProfit - (maxProfit * ((100 - value) / 100))).toFixed(2).replace(".", ",")}{getSymbol(currencyCode)})
      </span>
      <Slider
        value={[value]}
        onValueChange={(val) => setValue(val[0])}
        defaultValue={[100]}
        max={100}
        step={1}
      />
    </div>
  )
}
