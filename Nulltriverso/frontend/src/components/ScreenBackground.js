import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { menuGradient } from "../theme/gradients";
import StarField from "./StarField";

const ScreenBackground = ({
  children,
  overlayOpacity = 0.36,
  contentStyle,
  style,
}) => (
  <LinearGradient
    colors={menuGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.gradient, style]}
  >
    <StarField />
    <View
      pointerEvents="none"
      style={[
        styles.overlay,
        { backgroundColor: `rgba(70,180,255,${overlayOpacity})` },
      ]}
    />
    <View style={[styles.content, contentStyle]}>{children}</View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
});

export default ScreenBackground;
