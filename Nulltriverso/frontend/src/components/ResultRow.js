import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const ResultRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: {
    color: colors.inkMuted,
  },
  value: {
    color: colors.ink,
    fontWeight: "700",
  },
});

export default ResultRow;
