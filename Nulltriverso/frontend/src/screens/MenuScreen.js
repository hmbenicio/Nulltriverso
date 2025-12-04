import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { menuGradient } from "../theme/gradients";
import StarField from "../components/StarField";

const MENU_COLUMNS = 3;
const H_PADDING = 24;
const GAP = 10;
const PANEL_PADDING = 12;

const MenuScreen = ({
  onOpenImc,
  onOpenEer,
  onOpenTmb,
  onOpenGet,
  onOpenGc,
  onOpenMi,
  onOpenPeso,
  onProfile,
  onExit,
  onMenu,
  onOpenWhtr,
  onOpenRcq,
  onOpenRcest,
  onOpenNaf,
  onOpenHidrica,
  onOpenMacro,
}) => {
  const cardSize = useMemo(() => {
    const { width } = Dimensions.get("window");
    const availableWidth =
      width - H_PADDING * 2 - GAP * (MENU_COLUMNS - 1) - PANEL_PADDING * 2;
    return availableWidth / MENU_COLUMNS;
  }, []);

  const menuItems = useMemo(
    () => [
      {
        key: "imc",
        title: "IMC",
        accent: colors.primary,
        image: require("../../assets/logos_menu/01_Icone_IMC.png"),
        onPress: onOpenImc,
      },
      {
        key: "rcest",
        title: "RCEst",
        accent: "#d96f63",
        image: require("../../assets/logos_menu/02_Icone_RCE.png"),
        onPress: onOpenRcest,
      },
      {
        key: "rcq",
        title: "RCQ",
        accent: "#355478",
        image: require("../../assets/logos_menu/03_Icone_RCQ.png"),
        onPress: onOpenRcq,
      },
      {
        key: "peso",
        title: "Peso acamado",
        accent: "#f7c18f",
        image: require("../../assets/logos_menu/04_Icone_PESO.png"),
        onPress: onOpenPeso,
      },
      {
        key: "tmb",
        title: "TMB",
        accent: "#256fca",
        image: require("../../assets/logos_menu/05_Icone_TMB.png"),
        onPress: onOpenTmb,
      },
      {
        key: "eer",
        title: "EER",
        accent: colors.warn,
        image: require("../../assets/logos_menu/06_Icone_EER.png"),
        onPress: onOpenEer,
      },
      {
        key: "get",
        title: "GET",
        accent: "#f29a64",
        image: require("../../assets/logos_menu/07_Icone_GET.png"),
        onPress: onOpenGet,
      },
      {
        key: "naf",
        title: "NAF",
        accent: "#62b66e",
        image: require("../../assets/logos_menu/08_Icone_NAF.png"),
        onPress: onOpenNaf,
      },
      {
        key: "gordura",
        title: "% Gordura",
        accent: "#e3b952",
        image: require("../../assets/logos_menu/09_Icone_GC.png"),
        onPress: onOpenGc,
      },
      {
        key: "musculo",
        title: "Massa musc.",
        accent: "#e94856",
        image: require("../../assets/logos_menu/10_Icone_MI.png"),
        onPress: onOpenMi,
      },
      {
        key: "macro",
        title: "Macro",
        accent: "#bb4be7",
        image: require("../../assets/logos_menu/11_Icone_MACRO.png"),
        onPress: onOpenMacro,
      },
      {
        key: "hidrica",
        title: "Hidrica",
        accent: "#66b2eb",
        image: require("../../assets/logos_menu/12_Icone_HIDRO.png"),
        onPress: onOpenHidrica,
      },
    ],
    []
  );

  const renderItem = ({ item, index }) => (
    <MenuCard item={item} cardSize={cardSize} index={index} />
  );

  return (
    <LinearGradient
      colors={menuGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <StarField />
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/logos_ws/Logo_02_WS_1.png")}
            style={[styles.headerLogo, styles.headerLogoGlow]}
            blurRadius={22}
          />
          <Image
            source={require("../../assets/logos_ws/Logo_02_WS_1.png")}
            style={styles.headerLogo}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PAINEL PRINCIPAL</Text>

          <Text style={styles.sectionSubtitle}>
            Cartoes uniformes, prontos para abrir as calculadoras mais usadas.
          </Text>
        </View>
        <View style={styles.panel}>
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            numColumns={MENU_COLUMNS}
            columnWrapperStyle={{ gap: GAP }}
            contentContainerStyle={styles.grid}
            ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.menuBar}>
        <MenuButton label="Perfil" icon="account-circle" onPress={onProfile} />
        <View style={styles.barDivider} />
        <MenuButton label="Menu" icon="view-grid-outline" onPress={onMenu} />
        <View style={styles.barDivider} />
        <MenuButton label="Sair" icon="logout" onPress={onExit} />
      </View>
    </LinearGradient>
  );
};

const MenuCard = ({ item, cardSize, index }) => {
  const entryAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entryAnim, {
      toValue: 1,
      duration: 420,
      delay: index * 65,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entryAnim, index]);

  const handlePressIn = () =>
    Animated.spring(pressAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 18,
      bounciness: 4,
    }).start();

  const handlePressOut = () =>
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();

  const animatedStyle = {
    opacity: entryAnim,
    transform: [
      {
        translateY: entryAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },
      {
        scale: Animated.multiply(
          entryAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
          }),
          pressAnim
        ),
      },
    ],
  };

  return (
    <Animated.View
      style={[styles.cardWrapper, { width: cardSize }, animatedStyle]}
    >
      <Pressable
        style={({ pressed }) => [
          {
            width: cardSize,
            height: cardSize,
            borderColor: `${item.accent}26`,
            backgroundColor: `${item.accent}0d`,
            shadowColor: item.accent,
          },
          styles.cardShell,
          pressed && styles.cardShellPressed,
        ]}
        onPress={item.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          style={[
            styles.cardBody,
            { width: cardSize - 12, height: cardSize - 12 },
          ]}
        >
          <View
            style={[styles.cornerTag, { backgroundColor: `${item.accent}3a` }]}
          >
            <Text style={styles.cornerTagText}>Calc</Text>
          </View>
          <LinearGradient
            colors={[`${item.accent}22`, `${item.accent}08`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          />
          <View
            style={[styles.accentHalo, { backgroundColor: `${item.accent}1c` }]}
          />
          <View
            style={[styles.accentBar, { backgroundColor: `${item.accent}88` }]}
          />
          <Image
            source={item.image}
            style={[
              styles.fullImage,
              { width: cardSize - 20, height: cardSize - 20 },
            ]}
          />
          <View
            style={[styles.overlay, { backgroundColor: `${item.accent}19` }]}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const MenuButton = ({ label, icon, onPress }) => (
  <Pressable style={styles.barButton} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={32} color={colors.surface} />
  </Pressable>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: H_PADDING,
    paddingTop: 48,
    paddingBottom: 120,
    position: "relative",
  },
  header: {
    marginBottom: 5,
    alignItems: "center",
  },
  logoWrapper: {
    width: "100%",
    height: 120,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: "100%",
    height: 120,
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
  grid: {
    paddingBottom: 24,
    gap: GAP,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  panel: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: PANEL_PADDING,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "#091a12",
    shadowOpacity: 0.26,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
  },
  sectionHeader: {
    gap: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  sectionKicker: {
    color: "#f0e6d8",
    textTransform: "uppercase",
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",
  },
  sectionTitle: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.86)",
    textAlign: "center",
  },
  cardWrapper: {
    alignItems: "center",
    gap: 8,
  },
  cardShell: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    overflow: "hidden",
  },
  cardShellPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: colors.surfaceMuted,
  },
  cardBody: {
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    position: "relative",
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  accentHalo: {
    position: "absolute",
    width: "80%",
    height: "80%",
    borderRadius: 20,
    transform: [{ scale: 1.1 }],
  },
  accentBar: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    height: 6,
    borderRadius: 8,
    opacity: 0.5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullImage: {
    resizeMode: "cover",
    borderRadius: 16,
    alignSelf: "center",
  },
  cornerTag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  cornerTagText: {
    color: colors.surface,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  menuBar: {
    position: "absolute",
    left: H_PADDING,
    right: H_PADDING,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    gap: 0,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    shadowColor: "#0b1320",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  barDivider: {
    width: 1,
    height: 26,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  barButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
    flex: 1,
  },
});

export default MenuScreen;
