import { Button } from "@/components/ui/button";
import { InputDecimal } from "./InputDecimal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useFormStore } from "@/stores/useFormStore";
import type { TaxRate } from "@/lib/taxRates";
import { getSymbol } from "@/lib/currencies";
import { LabelWithTooltip } from "./LabelWithTooltip";
import { Slider } from "./ui/slider";

export function TaxRatesEditor() {
  const { taxRates, setTaxRates, currencyCode } = useFormStore();

  const handleChange = (index: number, field: keyof TaxRate, value: string) => {
    const updated = [...taxRates];
    updated[index] = {
      ...updated[index],
      [field]: field === "taxRate" ? parseFloat(value) : value,
    };
    setTaxRates(updated);
  };

  const handleAdd = () => {
    if (taxRates.length >= 8) return;
    setTaxRates([...taxRates, { name: "", shippingCost: 0, taxRate: 0 }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...taxRates];
    updated.splice(index, 1);
    setTaxRates(updated);
  };

  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr_1fr_auto] items-center w-full gap-2 pr-9 mb-2">
        <Label>Country or region</Label>
        <LabelWithTooltip label="Shipping Cost" tooltip="Shipping cost for delivering the product in this country or region" />
        <LabelWithTooltip label="VAT" tooltip="Value-added tax rate for this country or region" />
      </div>

      <div className="grid gap-4">
        {taxRates.map((rate, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr_auto] items-center gap-2">
            <Input
              placeholder="Region name"
              autoFocus={index === 0}
              name={`name-${index}`}
              type="text"
              value={rate.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />

            <InputDecimal
              maxDigits={2}
              placeholder="0"
              name={`shippingCost-${index}`}
              decimals={2}
              fixed={true}
              value={rate.shippingCost.toString()}
              onValueChange={(val) => handleChange(index, "shippingCost", val.toString())}
              className="pr-7 no-spin w-full"
              inputMode="decimal"
              endText={getSymbol(currencyCode)}
            />

            <div className="flex flex-col items-start justify-start -mt-1.5">
              <span className="text-sm text-muted-foreground mb-1.5">{rate.taxRate}%</span>
              <Slider
                name={`taxRate-${index}`}
                value={[rate.taxRate]}
                onValueChange={(val) => handleChange(index, "taxRate", val.toString())}
                inputMode="decimal"
                min={1}
                max={30}
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-9"
              onClick={() => handleRemove(index)}
              disabled={taxRates.length === 1}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAdd}
          disabled={taxRates.length >= 8}
          className="w-full"
          variant="outline"
        >
          Add new
        </Button>
      </div>
    </div>
  );
}
