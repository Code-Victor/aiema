import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YStack } from "@/components/ui/stacks";
import { Text } from "@/components/ui/text";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import { GradientButton } from "@/components/ui/button";
import { authRouter } from "@/api/router";
import { toast } from "sonner-native";
import { useQueryClient } from "@tanstack/react-query";
import { guides } from "@/lib/data";
import { ScrollView } from "react-native-gesture-handler";

export default function Blog() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const currentGuide = guides.find((guide) => guide.id === Number(id));
  return (
    <>
      <Stack.Screen
        options={{
          title: "Guide",
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text fos="h3" fow="semibold">
          {currentGuide?.title}
        </Text>
        <Text>{currentGuide?.content}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    // flex: 1,
    backgroundColor: theme.colors["shades.white"],
    paddingVertical: theme.space(4),
    paddingBottom: theme.space(10),
    paddingHorizontal: theme.space(5),
    gap: theme.space(6),
  },
}));
