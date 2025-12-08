import React, { useCallback, useMemo } from "react";
import { Alert } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import MenuScreen from "./src/screens/MenuScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EerScreen from "./src/screens/EerScreen";
import TmbScreen from "./src/screens/TmbScreen";
import GetScreen from "./src/screens/GetScreen";
import GcScreen from "./src/screens/GcScreen";
import MiScreen from "./src/screens/MiScreen";
import BedriddenWeightScreen from "./src/screens/BedriddenWeightScreen";
import WhtrScreen from "./src/screens/WhtrScreen";
import RcqScreen from "./src/screens/RcqScreen";
import RceScreen from "./src/screens/RceScreen";
import NafScreen from "./src/screens/NafScreen";
import HidricaScreen from "./src/screens/HidricaScreen";
import MacroScreen from "./src/screens/MacroScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import { ROUTES } from "./src/navigation/routes";
import { useAppNavigation } from "./src/navigation/useAppNavigation";

export default function App() {
  const { screen, navigate } = useAppNavigation(ROUTES.LOGIN);

  const handleProfile = useCallback(() => {
    Alert.alert("Perfil", "Funcionalidade de perfil nao implementada.");
  }, []);

  const handleInfo = useCallback(() => {
    Alert.alert("Informações", "Area de informacoes em desenvolvimento.");
  }, []);

  const handleExit = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const goTo = useCallback(
    (nextScreen) => () => navigate(nextScreen),
    [navigate]
  );

  const navigation = useMemo(
    () => ({
      goToLogin: goTo(ROUTES.LOGIN),
      goToRegister: goTo(ROUTES.REGISTER),
      goToMenu: goTo(ROUTES.MENU),
      goToImc: goTo(ROUTES.IMC),
      goToEer: goTo(ROUTES.EER),
      goToTmb: goTo(ROUTES.TMB),
      goToGet: goTo(ROUTES.GET),
      goToGc: goTo(ROUTES.GC),
      goToMi: goTo(ROUTES.MI),
      goToPeso: goTo(ROUTES.PESO),
      goToWhtr: goTo(ROUTES.WHTR),
      goToRcq: goTo(ROUTES.RCQ),
      goToRcest: goTo(ROUTES.RCEST),
      goToResetPassword: goTo(ROUTES.RESET_PASSWORD),
      goToNaf: goTo(ROUTES.NAF),
      goToHidrica: goTo(ROUTES.HIDRICA),
      goToMacro: goTo(ROUTES.MACRO),
    }),
    [goTo]
  );

  const commonNavigation = useMemo(
    () => ({
      onMenu: navigation.goToMenu,
      onProfile: handleProfile,
      onInfo: handleInfo,
    }),
    [navigation.goToMenu, handleProfile, handleInfo]
  );

  switch (screen) {
    case ROUTES.LOGIN:
      return (
        <LoginScreen
          onLogin={navigation.goToMenu}
          onForgotPassword={navigation.goToResetPassword}
          onCreateAccount={navigation.goToRegister}
        />
      );
    case ROUTES.REGISTER:
      return (
        <RegisterScreen
          onBackToLogin={navigation.goToLogin}
          onRegister={navigation.goToMenu}
        />
      );
    case ROUTES.MENU:
      return (
        <MenuScreen
          onOpenImc={navigation.goToImc}
          onOpenEer={navigation.goToEer}
          onOpenTmb={navigation.goToTmb}
          onOpenGet={navigation.goToGet}
          onOpenGc={navigation.goToGc}
          onOpenMi={navigation.goToMi}
          onOpenPeso={navigation.goToPeso}
          onOpenWhtr={navigation.goToWhtr}
          onOpenRcq={navigation.goToRcq}
          onOpenRcest={navigation.goToRcest}
          onOpenNaf={navigation.goToNaf}
          onOpenHidrica={navigation.goToHidrica}
          onOpenMacro={navigation.goToMacro}
          onProfile={handleProfile}
          onExit={handleExit}
        />
      );
    case ROUTES.IMC:
      return <HomeScreen {...commonNavigation} />;
    case ROUTES.EER:
      return <EerScreen {...commonNavigation} />;
    case ROUTES.TMB:
      return <TmbScreen {...commonNavigation} />;
    case ROUTES.GET:
      return <GetScreen {...commonNavigation} />;
    case ROUTES.GC:
      return <GcScreen {...commonNavigation} />;
    case ROUTES.MI:
      return <MiScreen {...commonNavigation} />;
    case ROUTES.PESO:
      return <BedriddenWeightScreen {...commonNavigation} />;
    case ROUTES.WHTR:
      return <WhtrScreen {...commonNavigation} />;
    case ROUTES.RCQ:
      return <RcqScreen {...commonNavigation} />;
    case ROUTES.RCEST:
      return <RceScreen {...commonNavigation} />;
    case ROUTES.RESET_PASSWORD:
      return (
        <ResetPasswordScreen
          onBackToLogin={navigation.goToLogin}
          onSubmit={navigation.goToLogin}
        />
      );
    case ROUTES.NAF:
      return <NafScreen {...commonNavigation} onTmb={navigation.goToTmb} />;
    case ROUTES.HIDRICA:
      return <HidricaScreen {...commonNavigation} />;
    case ROUTES.MACRO:
      return <MacroScreen {...commonNavigation} />;
    default:
      return null;
  }
}
