import { BED_STORAGE_KEY } from "../constants/bedridden";

export const calculateBedriddenWeight = ({
  sex,
  calfCircumferenceCm,
  kneeHeightCm,
  armCircumferenceCm,
  subscapularFoldMm,
}) => {
  if (sex === "male") {
    return (
      0.98 * calfCircumferenceCm +
      1.16 * kneeHeightCm +
      1.73 * armCircumferenceCm +
      0.37 * subscapularFoldMm -
      81.69
    );
  }

  return (
    1.27 * calfCircumferenceCm +
    0.87 * kneeHeightCm +
    0.98 * armCircumferenceCm +
    0.4 * subscapularFoldMm -
    62.35
  );
};

export const STORAGE_KEY = BED_STORAGE_KEY;
