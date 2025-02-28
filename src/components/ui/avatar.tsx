import { getAvatar } from "@/lib/utils";
import { Image } from "expo-image";
import * as React from "react";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type StyleVariants = UnistylesVariants<typeof styles>;
interface AvatarProps
  extends StyleVariants,
    Omit<React.ComponentProps<typeof Image>, "source"> {
  src?: string;
  name: string;
}
export const Avatar = React.forwardRef<
  React.ElementRef<typeof Image>,
  AvatarProps
>(({ size = "md", name, src, style, ...props }, ref) => {
  styles.useVariants({
    size,
  });

  return (
    <Image
      ref={ref}
      source={src ? src : getAvatar(name)}
      alt={name}
      style={[styles.avatar, style]}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

const styles = StyleSheet.create((theme) => ({
  avatar: {
    borderRadius: 9999,
    variants: {
      size: {
        sm: {
          width: 32,
          height: 32,
        },
        md: {
          width: 40,
          height: 40,
        },
        lg: {
          width: 48,
          height: 48,
        },
      },
    },
  },
}));
