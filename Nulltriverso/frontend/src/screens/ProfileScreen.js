import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ScreenBackground from "../components/ScreenBackground";
import InlineMenuBar from "../components/InlineMenuBar";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";

const mockProfile = {
  name: "Helbert Benício",
  cpf: "094.688.166-99",
  email: "hmbenicio@gmail.com",
  role: "Profissional",
  birthDate: "1989-09-25",
};

const mockProfileBack = {
  contactEmail: "hmbenicio@gmail.com",
  contactPhone: "+55 (31) 97502-8184",
  blurb:
    "Nulltriverso é um ecossistema que une tecnologia e nutrição para simplificar cálculos e análises.",
};

const ProfileScreen = ({ onMenu, onProfile, onInfo }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const otpCode = useMemo(() => {
    const code = Math.floor(Math.random() * 1000000);
    return `${code}`.padStart(6, "0");
  }, []);

  const dots = useMemo(
    () => Array.from({ length: 56 }, (_, index) => index),
    []
  );

  const formattedCpfNumber = useMemo(() => {
    const digits = mockProfile.cpf.replace(/\D/g, "");
    return digits.replace(/(\d{4})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4");
  }, []);

  const birthExpiry = useMemo(() => {
    const birth = new Date(mockProfile.birthDate);
    if (Number.isNaN(birth.getTime())) return "--/--";
    const day = `${birth.getDate()}`.padStart(2, "0");
    const month = `${birth.getMonth() + 1}`.padStart(2, "0");
    return `${day}/${month}`;
  }, []);

  const handleFlipCard = () => {
    const next = !flipped;
    setFlipped(next);
    Animated.spring(flipAnim, {
      toValue: next ? 1 : 0,
      useNativeDriver: true,
      speed: 10,
      bounciness: 7,
    }).start();
  };

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        "Campos faltando",
        "Preencha todos os campos para continuar."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Senhas diferentes",
        "A nova senha e a confirmacao precisam ser iguais."
      );
      return;
    }

    Alert.alert(
      "Senha atualizada",
      "Sua senha foi alterada com sucesso. Use a nova senha no proximo acesso."
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ScreenBackground contentStyle={styles.screen}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="shield-account"
              size={56}
              color="#f5efe4"
            />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.kicker}>SEU ESPACO</Text>
            <Text style={styles.title}>Perfil e seguranca</Text>
            <Text style={styles.subtitle}>
              Revise seus dados pessoais e mantenha sua senha em dia.
            </Text>
          </View>
        </View>

        <View style={styles.cardLabelRow}>
          <View style={styles.cardLabelGroup}>
            <MaterialCommunityIcons
              name="card-account-details"
              size={22}
              color={colors.surface}
            />
            <Text style={styles.cardLabel}>Dados pessoais</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons
              name="shield-check"
              size={16}
              color="#123425"
            />
            <Text style={styles.badgeText}>Verificado</Text>
          </View>
        </View>
        <Pressable onPress={handleFlipCard}>
          <View style={styles.cardContainer}>
            <Animated.View
              style={[
                styles.cardFace,
                { transform: [{ rotateY: frontRotate }] },
              ]}
            >
              <LinearGradient
                colors={["#191c1f", "#24292f", "#171a1d"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.creditCard}
              >
                <View style={styles.cardOverlay} />
                <View style={styles.cardDots}>
                  {dots.map((dot) => (
                    <View key={`dot-${dot}`} style={styles.cardDot} />
                  ))}
                </View>
                <Text style={styles.cardVertical}>{mockProfile.role}</Text>

                <View style={styles.cardTopRow}>
                  <View style={styles.brandGroup}>
                    <Text style={styles.cardBrand}>Nulltriverso</Text>
                    <Text style={styles.cardTagline}>Perfil seguro</Text>
                  </View>
                </View>

                <View style={styles.cardChipRow}>
                  <View style={styles.chip}>
                    <LinearGradient
                      colors={["#e9ecef", "#cfd3d8"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.chipFill}
                    />
                    <View style={styles.chipLines} />
                    <View style={styles.chipNotch} />
                  </View>
                  <MaterialCommunityIcons
                    name="wifi"
                    size={26}
                    color="#f2e9d8"
                  />
                </View>

                <View style={styles.cardNumberBlock}>
                  <Text style={styles.cardNumber}>{formattedCpfNumber}</Text>
                </View>

                <View style={styles.cardMetaRow}>
                  <View style={styles.validBlock}>
                    <View style={styles.validRow}>
                      <Text style={styles.validLabel}>BIRTHDAY</Text>
                    </View>
                    <Text style={styles.validValue}>{birthExpiry}</Text>
                  </View>
                  <View style={styles.nameBlock}>
                    <Text style={styles.validLabel}>USUARIO</Text>
                    <Text style={styles.cardHolder}>
                      {mockProfile.name.toUpperCase()}
                    </Text>
                  </View>
                  <Image
                    source={require("../../assets/logos/Logo_00_1.png")}
                    style={styles.bottomLogo}
                  />
                </View>
              </LinearGradient>
            </Animated.View>

            <Animated.View
              style={[
                styles.cardFace,
                styles.cardBack,
                { transform: [{ rotateY: backRotate }] },
              ]}
            >
              <View style={styles.backStrip}>
                <Text style={styles.backStripLabel}>Código de recuperação</Text>
                <View style={styles.signatureLine} />
                <View style={styles.cvvBox}>
                  <Text style={styles.cvvText}>{otpCode}</Text>
                </View>
              </View>
              <View style={styles.backContact}>
                <Text style={styles.backWebsite}>
                  {mockProfileBack.contactEmail}
                </Text>
                <Text style={styles.backPhone}>
                  {mockProfileBack.contactPhone}
                </Text>
              </View>
              <View style={styles.backMetaRow}>
                <View style={styles.backChip}>
                  <Image
                    source={require("../../assets/logos/Logo_00_1.png")}
                    style={styles.backChipLogo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.backBlurb}>
                  <Text style={styles.backBlurbText}>
                    {mockProfileBack.blurb}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </Pressable>

        <View style={styles.cardLabelRow}>
          <View style={styles.cardLabelGroup}>
            <MaterialCommunityIcons
              name="shield-lock"
              size={22}
              color={colors.surface}
            />
            <Text style={styles.cardLabel}>Seguranca</Text>
          </View>
          <View style={styles.tipPill}>
            <MaterialCommunityIcons
              name="lock-reset"
              size={16}
              color="#1d3a2d"
            />
            <Text style={styles.tipText}>Atualize sua senha</Text>
          </View>
        </View>
        <View style={styles.securityCard}>
          <Text style={styles.sectionTitle}>Alterar senha</Text>
          <Text style={styles.sectionSubtitle}>
            Use uma combinacao forte com letras maiusculas, minusculas e
            numeros.
          </Text>
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-alert-outline"
                size={20}
                color="#0d1b2a"
                style={styles.inputIcon}
              />
              <TextField
                placeholder="Senha atual"
                secureTextEntry={!currentPasswordVisible}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={[styles.input, styles.inputWithIcon]}
              />
              <Pressable
                onPress={() =>
                  setCurrentPasswordVisible((prevVisible) => !prevVisible)
                }
                hitSlop={10}
                style={styles.passwordToggle}
              >
                <MaterialCommunityIcons
                  name={currentPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#0d1b2a"
                />
              </Pressable>
            </View>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-plus-outline"
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
                onPress={() => setNewPasswordVisible((prevVisible) => !prevVisible)}
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
                onPress={() =>
                  setConfirmPasswordVisible((prevVisible) => !prevVisible)
                }
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
            <PrimaryButton
              label="Alterar senha"
              onPress={handleChangePassword}
              style={styles.cta}
              textStyle={styles.ctaText}
            />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <InlineMenuBar onProfile={onProfile} onMenu={onMenu} onInfo={onInfo} />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },
  keyboardAvoider: {
    flex: 1,
  },
  content: {
    gap: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  kicker: {
    color: "rgba(255,255,255,0.76)",
    letterSpacing: 1,
    fontWeight: "800",
    fontSize: 12,
  },
  title: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.2,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  cardLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardLabel: {
    color: colors.surface,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.78)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  badgeText: {
    color: "#123425",
    fontWeight: "800",
    fontSize: 12,
  },
  cardContainer: {
    width: "100%",
    aspectRatio: 1.6,
    alignSelf: "center",
    perspective: 1000,
    position: "relative",
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    shadowColor: "#0e241a",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  creditCard: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    overflow: "hidden",
    position: "relative",
  },
  cardBack: {
    flex: 1,
    backgroundColor: "#111418",
    padding: 18,
    gap: 14,
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardDots: {
    position: "absolute",
    top: 14,
    left: 12,
    width: 110,
    height: "100%",
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cardDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginRight: 3,
    marginBottom: 3,
  },
  cardVertical: {
    position: "absolute",
    right: -30,
    top: "50%",
    transform: [{ rotate: "-90deg" }, { translateY: -8 }],
    color: "rgba(255,255,255,0.86)",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
    textAlign: "center",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    marginBottom: 6,
  },
  brandGroup: {
    alignItems: "flex-end",
  },
  cardBrand: {
    color: "#f5efe4",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
  cardTagline: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  brandLogo: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  cardChipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginBottom: 6,
  },
  chip: {
    width: 52,
    height: 36,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#dfe2e5",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.18)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    position: "relative",
  },
  chipFill: {
    ...StyleSheet.absoluteFillObject,
  },
  chipLines: {
    position: "absolute",
    top: 7,
    left: 8,
    right: 8,
    height: 22,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(0,0,0,0.16)",
    borderRadius: 6,
  },
  chipNotch: {
    position: "absolute",
    top: 10,
    left: 18,
    width: 18,
    height: 12,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  wave: {
    height: 18,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  cardNumberBlock: {
    marginTop: 12,
    gap: 4,
    alignItems: "flex-start",
    paddingLeft: 6,
  },
  cardNumber: {
    color: "#f7f2e7",
    fontSize: 21,
    letterSpacing: 3.6,
    fontWeight: "900",
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  validBlock: {
    gap: 1,
    alignItems: "flex-start",
    minWidth: 72,
  },
  validRow: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  validLabel: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 10,
    letterSpacing: 1,
  },
  validValue: {
    color: "#f7f2e7",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 1,
  },
  nameBlock: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  cardHolder: {
    color: "#f7f2e7",
    fontWeight: "800",
    letterSpacing: 0.8,
    fontSize: 13,
  },
  bottomLogo: {
    width: 68,
    height: 68,
    resizeMode: "contain",
    tintColor: "#f5efe4",
    alignSelf: "flex-end",
    marginTop: 6,
  },
  securityCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#0e241a",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  sectionTitle: {
    color: colors.surface,
    fontWeight: "800",
    fontSize: 18,
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.86)",
    lineHeight: 20,
  },
  form: {
    gap: 12,
    marginTop: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "rgba(13,27,42,0.18)",
    color: "#0d1b2a",
    borderRadius: 14,
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
    left: 16,
    zIndex: 1,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    padding: 6,
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
  tipPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  tipText: {
    color: "#1d3a2d",
    fontWeight: "800",
    fontSize: 12,
  },
  backBadge: {
    display: "none",
  },
  backStrip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  backStripLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
  },
  signatureLine: {
    height: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  cvvBox: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#d65a5a",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  cvvText: {
    color: "#e6d4b6",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },
  backContact: {
    alignItems: "flex-end",
    gap: 2,
    paddingHorizontal: 6,
  },
  backWebsite: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
  },
  backPhone: {
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
    fontSize: 12,
  },
  backMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 0,
    paddingHorizontal: 0,
    marginTop: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  backChip: {
    width: 108,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0,
  },
  backBlurb: {
    flex: 1,
    gap: 0,
  },
  backBlurbText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    lineHeight: 14,
  },
  backChipLogo: {
    width: 108,
    height: 60,
    tintColor: "rgba(255,255,255,0.9)",
  },
});

export default ProfileScreen;
