import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { menuGradient } from "../theme/gradients";
import { colors } from "../theme/colors";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import StarField from "../components/StarField";

const LoginScreen = ({ onLogin }) => {
  const spin = useRef(new Animated.Value(0)).current;
  const spinOpposite = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const vortex = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const counterVortex = Animated.loop(
      Animated.timing(spinOpposite, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    vortex.start();
    counterVortex.start();
    pulseLoop.start();

    return () => {
      vortex.stop();
      counterVortex.stop();
      pulseLoop.stop();
    };
  }, [spin, spinOpposite, pulse]);

  const spinRotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinRotationOpposite = spinOpposite.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.08],
  });

  const handleSubmit = () => {
    Keyboard.dismiss();
    onLogin?.();
  };

  return (
    <LinearGradient
      colors={menuGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <StatusBar style="light" />
      <StarField />
      <View style={styles.vignette} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.content}>
          <View style={styles.logoArea}>
            <View style={styles.blackHole}>
              <Animated.View
                style={[styles.disk, { transform: [{ rotate: spinRotation }] }]}
              >
                <LinearGradient
                  colors={[
                    "rgba(255,255,255,0.05)",
                    "rgba(255,255,255,0.18)",
                    "rgba(255,255,255,0.32)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.diskGradient}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.disk,
                  styles.diskSecondary,
                  {
                    transform: [
                      { rotate: spinRotationOpposite },
                      { scale: pulseScale },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={[
                    "rgba(205,195,164,0.12)",
                    "rgba(90,100,44,0.42)",
                    "rgba(0,0,0,0.82)",
                  ]}
                  start={{ x: 0.9, y: 0.2 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.diskGradient}
                />
              </Animated.View>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.eventHorizon,
                  { transform: [{ scale: pulseScale }] },
                ]}
              />
              <View style={styles.logoGlow} pointerEvents="none" />
              <Image
                source={require("../../assets/logos/Logo_02.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <View style={styles.form}>
                <TextField
                  placeholder="seu@email.com"
                  placeholderTextColor="#f5e9ff"
                  style={styles.input}
                />
                <TextField
                  placeholder="Digite sua senha"
                  placeholderTextColor="#f5e9ff"
                  secureTextEntry
                  style={styles.input}
                />
                <Text style={styles.helper}>Esqueci minha senha</Text>
                <PrimaryButton
                  label="Seja bem-vindo!"
                  onPress={handleSubmit}
                  style={styles.cta}
                  textStyle={styles.ctaText}
                />
                <Text style={styles.helper}>Criar conta</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
  },
  vignette: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 24,
  },
  blackHole: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  disk: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: "hidden",
    opacity: 0.75,
  },
  diskSecondary: {
    width: 210,
    height: 210,
    borderRadius: 110,
    opacity: 0.65,
  },
  diskGradient: {
    position: "absolute",
    width: 280,
    height: 280,
    top: -20,
    left: -20,
    transform: [{ rotate: "12deg" }],
  },
  eventHorizon: {
    position: "absolute",
    width: 178,
    height: 178,
    borderRadius: 100,
    backgroundColor: "rgba(4,6,2,0.65)",
    borderWidth: 2,
    borderColor: "rgba(236,223,202,0.18)",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  logoGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 110,
    backgroundColor: "rgba(181,140,79,0.16)",
    shadowColor: "#b58c4f",
    shadowOpacity: 0.38,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 0 },
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: "cover",
    borderRadius: 95,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.14)",
    zIndex: 2,
  },
  cardWrapper: {
    gap: 12,
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: 22,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#0f0820",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  cardHeader: {
    gap: 4,
  },
  cardKicker: {
    color: colors.inkSoft,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontSize: 12,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  form: {
    gap: 18,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.38)",
    color: "#fff",
    borderRadius: 50,
    paddingHorizontal: 18,
  },
  helper: {
    color: "#f0e4f6",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 4,
  },
  cta: {
    backgroundColor: "#f7f7f7",
    borderRadius: 50,
    shadowColor: "#1a0f2a",
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  ctaText: {
    color: "#5b1e6d",
    fontWeight: "800",
  },
});

export default LoginScreen;
