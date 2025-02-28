import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { Image } from "expo-image";
import { getAvatar, getDaySegment } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { IconButton } from "@/components/ui/icon-button";
import {
  Add,
  AddCircle,
  AddSquare,
  Call,
  Hospital,
  Notification,
  Sound,
} from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { YStack, XStack } from "@/components/ui/stacks";
import { Avatar } from "@/components/ui/avatar";
export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SystemBars style="dark" />
      <Greetings />
      <Suggestions />
      <Insurance />
      <EmergencyContacts />
    </ScrollView>
  );
}
const daySegmentEmoji = {
  morning: "☀️",
  afternoon: "🌤️",
  evening: "🌙",
};

function Greetings() {
  const name = "John Doe";
  const daySegment = getDaySegment();

  return (
    <View style={styles.greetingContainer}>
      <Avatar name={name} />
      <View style={styles.greetingTextContainer}>
        <Text fos="h6" fow="medium">
          Hi, {`${name} ${daySegmentEmoji[daySegment]}`}
        </Text>
        <Text fos="p" color="neutral.200">
          How are you feeling today?
        </Text>
      </View>
      <IconButton icon={Notification} label="Notifications" badge={20} />
    </View>
  );
}

const suggestions = [
  {
    icon: <Sound size={24} variant="Bold" color="#fff" />,
    title: "Ask Aiema",
    showGradient: true,
  },
  {
    icon: <Hospital size={24} variant="Bold" color="#538FF8" />,
    title: "Find First-Aid",
  },
  {
    icon: <Call size={24} variant="Bold" color="#FF3B30" />,
    title: "Emergency",
  },
];
function Suggestions() {
  return (
    <View style={styles.suggestionsContainer}>
      <Text fos="h5" fow="semibold" style={styles.suggestionText}>
        Suggestions
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestions}
      >
        {suggestions.map((suggestion, index) => {
          const Container = suggestion.showGradient ? LinearGradient : View;
          return (
            // @ts-ignore
            <Container
              key={index}
              {...(suggestion.showGradient
                ? {
                    colors: ["#BF7AFF", "#538FF8", "#538FF8"],
                    start: { x: -0.15, y: -0.13 },
                    end: { x: 1.16, y: 0.64 },
                  }
                : {})}
              style={styles.suggestionCard}
            >
              {suggestion.icon}
              <Text
                fos="p"
                fow="medium"
                ta="center"
                style={{
                  color: suggestion.showGradient ? "#fff" : "#171D1A",
                }}
              >
                {suggestion.title}
              </Text>
            </Container>
          );
        })}
      </ScrollView>
    </View>
  );
}
function Insurance() {
  return (
    <YStack p="4">
      <XStack jc="between" ai="center" style={{ width: "100%" }}>
        <Text fos="h5" fow="semibold">
          My Insurance
        </Text>
        <IconButton
          icon={Add}
          variant="ghost"
          iconVariant="Outline"
          label="Add more"
        />
      </XStack>
      <InsuranceCard />
    </YStack>
  );
}

function InsuranceCard() {
  return (
    <XStack gap="1" p="5" ai="start" boc="neutral.100" bow="1" br="3">
      <YStack gap="3.5" f={"1"}>
        <Text>
          Name: <Text fow="semibold">John Doe</Text>
        </Text>
        <Text>
          Insurance ID: <Text fow="semibold">4567000</Text>
        </Text>
        <Image
          source={require("@/assets/images/eden-care.png")}
          style={{
            aspectRatio: 4.333,
            height: 18,
          }}
        />
      </YStack>
      <XStack
        ai="center"
        jc="center"
        bg="success.400"
        p="1"
        style={{ borderRadius: 9999 }}
      >
        <Text fow="medium" color="shades.white">
          Active
        </Text>
      </XStack>
    </XStack>
  );
}
function EmergencyContacts() {
  return (
    <YStack p="4">
      <XStack jc="between" ai="center" style={{ width: "100%" }}>
        <Text fos="h5" fow="semibold">
          Emergency Contacts
        </Text>
        <IconButton
          icon={Add}
          variant="ghost"
          iconVariant="Outline"
          label="Add more"
        />
      </XStack>
      <YStack gap="4">
        <EmergencyContactCard />
        <EmergencyContactCard />
        <EmergencyContactCard />
      </YStack>
    </YStack>
  );
}

function EmergencyContactCard() {
  return (
    <XStack gap="4" p="5" ai="center" boc="neutral.100" bow="1" br="3">
      <Avatar name={"John Doe"} />

      <YStack gap="1" f={"1"}>
        <Text fow="semibold">John Doe</Text>
        <Text color="neutral.200">Family Doctor</Text>
      </YStack>
      <IconButton icon={Call} variant="grey" label="Add more" />
    </XStack>
  );
}

// functo
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors["shades.white"],
    // flex: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space(5),
    paddingHorizontal: theme.space(5),
    paddingVertical: theme.space(5.5),
  },
  greetingTextContainer: {
    gap: theme.space(1),
    flex: 1,
  },
  suggestionsContainer: {
    paddingVertical: theme.space(2.5),
    gap: theme.space(4),
  },
  suggestionText: {
    paddingHorizontal: theme.space(5),
  },
  suggestions: {
    gap: theme.space(3),
    flexDirection: "row",
    paddingHorizontal: theme.space(5),
  },
  suggestionCard: {
    position: "relative",
    padding: theme.space(5),
    gap: theme.space(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.space(3.5),
    backgroundColor: theme.colors["neutral.100"],
    overflow: "hidden",
  },
}));
