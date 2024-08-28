export function calculateMonthlyPriceFromDiscountedYearlyPrice(discountedYearlyPrice: number, discount: number): number {
    // Ensure the discounted yearly price is a positive number
    if (discountedYearlyPrice < 0) {
        throw new Error("Discounted yearly price must be a positive number.");
    }

    // Ensure the discount is between 0 and 1
    if (discount < 0 || discount > 1) {
        throw new Error("Discount must be a value between 0 and 1.");
    }

    // Calculate the yearly price before discount
    const yearlyPriceBeforeDiscount = discountedYearlyPrice / (1 - discount);

    // Calculate the monthly price
    const monthlyPrice = yearlyPriceBeforeDiscount / 12;

    return monthlyPrice;
}
