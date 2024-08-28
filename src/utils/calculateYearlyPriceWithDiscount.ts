function calculateYearlyPriceWithDiscount(monthlyPrice: number): number {
    // Ensure the monthly price is a positive number
    if (monthlyPrice < 0) {
        throw new Error("Monthly price must be a positive number.");
    }

    // Calculate the total price for 12 months
    const yearlyPrice = monthlyPrice * 12;

    // Calculate the discounted price (20% off)
    const discount = 0.20;
    const discountedYearlyPrice = yearlyPrice * (1 - discount);

    return discountedYearlyPrice;
}
