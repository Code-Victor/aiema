import { Stack } from "expo-router/stack";
import { SystemBars } from "react-native-edge-to-edge";
import { Toaster } from "sonner-native";

import {
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@/components/queryClient";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <KeyboardProvider>
      <QueryClientProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <SystemBars style="dark" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <Toaster richColors />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
