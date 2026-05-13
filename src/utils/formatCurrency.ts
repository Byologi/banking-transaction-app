export const formatCurrency = (
  amount: number,
  currency: string = "GHS"
) => {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
  }).format(amount);
};