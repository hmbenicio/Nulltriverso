import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { menuGradient } from "../theme/gradients";
import { colors } from "../theme/colors";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import StarField from "../components/StarField";

const LoginScreen = ({ onLogin, onCreateAccount, onForgotPassword }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;
  const spinOpposite = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const sweep = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const starOrbits = [
    { radius: 96, size: 8, angle: 12 },
    { radius: 110, size: 7, angle: 128 },
    { radius: 82, size: 9, angle: 232 },
  ];

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

    const sweepOrbit = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 6500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    vortex.start();
    counterVortex.start();
    pulseLoop.start();
    sweepOrbit.start();
    shimmerLoop.start();

    return () => {
      vortex.stop();
      counterVortex.stop();
      pulseLoop.stop();
      sweepOrbit.stop();
      shimmerLoop.stop();
    };
  }, [spin, spinOpposite, pulse, sweep, shimmer]);

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

  const sweepRotation = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.4],
  });

  const shimmerScale = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.14],
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
      <View style={styles.coolFilter} />
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
                pointerEvents="none"
                style={[
                  styles.halo,
                  {
                    opacity: shimmerOpacity,
                    transform: [{ scale: shimmerScale }],
                  },
                ]}
              />
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.sweepRing,
                  {
                    transform: [
                      { rotate: sweepRotation },
                      { scale: shimmerScale },
                    ],
                    opacity: shimmerOpacity,
                  },
                ]}
              />
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.moonOrbit,
                  { transform: [{ rotate: sweepRotation }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.moon,
                    {
                      transform: [{ translateX: 112 }, { scale: pulseScale }],
                      opacity: shimmerOpacity,
                    },
                  ]}
                />
              </Animated.View>
              {starOrbits.map((star, index) => (
                <Animated.View
                  key={`star-${index}`}
                  pointerEvents="none"
                  style={[
                    styles.starOrbit,
                    {
                      width: star.radius * 2,
                      height: star.radius * 2,
                      transform: [{ rotate: sweepRotation }],
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.star,
                      {
                        width: star.size,
                        height: star.size,
                        borderRadius: star.size / 2,
                        opacity: shimmerOpacity,
                        transform: [
                          { rotate: `${star.angle}deg` },
                          { translateX: star.radius },
                          { scale: pulseScale },
                        ],
                      },
                    ]}
                  />
                </Animated.View>
              ))}
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
                  colors={["transparent", "transparent", "transparent"]}
                  start={{ x: 0.9, y: 0.2 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.diskGradient}
                />
              </Animated.View>
              <View style={styles.logoGlow} pointerEvents="none" />
              <Image
                source={require("../../assets/logos/Logo_00_1.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.loginTitle}>Acesse sua conta</Text>
                <Text style={styles.cardSubtitle}>
                  Conecte-se para continuar
                </Text>
              </View>
              <View style={styles.form}>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color="#f5e9ff"
                    style={styles.inputIcon}
                  />
                  <TextField
                    placeholder="seu@email.com"
                    placeholderTextColor="#f5e9ff"
                    style={[styles.input, styles.inputWithIcon]}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={22}
                    color="#f5e9ff"
                    style={styles.inputIcon}
                  />
                  <TextField
                    placeholder="Digite sua senha"
                    placeholderTextColor="#f5e9ff"
                    secureTextEntry={!passwordVisible}
                    style={[styles.input, styles.inputWithIcon]}
                  />
                  <Pressable
                    onPress={() => setPasswordVisible((prev) => !prev)}
                    hitSlop={10}
                    style={styles.passwordToggle}
                  >
                    <MaterialCommunityIcons
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#f5e9ff"
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={styles.rememberRow}
                  onPress={() => setRememberMe((prev) => !prev)}
                  hitSlop={8}
                >
                  <MaterialCommunityIcons
                    name={rememberMe ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                    size={22}
                    color="#f5e9ff"
                  />
                  <Text style={styles.rememberLabel}>Lembrar senha</Text>
                </Pressable>
                <Pressable onPress={onForgotPassword} hitSlop={8}>
                  <Text style={styles.helper}>Esqueci minha senha</Text>
                </Pressable>
                <PrimaryButton
                  label="Seja bem-vindo!"
                  onPress={handleSubmit}
                  style={styles.cta}
                  textStyle={styles.ctaText}
                />
                <Pressable onPress={onCreateAccount} hitSlop={8}>
                  <Text style={styles.helper}>Criar conta</Text>
                </Pressable>
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
  coolFilter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(70,180,255,0.24)",
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
    opacity: 0.5,
  },
  diskSecondary: {
    width: 210,
    height: 210,
    borderRadius: 110,
    opacity: 0,
  },
  diskGradient: {
    position: "absolute",
    width: 280,
    height: 280,
    top: -20,
    left: -20,
    transform: [{ rotate: "12deg" }],
  },
  halo: {
    position: "absolute",
    width: 246,
    height: 246,
    borderRadius: 123,
    backgroundColor: "rgba(255,255,255,0.08)",
    shadowColor: "#c9daff",
    shadowOpacity: 0.38,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
  },
  sweepRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: "rgba(216,229,255,0.45)",
    shadowColor: "#dbe9ff",
    shadowOpacity: 0.6,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 0 },
  },
  moonOrbit: {
    position: "absolute",
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  moon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(236,232,222,0.95)",
    borderWidth: 2,
    borderColor: "rgba(120,110,90,0.35)",
    shadowColor: "#fff5db",
    shadowOpacity: 0.85,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  starOrbit: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    position: "absolute",
    backgroundColor: "rgba(255,245,219,0.9)",
    shadowColor: "#fff3d1",
    shadowOpacity: 0.8,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  logoGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 110,
    backgroundColor: "rgba(200,220,255,0.12)",
    shadowColor: "#c9daff",
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
    backgroundColor: "transparent",
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
  loginTitle: {
    color: "#f5e9ff",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.4,
  },
  cardSubtitle: {
    color: "#e9def5",
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
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
    paddingVertical: 14,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
  inputIcon: {
    position: "absolute",
    left: 18,
    zIndex: 1,
  },
  passwordToggle: {
    position: "absolute",
    right: 18,
    padding: 4,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -4,
  },
  rememberLabel: {
    color: "#f5e9ff",
    fontWeight: "700",
    letterSpacing: 0.1,
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
    color: "#111827",
    fontWeight: "800",
  },
});

export default LoginScreen;
