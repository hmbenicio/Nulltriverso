import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { colors } from "../theme/colors";
import BottomBar from "../components/BottomBar";

const MENU_COLUMNS = 3;
const H_PADDING = 24;
const GAP = 14;

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
}) => {
  const cardSize = useMemo(() => {
    const { width } = Dimensions.get("window");
    const availableWidth = width - H_PADDING * 2 - GAP * (MENU_COLUMNS - 1);
    return availableWidth / MENU_COLUMNS;
  }, []);

  const menuItems = useMemo(
    () => [
      {
        key: "imc",
        title: "IMC",
        accent: colors.primary,
        image: require("../../assets/01_Icone_IMC.png"),
        onPress: onOpenImc,
      },
      {
        key: "rcest",
        title: "RCEst",
        accent: "#d96f63",
        image: require("../../assets/08_Icone_RCE.png"),
      },
      {
        key: "peso",
        title: "Peso acamado",
        accent: "#f7c18f",
        image: require("../../assets/11_Icone_PESO.png"),
        onPress: onOpenPeso,
      },
      {
        key: "rcq",
        title: "RCQ",
        accent: "#355478",
        image: require("../../assets/07_Icone_RCQ.png"),
      },
      {
        key: "tmb",
        title: "TMB",
        accent: "#256fca",
        image: require("../../assets/03_Icone_TMB.png"),
        onPress: onOpenTmb,
      },
      {
        key: "eer",
        title: "EER",
        accent: colors.warn,
        image: require("../../assets/02_Icone_EER.png"),
        onPress: onOpenEer,
      },
      {
        key: "get",
        title: "GET",
        accent: "#f29a64",
        image: require("../../assets/04_Icone_GET.png"),
        onPress: onOpenGet,
      },
      {
        key: "naf",
        title: "NAF",
        accent: "#62b66e",
        image: require("../../assets/10_Icone_NAF.png"),
      },
      {
        key: "gordura",
        title: "% Gordura",
        accent: "#e3b952",
        image: require("../../assets/05_Icone_GC.png"),
        onPress: onOpenGc,
      },
      {
        key: "musculo",
        title: "Massa musc.",
        accent: "#e94856",
        image: require("../../assets/06_Icone_MI.png"),
        onPress: onOpenMi,
      },
      {
        key: "bio",
        title: "Bioimp.",
        accent: "#bb4be7",
        image: require("../../assets/09_Icone_TMB.png"),
      },
      {
        key: "hidrica",
        title: "Hidrica",
        accent: "#66b2eb",
        image: require("../../assets/12_Icone_HIDRO.png"),
      },
    ],
    []
  );

  const renderItem = ({ item, index }) => (
    <MenuCard item={item} cardSize={cardSize} index={index} />
  );

  return (
    <LinearGradient colors={[colors.backgroundLight, colors.background]} style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.kicker}>Seu universo de saude</Text>
        <Text style={styles.title}>Menu de projetos</Text>
        <Text style={styles.subtitle}>
          Explore ferramentas pensadas para nutricao, habitos e bem-estar.
        </Text>
      </View>
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
      <BottomBar onMenu={() => {}} onProfile={onProfile} onExit={onExit} />
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
    <Animated.View style={[styles.cardWrapper, { width: cardSize }, animatedStyle]}>
      <Pressable
        style={({ pressed }) => [
          item.image ? styles.cardImage : styles.card,
          {
            width: cardSize,
            height: cardSize,
            borderColor: `${item.accent}33`,
            backgroundColor: `${item.accent}12`,
            shadowColor: item.accent,
          },
          pressed && styles.cardPressed,
        ]}
        onPress={item.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          style={[
            styles.iconArea,
            {
              width: cardSize,
              height: cardSize,
            },
          ]}
        >
          {item.image ? (
            <>
              <Image
                source={item.image}
                style={[styles.fullImage, { width: cardSize, height: cardSize }]}
              />
              <View
                style={[
                  styles.overlay,
                  {
                    backgroundColor: `${item.accent}24`,
                  },
                ]}
              />
            </>
          ) : (
            <View
              style={[
                styles.iconBadge,
                {
                  width: cardSize * 0.74,
                  height: cardSize * 0.74,
                  borderRadius: (cardSize * 0.74) / 2,
                  backgroundColor: `${item.accent}0f`,
                  borderColor: `${item.accent}22`,
                },
              ]}
            >
              {item.icon({ color: item.accent, size: cardSize * 0.56 })}
            </View>
          )}
        </View>
      </Pressable>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: H_PADDING,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    gap: 6,
    marginBottom: 18,
  },
  kicker: {
    color: colors.ink,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    color: colors.inkMuted,
    lineHeight: 20,
  },
  grid: {
    paddingBottom: 120,
    gap: GAP,
  },
  cardWrapper: {
    alignItems: "center",
    gap: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.ink,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  cardImage: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 0,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.ink,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: colors.surfaceMuted,
  },
  iconArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  iconBadge: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
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
    borderRadius: 18,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  cardSubtitle: {
    color: colors.inkMuted,
    fontSize: 12,
  },
});

export default MenuScreen;
