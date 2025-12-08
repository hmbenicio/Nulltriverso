import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { menuGradient } from "../theme/gradients";
import { colors } from "../theme/colors";
import StarField from "../components/StarField";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";

const CODE_LENGTH = 6;

const ResetPasswordScreen = ({ onBackToLogin, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [validated, setValidated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const codeRefs = useRef([]);

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9), digits.slice(9, 11)].filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
    if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
    return `${parts[0]}.${parts[1]}.${parts[2]}-${parts[3]}`;
  };

  const handleCodeChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < CODE_LENGTH - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      const prevIndex = index - 1;
      codeRefs.current[prevIndex]?.focus();
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!validated) {
      setValidated(true);
      return;
    }
    onSubmit?.();
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
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../../assets/logos/Logo_00_1.png")}
                style={[styles.headerLogo, styles.headerLogoGlow]}
                blurRadius={22}
              />
              <Image
                source={require("../../assets/logos/Logo_00_1.png")}
                style={styles.headerLogo}
              />
            </View>
            <Text style={styles.title}>Recupere o acesso</Text>
            <Text style={styles.subtitle}>
              Use os dados de cadastro para validar e liberar a troca de senha.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#f5e9ff" />
              <View style={styles.sectionText}>
                <Text style={styles.sectionTitle}>Verificacao rapida</Text>
                <Text style={styles.sectionSubtitle}>
                  Confirmamos sua identidade antes de redefinir a senha.
                </Text>
              </View>
            </View>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  placeholder="E-mail de cadastro"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  style={[styles.input, styles.inputWithIcon]}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  placeholder="CPF"
                  keyboardType="number-pad"
                  value={cpf}
                  onChangeText={(text) => setCpf(formatCpf(text))}
                  style={[styles.input, styles.inputWithIcon]}
                />
              </View>

              <View style={styles.codeHeader}>
                <Text style={styles.codeLabel}>Codigo de seguranca (OTP)</Text>
                <Text style={styles.codeHint}>
                  Consulte o codigo recebido no cadastro e insira abaixo.
                </Text>
              </View>

              <View style={styles.codeRow}>
                {code.map((value, index) => (
                  <TextField
                    key={`code-${index}`}
                    ref={(ref) => (codeRefs.current[index] = ref)}
                    value={value}
                    placeholder="-"
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(event) => handleCodeKeyPress(event, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    style={[
                      styles.codeInput,
                      focusedIndex === index && styles.codeInputActive,
                      value && styles.codeInputFilled,
                    ]}
                  />
                ))}
              </View>

              {validated ? (
                <View style={styles.newPasswordSection}>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color="#0d1b2a"
                      style={styles.inputIcon}
                    />
                    <TextField
                      placeholder="Nova senha"
                      secureTextEntry={!newPasswordVisible}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      style={[styles.input, styles.inputWithIcon]}
                    />
                    <Pressable
                      onPress={() => setNewPasswordVisible((prev) => !prev)}
                      hitSlop={10}
                      style={styles.passwordToggle}
                    >
                      <MaterialCommunityIcons
                        name={newPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#0d1b2a"
                      />
                    </Pressable>
                  </View>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons
                      name="lock-check-outline"
                      size={20}
                      color="#0d1b2a"
                      style={styles.inputIcon}
                    />
                    <TextField
                      placeholder="Confirmar nova senha"
                      secureTextEntry={!confirmPasswordVisible}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      style={[styles.input, styles.inputWithIcon]}
                    />
                    <Pressable
                      onPress={() => setConfirmPasswordVisible((prev) => !prev)}
                      hitSlop={10}
                      style={styles.passwordToggle}
                    >
                      <MaterialCommunityIcons
                        name={confirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#0d1b2a"
                      />
                    </Pressable>
                  </View>
                </View>
              ) : null}

              <PrimaryButton
                label={validated ? "Salvar nova senha" : "Validar e trocar senha"}
                onPress={handleSubmit}
                style={styles.cta}
                textStyle={styles.ctaText}
              />

              <Pressable onPress={onBackToLogin} hitSlop={8}>
                <Text style={styles.helper}>Voltar para o login</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
    gap: 18,
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
  header: {
    gap: 0,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  logoWrapper: {
    width: "100%",
    height: 180,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -20,
  },
  headerLogo: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    borderRadius: 16,
  },
  headerLogoGlow: {
    position: "absolute",
    opacity: 0.9,
    transform: [{ scale: 1.02 }],
    shadowColor: "#ffe5b8",
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 6 },
  },
  title: {
    color: "#f5e9ff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  subtitle: {
    color: "#e9def5",
    textAlign: "center",
    maxWidth: 320,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#0f0820",
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
  },
  sectionHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  sectionText: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    color: "#f5e9ff",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#f0e4f6",
    fontSize: 14,
    fontWeight: "600",
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "rgba(13,27,42,0.15)",
    color: "#0d1b2a",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    padding: 6,
  },
  codeHeader: {
    gap: 4,
  },
  codeLabel: {
    color: "#f5e9ff",
    fontWeight: "800",
    fontSize: 14,
  },
  codeHint: {
    color: "#f0e4f6",
    fontSize: 13,
    fontWeight: "600",
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  newPasswordSection: {
    gap: 12,
  },
  codeInput: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "rgba(13,27,42,0.1)",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    color: "#0d1b2a",
  },
  codeInputActive: {
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  codeInputFilled: {
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(34,197,94,0.7)",
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
  helper: {
    color: "#f0e4f6",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 4,
  },
});

export default ResetPasswordScreen;
