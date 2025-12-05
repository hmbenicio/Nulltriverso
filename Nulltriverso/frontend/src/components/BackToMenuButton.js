import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const BackToMenuButton = ({ onPress, style }) => (
  <View style={[styles.wrapper, style]}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <View style={styles.ring} />
      <View style={styles.innerGlow} />
      <MaterialCommunityIcons
        name="home-circle"
        size={64}
        color={colors.surface}
        style={styles.icon}
      />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.85,
  },
  ring: {
    position: "absolute",
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.28)",
  },
  innerGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ scale: 1.12 }],
  },
  icon: {
    transform: [{ translateX: -1 }],
  },
});

export default BackToMenuButton;
