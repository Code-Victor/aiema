import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { SystemBars } from "react-native-edge-to-edge";
import { Health, Home3, LampOn, Sound } from "iconsax-react-native";

import * as React from "react";
import { Text } from "react-native";
export default function TabLayout() {
  return (
    <>
      <SystemBars style="dark" />
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: "#949896",
          tabBarActiveTintColor: "#171D1A",
          tabBarItemStyle: {
            height: 200,
          },
          tabBarStyle: {
            shadowColor: "transparent",
            backgroundColor: "#FFFFFF",
          },
          tabBarLabel: ({ children, color, focused }) => {
            return (
              <Text
                style={{
                  fontFamily: focused
                    ? "Urbanist_600SemiBold"
                    : "Urbanist_500Medium",
                  color,
                  fontSize: 14,
                }}
              >
                {children}
              </Text>
            );
          },

          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Home3
                size={24}
                color={color}
                variant={focused ? "Bold" : "Outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="aiema"
          options={{
            title: "Aiema",
            tabBarIcon: ({ color, focused }) => (
              <Sound
                size={24}
                color={color}
                variant={focused ? "Bold" : "Outline"}
              />
            ),
          }}
        />
        <Text>Hello</Text>
        <Tabs.Screen
          name="health"
          options={{
            title: "Health",
            tabBarIcon: ({ color, focused }) => (
              <Health
                size={24}
                color={color}
                variant={focused ? "Bold" : "Outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, focused }) => (
              <LampOn
                size={24}
                color={color}
                variant={focused ? "Bold" : "Outline"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
