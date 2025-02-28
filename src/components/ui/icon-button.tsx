import { IconVariant } from "@/lib/types";
import { Icon } from "iconsax-react-native";
import React from "react";
import { Text, Pressable, PressableProps, View } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type StyleVariants = UnistylesVariants<typeof styles>;
interface IconButtonProps extends PressableProps, StyleVariants {
  icon: Icon;
  label: string;
  badge?: number;
  iconVariant?: IconVariant;
}
export function IconButton(props: IconButtonProps) {
  const {
    icon: Icon,
    iconVariant,
    onPress,
    variant = "grey",
    size = "md",
    label,
    badge,
    ...rest
  } = props;
  styles.useVariants({
    size,
    variant,
  });

  return (
    <Pressable
      aria-label={label}
      style={styles.container}
      onPress={onPress}
      {...rest}
    >
      {badge && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <Icon size={24} color="#171D1A" variant={iconVariant ?? "Bold"} />
    </Pressable>
  );
}

IconButton.displayName = "IconButton";

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 9999,
    variants: {
      size: {
        sm: {
          width: 32,
          height: 32,
        },
        md: {
          width: 44,
          height: 44,
        },
        lg: {
          width: 48,
          height: 48,
        },
      },
      variant: {
        grey: {
          backgroundColor: theme.colors.background,
        },
        ghost: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  badgeContainer: {
    backgroundColor: theme.colors["error.400"],
    borderRadius: 10,
    position: "absolute",
    right: -5,
    top: -5,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: theme.colors["shades.white"],
    fontFamily: theme.fontWeights.medium,
    fontSize: 12,
  },
}));
