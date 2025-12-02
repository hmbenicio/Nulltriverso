export const GC_STORAGE_KEY = "gc:last";

export const GC_PROTOCOLS = [
  {
    key: "jackson3",
    label: "Dobras (3) · Jackson & Pollock",
    description: "Soma de 3 dobras (mm): peitoral/abdominal/coxa (H) ou triceps/suprail/cox (M).",
    fields: [
      { key: "sumFolds", label: "Soma das 3 dobras (mm)", placeholder: "Ex.: 65", type: "number" },
    ],
  },
  {
    key: "jackson7",
    label: "Dobras (7) · Jackson & Pollock",
    description: "Soma de 7 dobras (mm): peitoral, axilar, triceps, subescapular, abdominal, suprail, coxa.",
    fields: [
      { key: "sumFolds", label: "Soma das 7 dobras (mm)", placeholder: "Ex.: 170", type: "number" },
    ],
  },
  {
    key: "us_navy",
    label: "Circunferencias (US Navy)",
    description: "Pescoço, cintura (e quadril para mulheres).",
    fields: [
      { key: "neck", label: "Pescoco (cm)", placeholder: "Ex.: 36", type: "number" },
      { key: "waist", label: "Cintura (cm)", placeholder: "Ex.: 82", type: "number" },
      { key: "hip", label: "Quadril (cm, apenas mulheres)", placeholder: "Ex.: 96", type: "number" },
    ],
  },
];
