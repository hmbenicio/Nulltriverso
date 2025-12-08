import BedriddenWeightScreen from "../screens/BedriddenWeightScreen";
import EerScreen from "../screens/EerScreen";
import GcScreen from "../screens/GcScreen";
import GetScreen from "../screens/GetScreen";
import HidricaScreen from "../screens/HidricaScreen";
import ImcScreen from "../screens/ImcScreen";
import LoginScreen from "../screens/LoginScreen";
import MacroScreen from "../screens/MacroScreen";
import MenuScreen from "../screens/MenuScreen";
import MiScreen from "../screens/MiScreen";
import NafScreen from "../screens/NafScreen";
import RceScreen from "../screens/RceScreen";
import RcqScreen from "../screens/RcqScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import TmbScreen from "../screens/TmbScreen";
import WhtrScreen from "../screens/WhtrScreen";
import { ROUTES } from "./routes";

export const buildScreenRegistry = ({ actions, handlers, commonNavigation }) => ({
  [ROUTES.LOGIN]: {
    component: LoginScreen,
    getProps: () => ({
      onLogin: actions.goToMenu,
      onForgotPassword: actions.goToResetPassword,
      onCreateAccount: actions.goToRegister,
    }),
  },
  [ROUTES.REGISTER]: {
    component: RegisterScreen,
    getProps: () => ({
      onBackToLogin: actions.goToLogin,
      onRegister: actions.goToMenu,
    }),
  },
  [ROUTES.MENU]: {
    component: MenuScreen,
    getProps: () => ({
      onOpenImc: actions.goToImc,
      onOpenEer: actions.goToEer,
      onOpenTmb: actions.goToTmb,
      onOpenGet: actions.goToGet,
      onOpenGc: actions.goToGc,
      onOpenMi: actions.goToMi,
      onOpenPeso: actions.goToPeso,
      onOpenWhtr: actions.goToWhtr,
      onOpenRcq: actions.goToRcq,
      onOpenRcest: actions.goToRcest,
      onOpenNaf: actions.goToNaf,
      onOpenHidrica: actions.goToHidrica,
      onOpenMacro: actions.goToMacro,
      onProfile: handlers.onProfile,
      onExit: handlers.onExit,
    }),
  },
  [ROUTES.IMC]: {
    component: ImcScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.EER]: {
    component: EerScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.TMB]: {
    component: TmbScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.GET]: {
    component: GetScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.GC]: {
    component: GcScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.MI]: {
    component: MiScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.PESO]: {
    component: BedriddenWeightScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.WHTR]: {
    component: WhtrScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.RCQ]: {
    component: RcqScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.RCEST]: {
    component: RceScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.RESET_PASSWORD]: {
    component: ResetPasswordScreen,
    getProps: () => ({
      onBackToLogin: actions.goToLogin,
      onSubmit: actions.goToLogin,
    }),
  },
  [ROUTES.NAF]: {
    component: NafScreen,
    getProps: () => ({ ...commonNavigation, onTmb: actions.goToTmb }),
  },
  [ROUTES.HIDRICA]: {
    component: HidricaScreen,
    getProps: () => commonNavigation,
  },
  [ROUTES.MACRO]: {
    component: MacroScreen,
    getProps: () => commonNavigation,
  },
});

export const renderScreenFromRegistry = (screen, registry) => {
  const entry = registry[screen];
  if (!entry) return null;

  const Component = entry.component;
  const props = entry.getProps ? entry.getProps() : {};
  return <Component {...props} />;
};
