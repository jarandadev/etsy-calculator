import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { calculateFees, ETSY_TAX_PERCENT, OPERATING_TAX_PERCENT, PAYMENT_TAX_PERCENT } from "@/lib/calculator";
import { getSymbol } from "@/lib/currencies";
import { useFormStore } from "@/stores/useFormStore";
import { ChartShippingCost } from "./ChartShippingCost";
import { Separator } from "./ui/separator";
import { TableCellWithTooltip } from "./TableCellWithTooltip";

type RegionDetailsProps = {
  shippingPrice: number;
  shippingCost: number;
  additionalProduct: number;
  salesTaxPercent: number;
}

function renderAmount(value: number, symbol: string, neutral: boolean = false) {
  const formatted = Math.abs(value).toFixed(2).replace(".", ",");

  if (neutral) {
    return <span className="text-muted-foreground">{formatted}{symbol}</span>;
  }

  const rounded = Number(value.toFixed(2));
  let colorClass = "text-muted-foreground";
  if (rounded > 0) colorClass = "text-green-500";
  else if (rounded < 0) colorClass = "text-red-500";

  const prefix = rounded > 0 ? "+" : rounded < 0 ? "-" : "";

  return <span className={colorClass}>{prefix}{formatted}{symbol}</span>;
}

export function RegionDetails({ shippingPrice, shippingCost, additionalProduct, salesTaxPercent }: RegionDetailsProps) {

  const { currencyCode, productPrice, productCost, profitPercent } = useFormStore();
  const {
    etsyFeeProduct,
    etsyFeeShipping,
    paymentFee,
    operatingCost,
    vatOnEtsy,
    vatOnPayment,
    vatOnOperating,
    totalSellingPrice,
    totalFees,
    totalProfit,
  } = calculateFees(productPrice, shippingPrice, salesTaxPercent);

  const symbol = getSymbol(currencyCode);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concept</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Product Price</TableCell>
                <TableCell>{renderAmount(productPrice, symbol, true)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Shipping Price</TableCell>
                <TableCell>{renderAmount(shippingPrice, symbol, true)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCellWithTooltip text="Total Price" tooltip={"Product Price + Selling Price"} />
                <TableCell>{renderAmount(-(productPrice + shippingPrice), symbol, true)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCellWithTooltip text="Total Price + VAT" tooltip={"Total Price with VAT (" + salesTaxPercent + "%) applied"} />
                <TableCell>{renderAmount(-totalSellingPrice, symbol, true)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profit ({profitPercent}%)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concept</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Income</TableCell>
                <TableCell>{renderAmount(productPrice + shippingPrice, symbol, true)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Product Cost</TableCell>
                <TableCell>{renderAmount(-productCost, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Shipping Cost</TableCell>
                <TableCell>{renderAmount(-shippingCost, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Total Fees</TableCell>
                <TableCell>{renderAmount(-totalFees, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Profit</TableCell>
                <TableCell>{renderAmount(totalProfit - shippingCost - productCost, symbol)} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Taxes and Fees</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Etsy Tax on Product</TableCell>
                <TableCell>{ETSY_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-etsyFeeProduct, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Etsy Tax on Shipping</TableCell>
                <TableCell>{ETSY_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-etsyFeeShipping, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Payment Processing</TableCell>
                <TableCell>{PAYMENT_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-paymentFee, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Operating Cost</TableCell>
                <TableCell>{OPERATING_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-operatingCost, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>VAT on Etsy Fees</TableCell>
                <TableCell>{ETSY_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-vatOnEtsy, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>VAT on Payment Fees</TableCell>
                <TableCell>{PAYMENT_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-vatOnPayment, symbol)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>VAT on Operating Costs</TableCell>
                <TableCell>{OPERATING_TAX_PERCENT}%</TableCell>
                <TableCell>{renderAmount(-vatOnOperating, symbol)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ChartShippingCost baseShipping={shippingPrice} extraShipping={additionalProduct} salesTaxPercent={salesTaxPercent} />

    </div>
  )
}
