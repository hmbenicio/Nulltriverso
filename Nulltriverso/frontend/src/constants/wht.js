export const WHTR_STORAGE_KEY = "whtr:last";

export const WHTR_SEGMENTS = [
  { label: "Muito baixo", range: "< 0,40", max: 0.4, color: "#60a5fa" },
  { label: "Saudavel", range: "0,40 - 0,50", max: 0.5, color: "#22c55e" },
  { label: "Aumentado", range: "0,50 - 0,60", max: 0.6, color: "#f59e0b" },
  { label: "Muito alto", range: "> 0,60", max: 1, color: "#ef4444" },
];
