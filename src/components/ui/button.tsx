import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        style={[styles.button, touchableProps.style]}
      >
        <Text style={styles.buttonText}>{title}</Text>
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
