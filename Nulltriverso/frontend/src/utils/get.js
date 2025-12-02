import { NAF_LEVELS } from "../constants/get";

const HB_REF = {
  male: { base: 66.47, weight: 13.75, height: 5, age: 6.76 },
  female: { base: 655.1, weight: 9.56, height: 1.85, age: 4.68 },
};

export const calculateGeb = ({ ageYears, weightKg, heightCm, sex }) => {
  const ref = HB_REF[sex === "male" ? "male" : "female"];
  const geb =
    ref.base +
    ref.weight * weightKg +
    ref.height * heightCm -
    ref.age * ageYears;
  return Math.max(0, geb);
};

export const getNaf = (key) => NAF_LEVELS.find((item) => item.key === key) || NAF_LEVELS[0];

export const calculateGet = ({ ageYears, weightKg, heightCm, sex, nafKey }) => {
  const naf = getNaf(nafKey);
  const geb = calculateGeb({ ageYears, weightKg, heightCm, sex });
  const get = geb * naf.factor;

  return {
    naf,
    geb: Math.round(geb),
    get: Math.round(get),
  };
};
