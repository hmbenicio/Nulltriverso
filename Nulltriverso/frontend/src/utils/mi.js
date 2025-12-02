import { MI_STORAGE_KEY } from "../constants/mi";

const PI = Math.PI;

export const calculateMama = ({ armCircumferenceCm, tricepsFoldCm }) => {
  const cmb = armCircumferenceCm - PI * tricepsFoldCm;
  const area = (cmb * cmb) / (4 * PI);
  return {
    cmb,
    area,
  };
};

export const STORAGE_KEY = MI_STORAGE_KEY;
