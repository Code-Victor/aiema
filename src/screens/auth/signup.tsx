import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YStack } from "@/components/ui/stacks";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import { GradientButton } from "@/components/ui/button";
import { authRouter } from "@/api/router";
import { toast } from "sonner-native";

const formSchema = z
  .object({
    fullName: z.string({
      required_error: "Full name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormSchema = z.infer<typeof formSchema>;
export default function Login() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate: signup, isPending } = authRouter.signup.useMutation({
    onSuccess: (data) => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error("Sorry, an error occurred. Please try again later");
    },
  });
  function onSumbit(data: FormSchema) {
    signup({
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      passwordConfirm: data.confirmPassword,
    });
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "Getting your info",
        }}
      />
      <YStack style={styles.container} gap="6">
        <YStack gap="3" ai="center">
          <Text ta="center">
            Kindly fill in the form below to create an account with us.
          </Text>
        </YStack>
        <YStack gap="4" f="1">
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Full Name</Label>
                <Input
                  placeholder="Victor Hamzat"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Email</Label>
                <Input
                  placeholder="v.hamzat@alustudent.com"
                  keyboardType="email-address"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Password</Label>
                <Input
                  secureTextEntry
                  placeholder="********"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <YStack gap="1">
                <Label fow="medium">Confirm Password</Label>
                <Input
                  secureTextEntry
                  placeholder="********"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && <FormMessage error>{error.message}</FormMessage>}
              </YStack>
            )}
          />
        </YStack>
        <GradientButton
          title="Sign up"
          loading={isPending}
          onPress={form.handleSubmit(onSumbit)}
        />
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
