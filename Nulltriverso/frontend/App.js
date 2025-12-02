import React, { useState } from "react";
import MenuScreen from "./src/screens/MenuScreen";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  const [screen, setScreen] = useState("menu");

  if (screen === "imc") {
    return <HomeScreen onBack={() => setScreen("menu")} />;
  }

  return <MenuScreen onOpenImc={() => setScreen("imc")} />;
}
