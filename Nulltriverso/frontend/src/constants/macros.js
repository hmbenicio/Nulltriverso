export const MACRO_PRESETS = [
  {
    key: "balanced",
    label: "Balanceado",
    description: "50% carboidratos, 20% proteinas, 30% gorduras.",
    ratios: { carb: 0.5, protein: 0.2, fat: 0.3 },
  },
  {
    key: "high_protein",
    label: "Proteico",
    description: "40% carboidratos, 30% proteinas, 30% gorduras.",
    ratios: { carb: 0.4, protein: 0.3, fat: 0.3 },
  },
  {
    key: "low_carb",
    label: "Baixo carbo",
    description: "25% carboidratos, 30% proteinas, 45% gorduras.",
    ratios: { carb: 0.25, protein: 0.3, fat: 0.45 },
  },
];

export const MACRO_STORAGE_KEY = "@nulltriverso/macros";
