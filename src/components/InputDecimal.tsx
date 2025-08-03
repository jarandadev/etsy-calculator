import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
type InputDecimalProps = React.InputHTMLAttributes<HTMLInputElement> & {
  decimals: number
  fixed?: boolean
  endText?: string
  value?: string
  onValueChange?: (value: number) => void
  maxDigits?: number // nuevo
}

export function InputDecimal({
  decimals,
  fixed = false,
  endText,
  value,
  onValueChange,
  maxDigits = 3,
  ...props
}: InputDecimalProps) {
  const decimalRegex = new RegExp(`^\\d{0,${maxDigits}}(\\.\\d{0,${decimals}})?$`)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (
      value !== undefined &&
      value !== null &&
      !isNaN(Number(value)) &&
      inputValue === "" &&
      Number(value) !== 0
    ) {
      setInputValue(value.toString())
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (val === "") {
      setInputValue("")
      if (onValueChange) onValueChange(0)
      return
    }

    if (decimalRegex.test(val)) {
      const numeric = parseFloat(val)
      const maxValue = parseFloat("9".repeat(maxDigits) + (decimals > 0 ? "." + "9".repeat(decimals) : ""))

      if (numeric > maxValue) return

      setInputValue(val)
      if (!isNaN(numeric) && onValueChange) {
        onValueChange(numeric)
      }
    }
  }

  const handleBlur = () => {
    if (inputValue === "") return

    const numeric = parseFloat(inputValue)
    if (!isNaN(numeric)) {
      const hasDecimal = numeric % 1 !== 0
      const finalValue = fixed
        ? hasDecimal
          ? numeric.toFixed(decimals)
          : numeric.toString()
        : numeric.toString()
      setInputValue(finalValue)
    }
  }

  return (
    <div className="relative">
      <Input
        {...props}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        inputMode="decimal"
        className={cn("pr-7 no-spin", props.className)}
      />
      {endText && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {endText}
        </span>
      )}
    </div>
  )
}
