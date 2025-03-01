import * as React from "react";
import { Text as RNText, TextProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type StyleVariants = UnistylesVariants<typeof styles>;
export const FormMessage = React.forwardRef<
  React.ElementRef<typeof RNText>,
  TextProps & StyleVariants
>(({ style, error = false, ...props }, ref) => {
  styles.useVariants({
    error,
  });
  return <RNText ref={ref} style={[styles.formMessage, style]} {...props} />;
});

const styles = StyleSheet.create((theme) => ({
  formMessage: {
    fontSize: 14,
    fontFamily: theme.fontWeights.medium,
    variants: {
      error: {
        true: {
          color: theme.colors["error.400"],
        },
      },
    },
  },
}));
