import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

type ButtonProps = {
  title?: string;

  loading?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        ref={ref}
        {...touchableProps}
        style={[styles.button, touchableProps.style]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
export const GradientButton = forwardRef<View, ButtonProps>(
  ({ title, loading, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        ref={ref}
        {...touchableProps}
        style={[gradientStyles.button, touchableProps.style]}
      >
        <LinearGradient
          style={gradientStyles.bg}
          {...{
            colors: ["#BF7AFF", "#538FF8", "#538FF8"],
            start: { x: -0.15, y: -0.13 },
            end: { x: 1.16, y: 0.64 },
          }}
        />
        {loading && <ActivityIndicator color="#fff" />}
        <Text style={gradientStyles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 24,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: theme.colors["shades.black"],
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
}));
const gradientStyles = StyleSheet.create((theme) => ({
  button: {
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: theme.space(4),
    height: theme.space(12),
    gap: theme.space(2),
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: theme.space(4),
  },
  buttonText: {
    color: theme.colors["shades.white"],
    fontSize: 16,
    fontFamily: theme.fontWeights.medium,
    textAlign: "center",
  },
}));
