import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../theme/colors";

const TextField = React.forwardRef(
  ({ style, placeholderTextColor = colors.inkSoft, ...props }, ref) => (
    <TextInput
      ref={ref}
      placeholderTextColor={placeholderTextColor}
      selectionColor={colors.accent}
      cursorColor={colors.accent}
      style={[styles.input, style]}
      {...props}
    />
  )
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: "#e5d8c7",
    borderWidth: 1,
    color: colors.ink,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
});

export default TextField;
