import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { Text as RNText } from "react-native";
import * as React from "react";
type ComponentProps = UnistylesVariants<typeof styles>;
interface TextProps
  extends ComponentProps,
    React.ComponentProps<typeof RNText> {}
export const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  TextProps
>(
  (
    { color = "neutral.500", fow = "regular", fos = "p", ta, style, ...props },
    ref
  ) => {
    styles.useVariants({
      color,
      fow,
      fos,
      ta,
      // you can also use strings
      // color: "true" | "false"
    });

    return <RNText ref={ref} style={[styles.text, style]} {...props} />;
  }
);

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      color: (
        Object.keys(theme.colors) as (keyof typeof theme.colors)[]
      ).reduce(
        (acc, key) => {
          acc[key] = { color: theme.colors[key] };
          return acc;
        },
        {} as Record<
          keyof typeof theme.colors,
          {
            color: string;
          }
        >
      ),
      ta: {
        left: {
          textAlign: "left",
        },
        right: {
          textAlign: "right",
        },
        center: {
          textAlign: "center",
        },
      },
      fow: {
        regular: {
          fontFamily: theme.fontWeights.regular,
        },
        medium: {
          fontFamily: theme.fontWeights.medium,
        },
        semibold: {
          fontFamily: theme.fontWeights.semibold,
        },
        bold: {
          fontFamily: theme.fontWeights.bold,
        },
      },
      fos: {
        h1: {
          fontSize: theme.fontSizes.h1,
          lineHeight: theme.lh(theme.fontSizes.h1),
        },
        h2: {
          fontSize: theme.fontSizes.h2,
          lineHeight: theme.lh(theme.fontSizes.h2),
        },
        h3: {
          fontSize: theme.fontSizes.h3,
          lineHeight: theme.lh(theme.fontSizes.h3),
        },
        h4: {
          fontSize: theme.fontSizes.h4,
          lineHeight: theme.lh(theme.fontSizes.h4),
        },
        h5: {
          fontSize: theme.fontSizes.h5,
          lineHeight: theme.lh(theme.fontSizes.h5),
        },
        h6: {
          fontSize: theme.fontSizes.h6,
          lineHeight: theme.lh(theme.fontSizes.h6),
        },
        p: {
          fontSize: theme.fontSizes.p,
          lineHeight: theme.lh(theme.fontSizes.p),
        },
      },
    },
  },
}));
Text.displayName = "Text";
