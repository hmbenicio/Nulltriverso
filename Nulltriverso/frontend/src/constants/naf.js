export const NAF_STORAGE_KEY = "naf:last";

export const NAF_LEVELS_EXTENDED = [
  {
    key: "sedentary",
    label: "Sedentario",
    factorRange: "1,0 - 1,39",
    min: 1.0,
    max: 1.39,
    description: "Trabalho sentado, deslocamentos curtos, tarefas leves.",
  },
  {
    key: "light",
    label: "Atividade leve",
    factorRange: "1,4 - 1,59",
    min: 1.4,
    max: 1.59,
    description: "Habitos normais + 30-60min de atividade moderada.",
  },
  {
    key: "moderate",
    label: "Ativo (moderado)",
    factorRange: "1,6 - 1,89",
    min: 1.6,
    max: 1.89,
    description: "60min+ moderado ou 30-60min vigoroso.",
  },
  {
    key: "high",
    label: "Muito ativo",
    factorRange: "1,9 - 2,5",
    min: 1.9,
    max: 2.5,
    description: "Treinos intensos diários ou trabalho braçal pesado.",
  },
];
