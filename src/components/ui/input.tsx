import { forwardRef } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { XStack } from "./stacks";
import { Icon } from "iconsax-react-native";

type StyleVariants = UnistylesVariants<typeof styles>;

type InputProps = StyleVariants & TextInputProps & {};

const placeholderTextColor: Record<"outline" | "filled", string> = {
  outline: "#949896",
  filled: "#949896", //neutral.200
};
export const Input = forwardRef<TextInput, InputProps>(
  ({ variant = "outline", size = "md", style, ...textInputProps }, ref) => {
    styles.useVariants({
      variant,
      size,
    });
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor[variant]}
        {...textInputProps}
        style={[styles.input, style]}
      />
    );
  }
);
Input.displayName = "Input";
export const InputWithIcon = forwardRef<
  TextInput,
  InputProps & {
    icon: Icon;
  }
>(
  (
    { variant = "outline", icon: Icon, size = "md", style, ...textInputProps },
    ref
  ) => {
    styles.useVariants({
      variant,
      size,
    });
    return (
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon size={18} color="#292D32" />
        </View>
        <TextInput
          ref={ref}
          placeholderTextColor={placeholderTextColor[variant]}
          {...textInputProps}
          style={[styles.input, { flex: 1, paddingLeft: 50 }, style]}
        />
      </View>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";
const styles = StyleSheet.create((theme) => ({
  input: {
    color: theme.colors["shades.black"],
    fontFamily: "Urbanist_400Regular",
    textAlign: "left",
    borderRadius: 14,
    variants: {
      variant: {
        outline: {
          borderColor: theme.colors["neutral.100"],
          borderWidth: 1,
        },
        filled: {
          backgroundColor: theme.colors["background"],
        },
      },
      size: {
        sm: {
          height: 40,
          fontSize: 14,
          paddingHorizontal: 8,
        },
        md: {
          height: 48,
          fontSize: 16,
          paddingHorizontal: 12,
        },
        lg: {
          height: 58,
          fontSize: 18,
          paddingHorizontal: 16,
        },
      },
    },
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
