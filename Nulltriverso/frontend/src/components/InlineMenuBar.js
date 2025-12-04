import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const InlineMenuBar = ({ onProfile, onMenu, onInfo, style }) => (
  <View style={[styles.menuBar, style]}>
    <MenuButton label="Perfil" icon="account-circle" onPress={onProfile} />
    <View style={styles.barDivider} />
    <MenuButton label="Menu" icon="view-grid-outline" onPress={onMenu} />
    <View style={styles.barDivider} />
    <MenuButton label="Informações" icon="information-outline" onPress={onInfo} />
  </View>
);

const MenuButton = ({ icon, onPress }) => (
  <Pressable style={styles.barButton} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={32} color={colors.surface} />
  </Pressable>
);

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
    gap: 0,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    shadowColor: "#0b1320",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    marginTop: -16,
    marginBottom: -16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  barDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  barButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
    flex: 1,
  },
});

export default InlineMenuBar;
