import { Stack, router, type Href } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";

const DefaultStackLayout = React.forwardRef<
  React.ElementRef<typeof Stack>,
  React.ComponentProps<typeof Stack>
>(({ screenOptions, ...props }, ref) => {
  return (
    <Stack
      ref={ref}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Urbanist_600SemiBold",
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerLeft: ({ tintColor, canGoBack, href, label }) => {
          if (!canGoBack) {
            return null;
          }
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#F0F1F2" : "white",
                },
                styles.button,
              ]}
              onPress={() => {
                if (href) {
                  router.navigate(href as Href);
                } else {
                  router.back();
                }
              }}
              aria-label={label ? `Go to ${label}` : "Go back"}
            >
              <ArrowLeft2 size={24} color="#000000" />
            </Pressable>
          );
        },
        ...screenOptions,
      }}
      {...props}
    />
  );
});
export default DefaultStackLayout;
const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -8,
  },
});
