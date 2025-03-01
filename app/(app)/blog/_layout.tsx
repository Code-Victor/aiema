import DefaultStack from "@/layout/default-stack";
import { Stack } from "expo-router";
import * as React from "react";
export default function BlogLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <DefaultStack />
    </>
  );
}
