import { useCallback, useState } from "react";

export const useAppNavigation = (initialScreen) => {
  const [screen, setScreen] = useState(initialScreen);

  const navigate = useCallback((nextScreen) => {
    setScreen(nextScreen);
  }, []);

  return { screen, navigate };
};
