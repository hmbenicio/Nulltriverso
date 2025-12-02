import { ACTIVITY_LEVELS } from "../constants/eer";

const clampNumber = (value) => (Number.isFinite(value) ? value : 0);

export const getActivityFactor = (sex, levelKey) => {
  const level = ACTIVITY_LEVELS.find((item) => item.key === levelKey);
  if (!level) return 1;
  return sex === "male" ? level.maleFactor : level.femaleFactor;
};

const calculateAdultEer = ({ ageYears, weightKg, heightM, sex, activityLevel }) => {
  const pa = getActivityFactor(sex, activityLevel);

  if (sex === "female") {
    return (
      354 -
      6.91 * ageYears +
      pa * (9.36 * weightKg + 726 * heightM)
    );
  }

  return (
    662 -
    9.53 * ageYears +
    pa * (15.91 * weightKg + 539.6 * heightM)
  );
};

export const calculateEer = ({
  ageYears,
  weightKg,
  heightCm,
  sex,
  activityLevel,
  isPregnant = false,
  gestationalWeeks = 0,
}) => {
  const heightM = heightCm / 100;
  const baseEer = calculateAdultEer({
    ageYears,
    weightKg,
    heightM,
    sex,
    activityLevel,
  });

  const activityFactor = getActivityFactor(sex, activityLevel);
  const gestationalBonus = isPregnant ? gestationalWeeks * 8 + 180 : 0;
  const total = Math.max(0, clampNumber(baseEer) + gestationalBonus);

  return {
    total: Math.round(total),
    base: Math.round(Math.max(0, clampNumber(baseEer))),
    gestationalBonus: Math.round(Math.max(0, gestationalBonus)),
    activityFactor,
  };
};
