import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

const BottomBar = ({ onProfile, onMenu, onExit }) => (
  <SafeAreaView style={styles.safe}>
    <LinearGradient
      colors={["rgba(210,205,200,0.9)", "rgba(210,205,200,0.82)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <BarButton
        icon={<Ionicons name="person-circle-outline" size={34} color={colors.ink} />}
        label="Perfil"
        onPress={onProfile}
      />
      <View style={styles.divider} />
      <BarButton
        icon={<Ionicons name="grid-outline" size={32} color={colors.ink} />}
        label="Menu"
        onPress={onMenu}
      />
      <View style={styles.divider} />
      <BarButton
        icon={<MaterialCommunityIcons name="logout" size={32} color={colors.ink} />}
        label="Sair"
        onPress={onExit}
      />
    </LinearGradient>
  </SafeAreaView>
);

const BarButton = ({ icon, label, onPress }) => (
  <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onPress}>
    {icon}
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  safe: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: colors.ink,
    shadowOpacity: 0.34,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 18 },
    elevation: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    shadowColor: colors.ink,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  buttonPressed: {
  },
  label: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: "#e8dfd4",
    opacity: 0.8,
  },
});

export default BottomBar;
