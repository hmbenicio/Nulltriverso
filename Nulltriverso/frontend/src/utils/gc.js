import { GC_PROTOCOLS } from "../constants/gc";

const findProtocol = (key) => GC_PROTOCOLS.find((p) => p.key === key) || GC_PROTOCOLS[0];

const calculateDcJackson = ({ ageYears, sum, sex, protocol }) => {
  const sumSq = sum * sum;
  if (protocol === "jackson7") {
    if (sex === "male") {
      return 1.112 - 0.00043499 * sum + 0.00000055 * sumSq - 0.00028826 * ageYears;
    }
    return 1.097 - 0.00046971 * sum + 0.00000056 * sumSq - 0.00012828 * ageYears;
  }

  if (sex === "male") {
    return 1.10938 - 0.0008267 * sum + 0.0000016 * sumSq - 0.0002574 * ageYears;
  }
  return 1.0994921 - 0.0009929 * sum + 0.0000023 * sumSq - 0.0001392 * ageYears;
};

const calculateSiri = (dc) => (dc ? 495 / dc - 450 : NaN);

const calculateCircumference = ({ sex, heightCm, neckCm, waistCm, hipCm }) => {
  const log10 = (val) => Math.log10(val);
  if (sex === "male") {
    return 86.010 * log10(waistCm - neckCm) - 70.041 * log10(heightCm) + 36.76;
  }
  return (
    163.205 * log10(waistCm + hipCm - neckCm) -
    97.684 * log10(heightCm) -
    78.387
  );
};

export const calculateBodyFat = ({
  protocolKey,
  ageYears,
  sex,
  sumFolds,
  heightCm,
  neckCm,
  waistCm,
  hipCm,
}) => {
  const protocol = findProtocol(protocolKey);

  if (protocol.key === "us_navy") {
    const bf = calculateCircumference({
      sex,
      heightCm,
      neckCm,
      waistCm,
      hipCm,
    });
    return {
      protocol,
      bodyFat: Math.round(bf * 10) / 10,
      dc: null,
      method: "Circunferencia (US Navy)",
    };
  }

  const dc = calculateDcJackson({
    ageYears,
    sum: sumFolds,
    sex,
    protocol: protocol.key,
  });
  const bf = calculateSiri(dc);

  return {
    protocol,
    bodyFat: Math.round(bf * 10) / 10,
    dc,
    method: `${protocol.key === "jackson7" ? "7" : "3"} dobras + Siri`,
  };
};
