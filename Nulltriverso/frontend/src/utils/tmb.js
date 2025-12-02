import { TMB_REFERENCE } from "../constants/tmb";

export const calculateTmb = ({ ageYears, weightKg, heightCm, sex }) => {
  const ref = TMB_REFERENCE[sex === "male" ? "male" : "female"];
  const tmb =
    ref.base +
    ref.weight * weightKg +
    ref.height * heightCm -
    ref.age * ageYears;
  return Math.round(Math.max(0, tmb));
};
