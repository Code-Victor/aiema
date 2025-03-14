import { SlideToCancel } from "@/components/slide-to-cancel";
import { Donut } from "@/components/ui/donut";
import { XStack, YStack } from "@/components/ui/stacks";
import { Text } from "@/components/ui/text";
import { useStore } from "@/store";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import * as SMS from "expo-sms";
import { Brodcast } from "iconsax-react-native";
import * as React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

const alertPrompt = () => {
  return `🚨 SOS Emergency Alert 🚨

Urgent! I need immediate help!
My location: https://maps.app.goo.gl/EXYnTbWmVGFPxBMb6
Please call emergency services and assist if you can.

Sent via Aiema - AI Emergency Assistant`;
};
export default function Alert() {
  const emergencyContacts = useStore((s) => s.emergencyContacts);
  return (
    <YStack f="1" style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SystemBars style="dark" />
      <YStack gap="9">
        <XStack ai="center" gap="2">
          <Text fos="h2" fow="semibold">
            Alert Mode
          </Text>
          <Brodcast variant="Bold" size={36} color="#FF3B30" />
        </XStack>
        <YStack gap="6">
          <Text fos="h4" fow="semibold">
            Your Phone Will:
          </Text>
          <YStack gap="3">
            <Text color="neutral.300" fos="h5" fow="medium">
              • Send a message to emergency contacts
            </Text>
            <Text color="neutral.300" fos="h5" fow="medium">
              • Send Amber Alert to nearby users
            </Text>
            <Text color="neutral.300" fos="h5" fow="medium">
              • Call 112 (Emergency Services)
            </Text>
          </YStack>
        </YStack>
      </YStack>
      <YStack f="1" jc="center" ai="center">
        <EmergencyButton
          onComplete={async () => {
            const { result } = await SMS.sendSMSAsync(
              emergencyContacts.map((contact) => contact.phoneNumber),
              alertPrompt()
            );
            // Linking.openURL("tel:112");
          }}
        />
      </YStack>
      <SlideToCancel />
    </YStack>
  );
}

interface EmergencyButtonProps {
  onComplete?: () => void;
}

export function EmergencyButton({ onComplete }: EmergencyButtonProps) {
  const { width } = useWindowDimensions();
  const animatedValue = useSharedValue(100);
  const [secondsLeft, setSecondsLeft] = React.useState(3);
  const countdownDuration = 3000; // 3 seconds

  // Function to update the seconds text based on the animation progress
  const updateSeconds = React.useCallback(
    (progress: number) => {
      const newSecondsLeft = Math.ceil((progress / 100) * 3);
      if (newSecondsLeft !== secondsLeft) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setSecondsLeft(newSecondsLeft);
      }
    },
    [secondsLeft]
  );

  // Watch for animation completion
  useAnimatedReaction(
    () => animatedValue.value,
    (value) => {
      // Update the seconds text
      runOnJS(updateSeconds)(value);

      // Check if the animation is complete
      if (value <= 0 && onComplete) {
        runOnJS(onComplete)();
      }
    }
  );

  const handlePressIn = React.useCallback(() => {
    // Start the countdown animation
    animatedValue.value = withTiming(0, { duration: countdownDuration });
  }, [animatedValue, countdownDuration]);

  const handlePressOut = React.useCallback(() => {
    // Reset the animation when released
    // cancelAnimation(animatedValue);
    animatedValue.value = withTiming(100, { duration: 300 });
  }, [animatedValue]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Donut
        radius={width * 0.3}
        color="#FF8983"
        percentage={animatedValue}
        strokeWidth={8}
        duration={countdownDuration}
        max={100}
      >
        <YStack
          jc="center"
          ai="center"
          bg="error.400"
          style={{
            width: width * 0.6 - 22,
            height: width * 0.6 - 22,
            borderRadius: width * 0.6,
          }}
        >
          <Text fos="h5" fow="semibold" ta="center" color="shades.white">
            {secondsLeft === 3
              ? `Hold for 3\nseconds to start`
              : secondsLeft === 0
              ? "Sending Alert..."
              : `Release in\n${secondsLeft} second${
                  secondsLeft !== 1 ? "s" : ""
                }`}
          </Text>
        </YStack>
      </Donut>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.colors["shades.white"],
    paddingTop: rt.insets.top + 28,
    paddingHorizontal: theme.space(5),
    paddingBottom: 16,
  },
}));
