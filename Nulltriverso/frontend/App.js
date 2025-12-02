import React, { useState } from "react";
import MenuScreen from "./src/screens/MenuScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EerScreen from "./src/screens/EerScreen";
import TmbScreen from "./src/screens/TmbScreen";
import GetScreen from "./src/screens/GetScreen";
import GcScreen from "./src/screens/GcScreen";
import MiScreen from "./src/screens/MiScreen";
import BedriddenWeightScreen from "./src/screens/BedriddenWeightScreen";
import { Alert } from "react-native";

export default function App() {
  const [screen, setScreen] = useState("menu");

  const handleProfile = () => {
    Alert.alert("Perfil", "Funcionalidade de perfil nao implementada.");
  };

  const handleExit = () => {
    Alert.alert("Sair", "Funcionalidade de sair nao implementada.");
  };

  if (screen === "imc") {
    return (
      <HomeScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "eer") {
    return (
      <EerScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "tmb") {
    return (
      <TmbScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "get") {
    return (
      <GetScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "gc") {
    return (
      <GcScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "mi") {
    return (
      <MiScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  if (screen === "peso") {
    return (
      <BedriddenWeightScreen
        onMenu={() => setScreen("menu")}
        onProfile={handleProfile}
        onExit={handleExit}
      />
    );
  }

  return (
    <MenuScreen
      onOpenImc={() => setScreen("imc")}
      onOpenEer={() => setScreen("eer")}
      onOpenTmb={() => setScreen("tmb")}
      onOpenGet={() => setScreen("get")}
      onOpenGc={() => setScreen("gc")}
      onOpenMi={() => setScreen("mi")}
      onOpenPeso={() => setScreen("peso")}
      onProfile={handleProfile}
      onExit={handleExit}
    />
  );
}
