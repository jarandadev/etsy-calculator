"use client"

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useFormStore } from "@/stores/useFormStore"
import { getSymbol } from "@/lib/currencies"

// Configuración para colores (ahora verde)
const chartConfig = {
  totalCost: {
    label: "Total Cost",
    color: "#22c55e", // Tailwind green-500
  },
} as const

interface ChartShippingCostProps {
  baseShipping: number
  extraShipping: number
  salesTaxPercent: number
}

export function ChartShippingCost({
  baseShipping,
  extraShipping,
  salesTaxPercent,
}: ChartShippingCostProps) {
  const { productPrice, currencyCode } = useFormStore()

  const shippingChartData = Array.from({ length: 10 }, (_, i) => {
    const units = i + 1
    const rawPrice = units * productPrice + baseShipping + (units - 1) * extraShipping
    const finalPrice = rawPrice * (1 + salesTaxPercent / 100)

    return {
      units: units.toString(),
      totalCost: parseFloat(finalPrice.toFixed(2)),
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total price for multiple units</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={shippingChartData}
            margin={{ top: 25, bottom: 15 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis label={{ value: "Units", position: "insideBottom", offset: -10 }} dataKey="units" tickLine={false} axisLine={false} />
            <YAxis label={{ value: getSymbol(currencyCode), position: "insideLeft" }} dataKey="totalCost" tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillShipping" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="totalCost"
              type="monotone"
              fill="url(#fillShipping)"
              stroke="#22c55e"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
