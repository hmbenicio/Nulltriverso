import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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
import {
  mockIdentityCard,
  mockProfile,
  mockProfileBack,
} from "./profile/profileMocks";
import styles from "./profile/profileStyles";

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
                color="#1c3c5a"
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
                  colors={["#4f7f99", "#75a7bd", "#4f7f99"]}
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
                        color="#1f304a"
                      />
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>

              <Animated.View
                style={[
                  styles.cardFace,
                  { transform: [{ rotateY: backRotate }] },
                ]}
              >
                <LinearGradient
                  colors={["#4f7f99", "#75a7bd", "#4f7f99"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardBack}
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
                </LinearGradient>
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
                color="#1c3c5a"
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

export default ProfileScreen;
