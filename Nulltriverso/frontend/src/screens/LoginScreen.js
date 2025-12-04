import React from "react";
import {
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
            <Image
              source={require("../../assets/Logo_00.png")}
              style={styles.logo}
            />
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
                  label="Sign in"
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.14)",
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
