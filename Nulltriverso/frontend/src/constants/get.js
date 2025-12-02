export const GET_STORAGE_KEY = "get:last";

export const NAF_LEVELS = [
  { key: "sedentary", label: "Sedentario", factor: 1.2, description: "Pouca ou nenhuma atividade." },
  { key: "light", label: "Levemente ativo", factor: 1.375, description: "Exercicio leve 1-3x/semana." },
  { key: "moderate", label: "Moderadamente ativo", factor: 1.55, description: "Exercicio moderado 3-5x/semana." },
  { key: "high", label: "Muito ativo", factor: 1.725, description: "Exercicio intenso 6-7x/semana." },
  { key: "extreme", label: "Extremamente ativo", factor: 1.9, description: "Treinos muito intensos ou trabalho fisico pesado." },
];
