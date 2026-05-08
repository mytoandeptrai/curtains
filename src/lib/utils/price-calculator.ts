export interface PriceExtra {
  type: 'fixed' | 'per-m2';
  amount: number;
}

/**
 * Calculate product price based on dimensions and base price + extras.
 * Formula: (width × height × base_price) + extras
 *
 * @param width - Width in meters (decimal)
 * @param height - Height in meters (decimal)
 * @param basePrice - Base price per m²
 * @param extras - Optional array of extra charges (fixed or per-m²)
 * @returns Calculated price (rounded to nearest whole number), or 0 for invalid inputs
 */
export function calculatePrice(
  width: number,
  height: number,
  basePrice: number,
  extras: PriceExtra[] = [],
): number {
  if (width <= 0 || height <= 0 || basePrice <= 0) {
    return 0;
  }

  const area = width * height;
  let totalPrice = area * basePrice;

  for (const extra of extras) {
    if (extra.type === 'fixed') {
      totalPrice += extra.amount;
    } else if (extra.type === 'per-m2') {
      totalPrice += area * extra.amount;
    }
  }

  return Math.round(totalPrice);
}

/**
 * Format price as Vietnamese currency (VND, no decimal places)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}
