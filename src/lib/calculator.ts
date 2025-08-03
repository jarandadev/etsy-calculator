// shippingCalculator.ts

// === Constantes ===
export const ETSY_TAX_PERCENT = 6.5;
export const OPERATING_TAX_PERCENT = 0.72;
export const PAYMENT_TAX_PERCENT = 6.5;
export const FIXED_FEE = 0.15; // coste fijo por pedido

// === Calcula el total de comisiones e impuestos ===
export function calculateFees(
  totalProductPrice: number,
  totalShippingPrice: number,
  salesTaxPercent: number
) {
  const salesTax = salesTaxPercent / 100;
  const etsyTax = ETSY_TAX_PERCENT / 100;
  const paymentTax = PAYMENT_TAX_PERCENT / 100;
  const operatingTax = OPERATING_TAX_PERCENT / 100;

  const totalSellingPrice =
    (totalProductPrice + totalShippingPrice) * (1 + salesTax);

  const etsyFeeProduct = totalProductPrice * etsyTax;
  const etsyFeeShipping = totalShippingPrice * etsyTax;
  const paymentFee = totalSellingPrice * paymentTax + FIXED_FEE;
  const operatingCost = (totalProductPrice + totalShippingPrice) * operatingTax;

  const vatOnEtsy = (etsyFeeProduct + etsyFeeShipping) * salesTax;
  const vatOnPayment = paymentFee * salesTax;
  const vatOnOperating = operatingCost * salesTax;

  const totalFees =
    etsyFeeProduct +
    etsyFeeShipping +
    paymentFee +
    operatingCost +
    vatOnEtsy +
    vatOnPayment +
    vatOnOperating;

  const totalProfit = totalProductPrice + totalShippingPrice - totalFees;

  return {
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
  };
}

function calculateTotalShipping(
  productPrice: number,
  productCost: number,
  units: number,
  salesTaxPercent: number,
  shippingCost: number,
  profitPercent: number,
  tolerance: number = 0.0001
): number {
  const totalProductPrice = productPrice * units;
  const totalProductCost = productCost * units;
  const totalShippingCost = shippingCost * units;

  // Beneficio sobre margen
  const marginProfit =
    (profitPercent / 100) * (productPrice - productCost) * units;

  // Queremos que el beneficio sea al menos cubrir shippingCost real
  // plus margen según profitPercent
  const desiredProfit = marginProfit;

  let low = 0;
  let high = 1000;
  let mid = 0;

  while (high - low > tolerance) {
    mid = (low + high) / 2;

    const shippingPrice = mid;
    const { totalFees } = calculateFees(
      totalProductPrice,
      shippingPrice,
      salesTaxPercent
    );

    const revenue = totalProductPrice + shippingPrice;

    const profit = revenue - totalFees - totalProductCost - totalShippingCost;

    if (profit < desiredProfit) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return parseFloat(mid.toFixed(2));
}

export function calculateBaseShipping(
  productPrice: number,
  productCost: number,
  salesTaxPercent: number,
  shippingCost: number,
  profitPercent: number
): number | null {
  if (productPrice <= 0 || productCost <= 0 || shippingCost <= 0) return null;
  return calculateTotalShipping(
    productPrice,
    productCost,
    1,
    salesTaxPercent,
    shippingCost,
    profitPercent
  );
}

export function calculateExtraShipping(
  productPrice: number,
  productCost: number,
  salesTaxPercent: number,
  shippingCost: number,
  totalUnits: number,
  profitPercent: number
): number | null {
  if (productPrice <= 0 || productCost <= 0 || shippingCost <= 0 || totalUnits <= 1) return null;

  const shipping1 = calculateTotalShipping(
    productPrice,
    productCost,
    1,
    salesTaxPercent,
    shippingCost,
    profitPercent
  );
  const shippingN = calculateTotalShipping(
    productPrice,
    productCost,
    totalUnits,
    salesTaxPercent,
    shippingCost,
    profitPercent
  );

  const extraUnits = totalUnits - 1;
  const extraUnitCost = (shippingN - shipping1) / extraUnits;

  return parseFloat(extraUnitCost.toFixed(2));
}
