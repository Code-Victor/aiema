import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YStack } from "@/components/ui/stacks";
import { Text } from "@/components/ui/text";
import { Link, Stack, useRouter } from "expo-router";
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

const formSchema = z.object({
  provider: z.string({
    required_error: "Insurance Provider is required",
  }),
  id: z.string({
    required_error: "Password is required",
  }),
});
type FormSchema = z.infer<typeof formSchema>;
export default function Insurance() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "",
      id: "",
    },
  });
  const { mutate: login, isPending } = authRouter.login.useMutation({
    onSuccess: (data) => {
      return queryClient
        .ensureQueryData(authRouter.getUserDetails.getFetchOptions())
        .then(() => {
          toast.success("Account created successfully");
          router.replace("/(app)/(tabs)");
        });
    },
    onError: (error) => {
      toast.error("Sorry, an error occurred. Please try again later");
    },
  });
  function onSumbit(data: FormSchema) {
    login(data);
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Inusrance Info",
        }}
      />
      <YStack style={styles.container} gap="6">
        <YStack gap="3" ai="center">
          <Text ta="center">Kindly enter your email and password to login</Text>
        </YStack>
        <YStack gap="4" f="1">
          <Controller
            name="provider"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Insurance Provider</Label>
                <Input
                  placeholder="e.g. Eden Care"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
          <Controller
            name="id"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Insurance ID</Label>
                <Input
                  placeholder="000-000"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
          <YStack
            style={{
              paddingBottom: 54,
            }}
          >
            <GradientButton
              title="Login"
              loading={isPending}
              onPress={form.handleSubmit(onSumbit)}
            />
          </YStack>
        </YStack>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors["shades.white"],
    paddingVertical: theme.space(4),
    paddingHorizontal: theme.space(5),
  },
}));
