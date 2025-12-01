export const statusFromImc = (imc) => {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc <= 24.9) return "Peso normal";
  if (imc <= 29.9) return "Sobrepeso";
  if (imc <= 34.9) return "Obesidade 1";
  if (imc <= 39.9) return "Obesidade 2";
  return "Obesidade 3";
};

export const colorFromImc = (imc) => {
  if (imc < 18.5) return "#60a5fa";
  if (imc <= 24.9) return "#22c55e";
  if (imc <= 29.9) return "#f59e0b";
  if (imc <= 34.9) return "#ef7d1a";
  return "#ef4444";
};

export const clampImc = (value, min = 16, max = 40) =>
  Math.min(Math.max(value, min), max);

export const calculateImc = ({ weightKg, heightCm }) => {
  const heightInMeters = heightCm / 100;
  const imc = weightKg / (heightInMeters * heightInMeters);
  return Number(imc.toFixed(2));
};

export const parseLocaleNumber = (value) => {
  if (value === null || value === undefined) return NaN;
  return parseFloat(String(value).replace(",", "."));
};
