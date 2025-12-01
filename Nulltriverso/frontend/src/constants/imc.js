export const STORAGE_KEY = "imc:last";

export const IMC_SEGMENTS = [
  { label: "Abaixo", range: "< 18,5", color: "#60a5fa", max: 18.5 },
  { label: "Normal", range: "18,5 - 24,9", color: "#22c55e", max: 24.9 },
  { label: "Sobrepeso", range: "25 - 29,9", color: "#f59e0b", max: 29.9 },
  { label: "Obesidade", range: "30 - 34,9", color: "#ef7d1a", max: 34.9 },
  { label: "Obes. severa", range: ">= 35", color: "#ef4444", max: 40 },
];

export const MOCK_EVOLUTION = [
  { label: "Jan", imc: 27.5 },
  { label: "Fev", imc: 26.8 },
  { label: "Mar", imc: 25.9 },
  { label: "Abr", imc: 25.3 },
  { label: "Mai", imc: 24.6 },
  { label: "Jun", imc: 24.2 },
];
