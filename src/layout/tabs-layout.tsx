import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { SystemBars } from "react-native-edge-to-edge";
import {
  Brodcast,
  Health,
  Home3,
  Icon,
  LampOn,
  Radar,
  Radar2,
  Sound,
} from "iconsax-react-native";

import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { StyleSheet } from "react-native-unistyles";
import { XStack, YStack } from "@/components/ui/stacks";
export default function TabLayout() {
  return (
    <>
      <SystemBars style="dark" />
      <Tabs>
        <TabSlot />
        <TabList asChild>
          <XStack ai="end" px="4" py="1.5" bg="shades.white">
            <TabTrigger name="home" href="/(tabs)" asChild>
              <TabButton name="Home" icon={Home3} />
            </TabTrigger>
            <TabTrigger name="Aiema" href="/(tabs)/aiema" asChild>
              <TabButton name="Aiema" icon={Sound} />
            </TabTrigger>
            <YStack
              gap="2"
              jc="center"
              ai="center"
              style={styles.alertButtonContainer}
            >
              <TouchableOpacity style={styles.alertButton} activeOpacity={0.8}>
                <Brodcast variant="Bold" size={24} color="#fff" />
              </TouchableOpacity>
              <Text>Alert</Text>
            </YStack>
            <TabTrigger name="Health" href="/(tabs)/health" asChild>
              <TabButton name="Health" icon={Health} />
            </TabTrigger>
            <TabTrigger name="Learn" href="/(tabs)/learn" asChild>
              <TabButton name="Learn" icon={LampOn} />
            </TabTrigger>
          </XStack>
        </TabList>
      </Tabs>
    </>
  );
}

// <Tabs
//   screenOptions={{
//     tabBarInactiveTintColor: "#949896",
//     tabBarActiveTintColor: "#171D1A",
//     tabBarItemStyle: {
//       height: 200,
//     },
//     tabBarStyle: {
//       shadowColor: "transparent",
//       backgroundColor: "#FFFFFF",
//     },
//     tabBarLabel: ({ children, color, focused }) => {
//       return (
//         <Text
//           style={{
//             fontFamily: focused
//               ? "Urbanist_600SemiBold"
//               : "Urbanist_500Medium",
//             color,
//             fontSize: 14,
//           }}
//         >
//           {children}
//         </Text>
//       );
//     },

//     headerShown: false,
//   }}
// >
//   <Tabs.Screen
//     name="index"
//     options={{
//       title: "Home",
//       tabBarIcon: ({ color, focused }) => (
//         <Home3
//           size={24}
//           color={color}
//           variant={focused ? "Bold" : "Outline"}
//         />
//       ),
//     }}
//   />
//   <Tabs.Screen
//     name="aiema"
//     options={{
//       title: "Aiema",
//       tabBarIcon: ({ color, focused }) => (
//         <Sound
//           size={24}
//           color={color}
//           variant={focused ? "Bold" : "Outline"}
//         />
//       ),
//     }}
//   />
//   <Text>Hello</Text>
//   <Tabs.Screen
//     name="health"
//     options={{
//       title: "Health",
//       tabBarIcon: ({ color, focused }) => (
//         <Health
//           size={24}
//           color={color}
//           variant={focused ? "Bold" : "Outline"}
//         />
//       ),
//     }}
//   />
//   <Tabs.Screen
//     name="learn"
//     options={{
//       title: "Learn",
//       tabBarIcon: ({ color, focused }) => (
//         <LampOn
//           size={24}
//           color={color}
//           variant={focused ? "Bold" : "Outline"}
//         />
//       ),
//     }}
//   />
// </Tabs>

interface TabButtonProps {
  name: string;
  icon: Icon;
  isFocused?: boolean;
  onPress?: () => void;
}

const TabButton = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  TabButtonProps
>(({ icon: Icon, name, isFocused, onPress, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.tabButton}
    >
      <Icon
        size={24}
        color={isFocused ? "#171D1A" : "#949896"}
        variant={isFocused ? "Bold" : "Outline"}
      />

      <Text fow={isFocused ? "semibold" : "regular"}>{name}</Text>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create((theme, rt) => ({
  tabs: {
    flex: 1,
    paddingTop: rt.insets.top,
  },
  tabButton: {
    gap: theme.space(2),
    justifyContent: "center",
    alignItems: "center",
  },
  alertButtonContainer: {
    gap: theme.space(2),
    justifyContent: "center",
    alignItems: "center",
  },
  alertButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors["error.400"],
    justifyContent: "center",
    alignItems: "center",
  },
}));
