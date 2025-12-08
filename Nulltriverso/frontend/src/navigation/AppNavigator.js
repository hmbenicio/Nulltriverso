import React, { useMemo } from "react";
import { Alert } from "react-native";
import { ROUTES } from "./routes";
import { useAppNavigation } from "./useAppNavigation";
import { createNavigationActions } from "./navigationActions";
import { buildScreenRegistry, renderScreenFromRegistry } from "./screenRegistry";

const useNavigationHandlers = (actions) =>
  useMemo(
    () => ({
      onProfile: actions.goToProfile,
      onInfo: () => {
        Alert.alert("Informacoes", "Area de informacoes em desenvolvimento.");
      },
      onExit: actions.goToLogin,
    }),
    [actions.goToLogin, actions.goToProfile]
  );

const useCommonNavigation = (actions, handlers) =>
  useMemo(
    () => ({
      onMenu: actions.goToMenu,
      onProfile: handlers.onProfile,
      onInfo: handlers.onInfo,
    }),
    [actions.goToMenu, handlers.onInfo, handlers.onProfile]
  );

export const AppNavigator = () => {
  const { screen, navigate } = useAppNavigation(ROUTES.LOGIN);

  const actions = useMemo(
    () => createNavigationActions(navigate),
    [navigate]
  );

  const handlers = useNavigationHandlers(actions);
  const commonNavigation = useCommonNavigation(actions, handlers);

  const registry = useMemo(
    () =>
      buildScreenRegistry({
        actions,
        handlers,
        commonNavigation,
      }),
    [actions, handlers, commonNavigation]
  );

  const resolvedScreen = renderScreenFromRegistry(screen, registry);

  if (!resolvedScreen) {
    return renderScreenFromRegistry(ROUTES.LOGIN, registry);
  }

  return resolvedScreen;
};

export default AppNavigator;
