import React, { useState } from "react";
import MenuScreen from "./src/screens/MenuScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EerScreen from "./src/screens/EerScreen";
import TmbScreen from "./src/screens/TmbScreen";
import GetScreen from "./src/screens/GetScreen";
import GcScreen from "./src/screens/GcScreen";
import MiScreen from "./src/screens/MiScreen";
import BedriddenWeightScreen from "./src/screens/BedriddenWeightScreen";

export default function App() {
  const [screen, setScreen] = useState("menu");

  if (screen === "imc") {
    return <HomeScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "eer") {
    return <EerScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "tmb") {
    return <TmbScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "get") {
    return <GetScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "gc") {
    return <GcScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "mi") {
    return <MiScreen onBack={() => setScreen("menu")} />;
  }

  if (screen === "peso") {
    return <BedriddenWeightScreen onBack={() => setScreen("menu")} />;
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
    />
  );
}
