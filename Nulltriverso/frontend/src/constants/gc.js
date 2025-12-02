export const GC_STORAGE_KEY = "gc:last";

export const GC_PROTOCOLS = [
  {
    key: "jackson3",
    label: "Dobras (3) - Jackson & Pollock",
    description:
      "Homens: peitoral, abdominal e coxa. Mulheres: triceps, suprailica e coxa.",
    fields: [
      { key: "chest", label: "Peitoral (mm)", placeholder: "Peitoral", type: "number", forSex: "male" },
      { key: "abdominal", label: "Abdominal (mm)", placeholder: "Abdominal", type: "number", forSex: "male" },
      { key: "thigh", label: "Coxa (mm)", placeholder: "Coxa", type: "number" },
      { key: "triceps", label: "Triceps (mm)", placeholder: "Triceps", type: "number", forSex: "female" },
      { key: "suprailiac", label: "Suprailica (mm)", placeholder: "Suprailica", type: "number", forSex: "female" },
    ],
  },
  {
    key: "jackson7",
    label: "Dobras (7) - Jackson & Pollock",
    description:
      "Peitoral, axilar media, triceps, subescapular, abdominal, suprailica e coxa.",
    fields: [
      { key: "chest", label: "Peitoral (mm)", placeholder: "Peitoral", type: "number" },
      { key: "midaxillary", label: "Axilar media (mm)", placeholder: "Axilar media", type: "number" },
      { key: "triceps", label: "Triceps (mm)", placeholder: "Triceps", type: "number" },
      { key: "subscapular", label: "Subescapular (mm)", placeholder: "Subescapular", type: "number" },
      { key: "abdominal", label: "Abdominal (mm)", placeholder: "Abdominal", type: "number" },
      { key: "suprailiac", label: "Suprailica (mm)", placeholder: "Suprailica", type: "number" },
      { key: "thigh", label: "Coxa (mm)", placeholder: "Coxa", type: "number" },
    ],
  },
  {
    key: "us_navy",
    label: "Circunferencias (US Navy)",
    description: "Pescoco, cintura (e quadril para mulheres).",
    fields: [
      { key: "neck", label: "Pescoco (cm)", placeholder: "Pescoco", type: "number" },
      { key: "waist", label: "Cintura (cm)", placeholder: "Cintura", type: "number" },
      { key: "hip", label: "Quadril (cm, apenas mulheres)", placeholder: "Quadril", type: "number", forSex: "female" },
    ],
  },
];
