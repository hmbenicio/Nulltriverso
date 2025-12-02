export const parseLocaleNumber = (value) => {
  if (value === null || value === undefined) return NaN;
  return parseFloat(String(value).replace(",", "."));
};
