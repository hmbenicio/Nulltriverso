import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import TextField from "../components/TextField";
import StarField from "../components/StarField";
import { menuGradient } from "../theme/gradients";
import { colors } from "../theme/colors";

const Section = ({ icon, title, description, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>{icon}</View>
      <View style={styles.sectionText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {description ? (
          <Text style={styles.sectionSubtitle}>{description}</Text>
        ) : null}
      </View>
    </View>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const RegisterScreen = ({ onBackToLogin, onRegister }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptPrivacy, setAcceptPrivacy] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [userType, setUserType] = useState(null);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const formatDate = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
    return parts.join("/");
  };

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9), digits.slice(9, 11)].filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]}.${parts[1]}`;
    if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
    return `${parts[0]}.${parts[1]}.${parts[2]}-${parts[3]}`;
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleSubmit = () => {
    onRegister?.();
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
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>
              Separe suas informacoes por tipo de campo e finalize o cadastro em
              poucos passos.
            </Text>
          </View>

          <View style={styles.card}>
            <Section
              icon={
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="#ffffff"
                />
              }
              title="Identidade"
              description="Dados pessoais que ficam visiveis no perfil."
            >
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Nome completo"
                />
              </View>
              <View style={styles.doubleRow}>
                <View style={[styles.inputWrapper, styles.doubleItem, styles.birthDate]}>
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={20}
                    color="#0d1b2a"
                    style={styles.inputIcon}
                  />
                  <TextField
                    style={[styles.input, styles.inputWithIcon]}
                    placeholder="Data de nascimento"
                    keyboardType="number-pad"
                    value={birthDate}
                    onChangeText={(text) => setBirthDate(formatDate(text))}
                  />
                </View>
                <View style={[styles.doubleItem, styles.genderRow, styles.genderColumn]}>
                  <Pressable
                    style={[styles.genderButton, selectedGender === "male" && styles.genderButtonSelected]}
                    onPress={() => setSelectedGender("male")}
                    hitSlop={6}
                  >
                    <MaterialCommunityIcons
                      name="gender-male"
                      size={26}
                      color={selectedGender === "male" ? "#0f482f" : "#ffffff"}
                    />
                  </Pressable>
                  <Pressable
                    style={[styles.genderButton, selectedGender === "female" && styles.genderButtonSelected]}
                    onPress={() => setSelectedGender("female")}
                    hitSlop={6}
                  >
                    <MaterialCommunityIcons
                      name="gender-female"
                      size={26}
                      color={selectedGender === "female" ? "#0f482f" : "#ffffff"}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={[styles.inputWrapper, styles.doubleItem]}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="CPF"
                  keyboardType="number-pad"
                  value={cpf}
                  onChangeText={(text) => setCpf(formatCpf(text))}
                />
              </View>
              <View style={styles.typeColumn}>
                <Text style={styles.typeLabel}>Tipo de usuario</Text>
                <Pressable
                  style={[styles.selectInput, typeMenuOpen && styles.selectInputOpen]}
                  onPress={() => setTypeMenuOpen((prev) => !prev)}
                >
                  <Text style={[styles.selectValue, !userType && styles.selectPlaceholder]}>
                    {userType === "pro"
                      ? "Profissional"
                      : userType === "student"
                      ? "Estudante"
                      : userType === "other"
                      ? "Outros"
                      : "Selecione"}
                  </Text>
                  <MaterialCommunityIcons
                    name={typeMenuOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#0d1b2a"
                  />
                </Pressable>
                {typeMenuOpen && (
                  <View style={styles.selectMenu}>
                    {[
                      { key: "pro", label: "Profissional" },
                      { key: "student", label: "Estudante" },
                      { key: "other", label: "Outros" },
                    ].map((option) => (
                      <Pressable
                        key={option.key}
                        style={styles.selectOption}
                        onPress={() => {
                          setUserType(option.key);
                          setTypeMenuOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.selectOptionText,
                            userType === option.key && styles.selectOptionTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                        {userType === option.key && (
                          <MaterialCommunityIcons
                            name="check"
                            size={18}
                            color="#0f482f"
                          />
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
              {userType === "pro" && (
                <View style={styles.typeDetails}>
                  <Text style={styles.typeDetailsTitle}>Dados profissionais</Text>
                  <TextField style={styles.input} placeholder="Area de atuacao" />
                  <TextField style={styles.input} placeholder="Profissao" />
                  <TextField style={styles.input} placeholder="Numero de registro" />
                  <TextField style={styles.input} placeholder="Conselho" />
                </View>
              )}
              {userType === "student" && (
                <View style={styles.typeDetails}>
                  <Text style={styles.typeDetailsTitle}>Dados estudantis</Text>
                  <TextField style={styles.input} placeholder="Curso" />
                  <TextField style={styles.input} placeholder="Instituicao de ensino" />
                </View>
              )}
            </Section>

            <Section
              icon={
                <MaterialCommunityIcons
                  name="email-edit-outline"
                  size={30}
                  color="#ffffff"
                />
              }
              title="Contato"
              description="Enderecos para recuperar acesso ou receber novidades."
            >
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="E-mail principal"
                />
              </View>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-check-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Confirmar e-mail"
                />
              </View>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="cellphone"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Telefone com DDD"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={(text) => setPhone(formatPhone(text))}
                />
              </View>
            </Section>

            <Section
              icon={
                <MaterialCommunityIcons
                  name="shield-lock-outline"
                  size={30}
                  color="#ffffff"
                />
              }
              title="Seguranca"
              description="Defina uma senha forte e confirme o acesso."
            >
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="#0d1b2a"
                  style={styles.inputIcon}
                />
                <TextField
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Senha"
                  secureTextEntry={!passwordVisible}
                />
                <Pressable
                  style={styles.passwordToggle}
                  onPress={() => setPasswordVisible((prev) => !prev)}
                >
                  <MaterialCommunityIcons
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"}
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
                  style={[styles.input, styles.inputWithIcon]}
                  placeholder="Confirmar senha"
                  secureTextEntry={!confirmVisible}
                />
                <Pressable
                  style={styles.passwordToggle}
                  onPress={() => setConfirmVisible((prev) => !prev)}
                >
                  <MaterialCommunityIcons
                    name={confirmVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#0d1b2a"
                  />
                </Pressable>
              </View>
            </Section>

            <Section
              icon={
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-outline"
                  size={30}
                  color="#ffffff"
                />
              }
              title="Preferencias"
              description="Opcoes de comunicacao e aceite."
            >
              <Pressable style={styles.linkButton} hitSlop={8}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={22}
                  color="#0d1b2a"
                />
                <Text style={styles.linkButtonText}>Uso & Privacidade</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color="#0d1b2a"
                />
              </Pressable>
              <Pressable
                style={styles.optionRow}
                onPress={() => setAcceptTerms((prev) => !prev)}
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name={
                    acceptTerms
                      ? "checkbox-marked-outline"
                      : "checkbox-blank-outline"
                  }
                  size={22}
                  color="#ffffff"
                />
                <Text style={styles.optionLabel}>
                  Li e aceito os termos de uso
                </Text>
              </Pressable>
              <Pressable
                style={styles.optionRow}
                onPress={() => setAcceptPrivacy((prev) => !prev)}
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name={
                    acceptPrivacy
                      ? "checkbox-marked-outline"
                      : "checkbox-blank-outline"
                  }
                  size={22}
                  color="#ffffff"
                />
                <Text style={styles.optionLabel}>
                  Li e aceito a politica de privacidade
                </Text>
              </Pressable>
            </Section>

            <View style={styles.actions}>
              <PrimaryButton
                label="Criar conta"
                onPress={handleSubmit}
                style={styles.cta}
                textStyle={styles.ctaText}
              />
              <Pressable
                style={styles.backRow}
                onPress={onBackToLogin}
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={18}
                  color="#f5e9ff"
                />
                <Text style={styles.backText}>Voltar para login</Text>
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
    paddingBottom: 48,
    gap: 16,
  },
  coolFilter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(70,180,255,0.22)",
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
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  subtitle: {
    color: "#e5dbf4",
    fontSize: 15,
    lineHeight: 20,
  },
  card: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 22,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.32)",
    shadowColor: "#0f0820",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
  sectionSubtitle: {
    color: "#e5e7eb",
    fontSize: 13,
    marginTop: 2,
  },
  sectionBody: {
    gap: 12,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderColor: "#e5d8c7",
    color: colors.ink,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputWithIcon: {
    paddingLeft: 46,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  doubleRow: {
    flexDirection: "row",
    gap: 10,
  },
  doubleItem: {
    flex: 1,
  },
  birthDate: {
    flex: 1.2,
  },
  genderColumn: {
    flex: 0.8,
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-evenly",
  },
  genderButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(13,27,42,0.18)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0d1b2a",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  genderButtonSelected: {
    borderColor: "#e5d8c7",
    backgroundColor: "rgba(255,255,255,0.88)",
  },
  typeColumn: {
    flex: 1,
    gap: 6,
  },
  typeLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 4,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: "rgba(13,27,42,0.22)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.88)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#0d1b2a",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  selectInputOpen: {
    borderColor: "#0f482f",
  },
  selectValue: {
    color: "#0d1b2a",
    fontWeight: "700",
    fontSize: 14,
  },
  selectPlaceholder: {
    color: "#4a5f55",
  },
  selectMenu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "rgba(13,27,42,0.16)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.96)",
    shadowColor: "#0d1b2a",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    overflow: "hidden",
  },
  selectOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(13,27,42,0.06)",
  },
  selectOptionText: {
    color: "#0d1b2a",
    fontWeight: "700",
  },
  selectOptionTextActive: {
    color: "#0f482f",
  },
  typeDetails: {
    marginTop: 10,
    gap: 10,
  },
  typeDetailsTitle: {
    color: "#0d1b2a",
    fontWeight: "800",
    fontSize: 14,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(240,244,255,0.9)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(13,27,42,0.12)",
  },
  linkButtonText: {
    flex: 1,
    marginLeft: 12,
    color: "#0d1b2a",
    fontWeight: "800",
    letterSpacing: 0.1,
  },
  optionLabel: {
    color: "#ffffff",
    fontWeight: "700",
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    gap: 14,
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
  backRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    color: "#f5e9ff",
    fontWeight: "700",
    letterSpacing: 0.1,
  },
});

export default RegisterScreen;
