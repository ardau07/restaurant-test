export const decimalFormat = (number = 0, fractions = 0) => {
  return Number(number).toLocaleString('en-US', {
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions,
  });
};
