export const currencyFormatter = (amount: number, decimals: boolean) => {
    return new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: decimals ? 2 : 0
    }).format(amount);
}