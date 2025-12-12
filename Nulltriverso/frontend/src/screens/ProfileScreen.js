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
  name: "Helbert Miranda Benício",
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

const mockIdentityCard = {
  council: "NULLTRIVERSO",
  regional: "ECOSSISTEMA DE CALCULOS NUTRICIONAIS",
  title: "IDENTIDADE DO USUARIO",
  crm: "009999/PA",
  filiacao: "USUARIO",
  inscricao: "14/09/1966",
  via: "1",
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
    () => Array.from({ length: 220 }, (_, index) => index),
    []
  );

  const filiacaoText = useMemo(() => mockProfile.role.toUpperCase(), []);

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
                  colors={["#dbe9f5", "#cbdce9", "#dfeaf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.identityCard}
                >
                  <View style={styles.cardOverlay} />
                  <View style={styles.cardDots}>
                    {dots.map((dot) => (
                      <View key={`dot-${dot}`} style={styles.cardDot} />
                    ))}
                  </View>
                  <View style={styles.identityHeader}>
                    <View style={styles.crestBlock}>
                      <LinearGradient
                        colors={["transparent", "transparent"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.crestCircle}
                      >
                        <Image
                          source={require("../../assets/logos/Logo_00_1.png")}
                          style={styles.crestLogo}
                          resizeMode="contain"
                        />
                      </LinearGradient>
                      <View style={styles.crestRibbon}>
                        <View
                          style={[styles.ribbonStripe, styles.ribbonGreen]}
                        />
                        <View
                          style={[styles.ribbonStripe, styles.ribbonYellow]}
                        />
                        <View
                          style={[styles.ribbonStripe, styles.ribbonBlue]}
                        />
                      </View>
                    </View>
                    <View style={styles.identityHeaderText}>
                      <Text style={styles.councilTitle}>
                        {mockIdentityCard.council}
                      </Text>
                      <Text style={styles.councilSubtitle}>
                        {mockIdentityCard.regional}
                      </Text>
                      <Text style={styles.cardHeading}>
                        {mockIdentityCard.title}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.identityBody}>
                    <View style={styles.identityLeft}>
                      <View style={styles.identityLeftTop}>
                        <View style={styles.identityArrow} />
                        <View style={styles.identityChip}>
                          <LinearGradient
                            colors={["#f2de9f", "#e2c46d"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.identityChipFill}
                          />
                          <View style={styles.identityChipLines} />
                          <View style={styles.identityChipCore} />
                        </View>
                      </View>
                      <View style={styles.identityDocsRow}>
                        <View
                          style={[styles.identityMini, styles.identityDocLeft]}
                        >
                          <Text style={styles.identityLabel}>CPF</Text>
                          <Text style={styles.identityValueSmall}>
                            {mockProfile.cpf}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.identityMini,
                            styles.identityDocMiddle,
                          ]}
                        >
                          <Text style={styles.identityLabel}>INSCRIÇÃO</Text>
                          <Text style={styles.identityValue}>
                            {mockIdentityCard.inscricao}
                          </Text>
                        </View>
                        <View
                          style={[styles.identityMini, styles.identityDocRight]}
                        >
                          <Text style={styles.identityLabel}>USUÁRIO</Text>
                          <Text style={styles.identityValue}>
                            {filiacaoText}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.identityInfo}>
                      <View style={styles.identityRow}>
                        <Text style={styles.identityLabel}>NOME</Text>
                        <Text style={styles.identityValueMain}>
                          {mockProfile.name.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.silhouette}>
                      <MaterialCommunityIcons
                        name="account"
                        size={96}
                        color="#0f1724"
                      />
                    </View>
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
                  <Text style={styles.backStripLabel}>
                    Código de recuperação
                  </Text>
                  <View style={styles.signatureStrip} />
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
                    name={
                      currentPasswordVisible ? "eye-off-outline" : "eye-outline"
                    }
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
                  onPress={() =>
                    setNewPasswordVisible((prevVisible) => !prevVisible)
                  }
                  hitSlop={10}
                  style={styles.passwordToggle}
                >
                  <MaterialCommunityIcons
                    name={
                      newPasswordVisible ? "eye-off-outline" : "eye-outline"
                    }
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
                    name={
                      confirmPasswordVisible ? "eye-off-outline" : "eye-outline"
                    }
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
    shadowColor: "#0d2f57",
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  identityCard: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 10,
    overflow: "hidden",
    position: "relative",
  },
  cardBack: {
    flex: 1,
    backgroundColor: "#dbe9f5",
    padding: 18,
    gap: 14,
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(10,55,96,0.15)",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.32)",
    borderWidth: 1,
    borderColor: "rgba(9,36,74,0.08)",
  },
  cardDots: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 2,
  },
  cardDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(9,36,74,0.08)",
    margin: 3,
  },
  identityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 10,
  },
  crestBlock: {
    alignItems: "center",
    gap: 6,
  },
  crestCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: "transparent",
    marginTop: -8,
  },
  crestLogo: {
    width: 78,
    height: 78,
    tintColor: "#0b0b0b",
  },
  crestText: {
    color: "#e9fbff",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 10,
    marginTop: 2,
  },
  crestRibbon: {
    flexDirection: "row",
    gap: 3,
    marginTop: -12,
  },
  ribbonStripe: {
    width: 14,
    height: 6,
    borderRadius: 2,
  },
  ribbonGreen: { backgroundColor: "#1f7f63" },
  ribbonYellow: { backgroundColor: "#e4be3b" },
  ribbonBlue: { backgroundColor: "#2d6db5" },
  identityHeaderText: {
    flex: 1,
    gap: 2,
    alignItems: "center",
  },
  councilTitle: {
    color: "#2b4263",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  councilSubtitle: {
    color: "#2b4263",
    fontWeight: "800",
    fontSize: 9,
    letterSpacing: 0.4,
    textAlign: "center",
  },
  cardHeading: {
    color: "#0f365d",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 0.6,
  },
  identityBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
  identityLeft: {
    width: 110,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 14,
    paddingTop: 0,
    paddingLeft: 0,
  },
  identityLeftTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingLeft: -4,
  },
  identityDocsRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "nowrap",
  },
  identityChip: {
    width: 60,
    height: 42,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e9d59a",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    shadowColor: "#0a1c30",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    position: "relative",
    transform: [{ translateY: 16 }],
  },
  identityChipFill: {
    ...StyleSheet.absoluteFillObject,
  },
  identityChipLines: {
    position: "absolute",
    top: 6,
    left: 10,
    right: 10,
    height: 28,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(0,0,0,0.18)",
    borderRadius: 8,
  },
  identityChipCore: {
    position: "absolute",
    top: 11,
    left: 17,
    width: 24,
    height: 18,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  identityArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 16,
    borderBottomWidth: 16,
    borderRightWidth: 18,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#c1323b",
    marginTop: 30,
  },
  identityIdBlock: {
    display: "none",
  },
  identityValueSmall: {
    color: "#0b1c30",
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 16,
  },
  identityInfo: {
    flex: 1,
    gap: 10,
    paddingLeft: 0,
    paddingRight: 80,
    marginLeft: -8,
    paddingTop: 10,
  },
  identityRow: {
    gap: 4,
  },
  identityLabel: {
    color: "#11487d",
    fontWeight: "800",
    fontSize: 10.5,
    letterSpacing: 0.4,
  },
  identityValueMain: {
    color: "#0b1c30",
    fontWeight: "900",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  identityValue: {
    color: "#0b1c30",
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 16,
  },
  identityMini: {
    minWidth: 120,
    maxWidth: 200,
    gap: 2,
    alignItems: "flex-start",
    flex: 1,
  },
  identityDocLeft: {
    paddingTop: 8,
  },
  identityDocMiddle: {
    marginLeft: -6,
    paddingTop: 8,
  },
  identityDocRight: {
    alignItems: "flex-start",
    paddingTop: 8,
    marginLeft: -22,
  },
  silhouette: {
    position: "absolute",
    right: -16,
    top: -10,
    opacity: 0.92,
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
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(17,72,125,0.18)",
    shadowColor: "#0e355f",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    minHeight: 86,
  },
  backStripLabel: {
    color: "#0f365d",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 8,
  },
  signatureStrip: {
    height: 32,
    backgroundColor: "rgba(232,242,252,0.9)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(17,72,125,0.18)",
  },
  cvvBox: {
    position: "absolute",
    right: 12,
    top: 26,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#bb2c35",
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  cvvText: {
    color: "#9b1b25",
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
    color: "#0b1c30",
    fontWeight: "800",
    fontSize: 13,
  },
  backPhone: {
    color: "#1f2e45",
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
    color: "#1f2e45",
    fontSize: 12,
    lineHeight: 14,
  },
  backChipLogo: {
    width: 108,
    height: 60,
    tintColor: "#1f2e45",
  },
});

export default ProfileScreen;
