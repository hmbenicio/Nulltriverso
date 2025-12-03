import { RCQ_THRESHOLDS, RCQ_STORAGE_KEY } from "../constants/rcq";

export const calculateRcq = ({ waistCm, hipCm }) => {
  if (!hipCm) return NaN;
  return Number((waistCm / hipCm).toFixed(3));
};

export const statusFromRcq = (value, sex = "female") => {
  const rules = RCQ_THRESHOLDS[sex === "male" ? "male" : "female"];
  if (value < rules[0].max) return rules[0];
  if (value >= (rules[1].min || 0) && value < (rules[1].max || Infinity)) return rules[1];
  return rules[2];
};

export { RCQ_STORAGE_KEY };
