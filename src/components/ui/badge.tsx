import { forwardRef } from "react";
import { Text, View, ViewProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type StyleVariants = UnistylesVariants<typeof styles>;

type BadgeProps = StyleVariants &
  ViewProps & {
    title: string;
  };

export const Badge = forwardRef<View, BadgeProps>(
  ({ title, variant = "success", style, ...viewProps }, ref) => {
    styles.useVariants({
      variant,
    });
    return (
      <View ref={ref} {...viewProps} style={[styles.badge, style]}>
        <Text style={styles.badgeText}>{title}</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  badge: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 9999,
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(0.5),
    variants: {
      variant: {
        success: {
          backgroundColor: theme.colors["success.400"],
        },
        warning: {
          backgroundColor: theme.colors["warning.400"],
        },
        error: {
          backgroundColor: theme.colors["error.400"],
        },
      },
    },
  },
  badgeText: {
    color: theme.colors["shades.black"],
    fontSize: 14,
    fontFamily: "Urbanist_500Medium",
    textAlign: "center",
    variants: {
      variant: {
        success: {
          color: theme.colors["shades.white"],
        },
        warning: {
          color: theme.colors["shades.black"],
        },
        error: {
          color: theme.colors["shades.white"],
        },
      },
    },
  },
}));
