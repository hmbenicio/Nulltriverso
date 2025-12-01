import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

const PrimaryButton = ({ label, onPress }) => (
  <Pressable
    android_ripple={{ color: "#e5ab7e55" }}
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
    ]}
    onPress={onPress}
  >
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default PrimaryButton;
