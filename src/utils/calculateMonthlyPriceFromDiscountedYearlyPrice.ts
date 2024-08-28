function calculateMonthlyPriceFromDiscountedYearlyPrice(discountedYearlyPrice: number): number {
  // Ensure the discounted yearly price is a positive number
  if (discountedYearlyPrice < 0) {
    throw new Error("Discounted yearly price must be a positive number.");
  }

  // Calculate the yearly price before discount
  const discount = 0.2;
  const yearlyPriceBeforeDiscount = discountedYearlyPrice / (1 - discount);

  // Calculate the monthly price
  const monthlyPrice = yearlyPriceBeforeDiscount / 12;

  return monthlyPrice;
}
