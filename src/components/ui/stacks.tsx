import * as React from "react";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { View as RNView } from "react-native";
type ComponentProps = UnistylesVariants<typeof styles>;

export interface StackProps
  extends ComponentProps,
    React.ComponentProps<typeof RNView> {}

export const XStack = React.forwardRef<
  React.ElementRef<typeof RNView>,
  StackProps
>(
  (
    {
      pos,
      boc,
      bow,
      br,
      f,
      fd = "row",
      jc,
      ai,
      bg,
      gap,
      p,
      px,
      py,
      style,
      ...prop
    },
    ref
  ) => {
    styles.useVariants({
      pos,
      boc,
      bow,
      br,
      f,
      fd,
      jc,
      ai,
      bg,
      gap,
      p,
      px,
      py,
    });
    return <RNView ref={ref} style={[styles.stack, style]} {...prop} />;
  }
);

export const YStack = React.forwardRef<
  React.ElementRef<typeof RNView>,
  StackProps
>(
  (
    {
      pos,
      boc,
      bow,
      br,
      f,
      fd = "column",
      jc,
      ai,
      bg,
      gap,
      p,
      px,
      py,
      style,
      ...prop
    },
    ref
  ) => {
    styles.useVariants({
      pos,
      boc,
      bow,
      br,
      f,
      fd,
      jc,
      ai,
      bg,
      gap,
      p,
      px,
      py,
    });
    return <RNView ref={ref} style={[styles.stack, style]} {...prop} />;
  }
);

const spaceValues = {
  "0": 0,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "4.5": 18,
  "5": 20,
  "5.5": 22,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
};
const styles = StyleSheet.create((theme) => ({
  stack: {
    variants: {
      pos: {
        absolute: {
          position: "absolute",
        },
        relative: {
          position: "relative",
        },
      },
      bow: {
        "1": {
          borderWidth: 1,
        },
        "2": {
          borderWidth: 2,
        },
        "3": {
          borderWidth: 3,
        },
        "4": {
          borderWidth: 4,
        },
      },
      boc: (Object.keys(theme.colors) as (keyof typeof theme.colors)[]).reduce(
        (acc, key) => {
          acc[key] = { borderColor: theme.colors[key] };
          return acc;
        },
        {} as Record<keyof typeof theme.colors, { borderColor: string }>
      ),
      br: {
        "1": {
          borderRadius: 4,
        },
        "2": {
          borderRadius: 8,
        },
        "3": {
          borderRadius: 12,
        },
        "4": {
          borderRadius: 16,
        },
        "5": {
          borderRadius: 20,
        },
        "6": {
          borderRadius: 24,
        },
      },
      f: {
        "1": {
          flexGrow: 1,
        },
        "2": {
          flexGrow: 2,
        },
        "3": {
          flexGrow: 3,
        },
        "4": {
          flexGrow: 4,
        },
      },
      fd: {
        row: {
          flexDirection: "row",
        },
        column: {
          flexDirection: "column",
        },
      },
      jc: {
        start: {
          justifyContent: "flex-start",
        },
        end: {
          justifyContent: "flex-end",
        },
        center: {
          justifyContent: "center",
        },
        between: {
          justifyContent: "space-between",
        },
        around: {
          justifyContent: "space-around",
        },
        evenly: {
          justifyContent: "space-evenly",
        },
      },
      ai: {
        start: {
          alignItems: "flex-start",
        },
        end: {
          alignItems: "flex-end",
        },
        center: {
          alignItems: "center",
        },
        stretch: {
          alignItems: "stretch",
        },
        baseline: {
          alignItems: "baseline",
        },
      },
      bg: (Object.keys(theme.colors) as (keyof typeof theme.colors)[]).reduce(
        (acc, key) => {
          acc[key] = { backgroundColor: theme.colors[key] };
          return acc;
        },
        {} as Record<
          keyof typeof theme.colors,
          {
            backgroundColor: string;
          }
        >
      ),
      gap: (Object.keys(spaceValues) as (keyof typeof spaceValues)[]).reduce(
        (acc, key) => {
          acc[key] = { gap: spaceValues[key] };
          return acc;
        },
        {} as Record<
          keyof typeof spaceValues,
          {
            gap: number;
          }
        >
      ),
      p: (Object.keys(spaceValues) as (keyof typeof spaceValues)[]).reduce(
        (acc, key) => {
          acc[key] = { padding: spaceValues[key] };
          return acc;
        },
        {} as Record<
          keyof typeof spaceValues,
          {
            padding: number;
          }
        >
      ),
      px: (Object.keys(spaceValues) as (keyof typeof spaceValues)[]).reduce(
        (acc, key) => {
          acc[key] = { paddingHorizontal: spaceValues[key] };
          return acc;
        },
        {} as Record<
          keyof typeof spaceValues,
          {
            paddingHorizontal: number;
          }
        >
      ),
      py: (Object.keys(spaceValues) as (keyof typeof spaceValues)[]).reduce(
        (acc, key) => {
          acc[key] = { paddingVertical: spaceValues[key] };
          return acc;
        },
        {} as Record<
          keyof typeof spaceValues,
          {
            paddingVertical: number;
          }
        >
      ),
    },
  },
}));
