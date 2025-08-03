import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { calculateBaseShipping, calculateExtraShipping } from "@/lib/calculator"
import { useFormStore } from "@/stores/useFormStore"
import { getSymbol } from "@/lib/currencies"
import { RegionDetails } from "./RegionDetails"
import { MoveUpRight } from "lucide-react"
import { TableHeadWithTooltip } from "./TableHeadWithTooltip"

export function ResultsTable() {
  const { productPrice, productCost, currencyCode, profitPercent, taxRates } = useFormStore()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Region</TableHead>
          <TableHeadWithTooltip
            label="Shipping Price"
            tooltip="Shipping cost for the first unit of the product"
          />
          <TableHeadWithTooltip
            label="Extra Products"
            tooltip="Additional shipping cost per extra unit after the first"
          />
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {taxRates.map((rate) => {
          const baseShipping = calculateBaseShipping(productPrice, productCost, rate.taxRate, rate.shippingCost, profitPercent)
          const extraShipping = calculateExtraShipping(productPrice, productCost, rate.taxRate, rate.shippingCost, 2, profitPercent)
          const isDisabled = baseShipping === null || extraShipping === null || productCost > productPrice

          if (isDisabled) {
            return (
              <TableRow
                key={rate.name}
                className="opacity-50 transition"
              >
                <TableCell>{rate.name === "" ? "Unknown" : rate.name}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-right text-muted-foreground pr-2">
                  <MoveUpRight className="w-4 h-4 inline-block opacity-0" />
                </TableCell>
              </TableRow>
            )
          }

          return (
            <Sheet key={rate.name}>
              <SheetTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-muted transition">
                  <TableCell>{rate.name === "" ? "Unknown" : rate.name}</TableCell>
                  <TableCell>
                    {baseShipping.toFixed(2) + getSymbol(currencyCode)}
                  </TableCell>
                  <TableCell>
                    {extraShipping.toFixed(2) + getSymbol(currencyCode)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground pr-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline mr-1">Details</span>
                    <MoveUpRight className="w-4 h-4 inline-block" />
                  </TableCell>
                </TableRow>
              </SheetTrigger>
              <SheetContent className="w-full max-w-[85%] sm:max-w-[540px] overflow-y-auto pb-4">
                <SheetHeader>
                  <SheetTitle>{rate.name === "" ? "Unknown" : rate.name} ({rate.taxRate}%)</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                  <RegionDetails
                    shippingPrice={baseShipping}
                    shippingCost={rate.shippingCost}
                    additionalProduct={extraShipping}
                    salesTaxPercent={rate.taxRate}
                  />
                </div>
              </SheetContent>
            </Sheet>
          )
        })}

      </TableBody>
    </Table>
  )
}
