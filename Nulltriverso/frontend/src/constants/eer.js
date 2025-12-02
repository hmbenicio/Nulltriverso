export const EER_STORAGE_KEY = "eer:last";

export const ACTIVITY_LEVELS = [
  {
    key: "sedentary",
    label: "Sedentario",
    description: "Rotina leve, sem exercicios regulares.",
    femaleFactor: 1,
    maleFactor: 1,
  },
  {
    key: "light",
    label: "Leve",
    description: "Caminhadas ocasionais ou poucos treinos/semana.",
    femaleFactor: 1.12,
    maleFactor: 1.11,
  },
  {
    key: "active",
    label: "Ativo",
    description: "Treinos moderados na maioria dos dias.",
    femaleFactor: 1.27,
    maleFactor: 1.25,
  },
  {
    key: "very_active",
    label: "Muito ativo",
    description: "Treinos intensos e trabalho fisico.",
    femaleFactor: 1.45,
    maleFactor: 1.48,
  },
];
