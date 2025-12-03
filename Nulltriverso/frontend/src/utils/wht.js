import { WHTR_SEGMENTS, WHTR_STORAGE_KEY } from "../constants/wht";

export const calculateWhtr = ({ waistCm, heightCm }) => {
  if (!heightCm) return NaN;
  return Number((waistCm / heightCm).toFixed(3));
};

export const statusFromWhtr = (value) => {
  if (value < 0.4) return WHTR_SEGMENTS[0];
  if (value < 0.5) return WHTR_SEGMENTS[1];
  if (value < 0.6) return WHTR_SEGMENTS[2];
  return WHTR_SEGMENTS[3];
};

export { WHTR_STORAGE_KEY };
