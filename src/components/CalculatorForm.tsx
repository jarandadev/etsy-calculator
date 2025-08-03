import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CurrencySelect } from "./CurrencySelect"
import { InputDecimalPrice } from "./InputDecimalPrice"
import { Separator } from "./ui/separator"
import { ResultsTable } from "./ResultsTable"
import { TaxRatesEditor } from "./TaxRatesEditor"
import { ProductCostInput } from "./ProductCostInput"
import { useFormStore } from "@/stores/useFormStore"
import { ProfitSlider } from "./ProfitSlider"

export function CalculatorForm() {
  const { productPrice, setProductPrice, productCost, setProductCost, currencyCode, profitPercent, setProfitPercent } = useFormStore()

  return (
    <Card>

      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <CurrencySelect />
        <InputDecimalPrice
          label="Product Cost"
          tooltip="The cost of producing the product."
          value={productCost}
          setValue={setProductCost}
          currencyCode={currencyCode}
        />
        <InputDecimalPrice
          label="Product Price"
          tooltip="The price at which you sell the product."
          value={productPrice}
          setValue={setProductPrice}
          currencyCode={currencyCode}
        />
        <ProfitSlider
          productPrice={productPrice}
          productCost={productCost}
          label="Profit Percentage"
          tooltip="The percentage of profit you want to make."
          value={profitPercent}
          setValue={setProfitPercent}
          currencyCode={currencyCode}
        />
      </CardContent>

      <Separator />

      <CardHeader className="flex items-center justify-between">
        <CardTitle>Shipping Details</CardTitle>
      </CardHeader>

      <CardContent>
        <TaxRatesEditor />
      </CardContent>

      <Separator />

      <CardHeader className="flex items-center justify-between">
        <CardTitle>Results</CardTitle>
      </CardHeader>

      <CardContent>
        <ResultsTable />
      </CardContent>
    </Card>
  )
}
