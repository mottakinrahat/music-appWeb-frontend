export function calculateYearlyPriceWithDiscount(monthlyPrice: number, discount: number): number {
    // Ensure the monthly price is a positive number
    if (monthlyPrice < 0) {
        throw new Error("Monthly price must be a positive number.");
    }

    // Ensure the discount is between 0 and 1
    if (discount < 0 || discount > 1) {
        throw new Error("Discount must be a value between 0 and 1.");
    }

    // Calculate the total price for 12 months
    const yearlyPrice = monthlyPrice * 12;

    // Calculate the discounted price
    const discountedYearlyPrice = yearlyPrice * (1 - discount);

    return discountedYearlyPrice;
}