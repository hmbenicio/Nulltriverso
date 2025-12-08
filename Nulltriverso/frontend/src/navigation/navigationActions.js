import { ROUTES } from "./routes";

export const createNavigationActions = (navigate) => ({
  goToLogin: () => navigate(ROUTES.LOGIN),
  goToRegister: () => navigate(ROUTES.REGISTER),
  goToMenu: () => navigate(ROUTES.MENU),
  goToImc: () => navigate(ROUTES.IMC),
  goToEer: () => navigate(ROUTES.EER),
  goToTmb: () => navigate(ROUTES.TMB),
  goToGet: () => navigate(ROUTES.GET),
  goToGc: () => navigate(ROUTES.GC),
  goToMi: () => navigate(ROUTES.MI),
  goToPeso: () => navigate(ROUTES.PESO),
  goToWhtr: () => navigate(ROUTES.WHTR),
  goToRcq: () => navigate(ROUTES.RCQ),
  goToRcest: () => navigate(ROUTES.RCEST),
  goToResetPassword: () => navigate(ROUTES.RESET_PASSWORD),
  goToNaf: () => navigate(ROUTES.NAF),
  goToHidrica: () => navigate(ROUTES.HIDRICA),
  goToMacro: () => navigate(ROUTES.MACRO),
});
