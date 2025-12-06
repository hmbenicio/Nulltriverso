export const RCQ_STORAGE_KEY = "rcq:last";

export const RCQ_THRESHOLDS = {
  female: [
    { label: "Baixo", range: "< 0,85", max: 0.85, color: "#60a5fa" },
    { label: "Elevado", range: "0,85 - 1,0", min: 0.85, max: 1, color: "#f59e0b" },
    { label: "Muito elevado", range: "> 1,0", min: 1, color: "#ef4444" },
  ],
  male: [
    { label: "Baixo", range: "< 0,90", max: 0.9, color: "#60a5fa" },
    { label: "Elevado", range: "0,90 - 1,0", min: 0.9, max: 1, color: "#f59e0b" },
    { label: "Muito elevado", range: "> 1,0", min: 1, color: "#ef4444" },
  ],
};
