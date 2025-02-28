import * as React from "react";
import { StyleSheet } from "react-native-unistyles";
import { StackProps, XStack } from "./stacks";
import { Text } from "./text";
export interface PageHeaderProps extends StackProps {
  title: string;
}

export const PageHeader = React.forwardRef<
  React.ElementRef<typeof XStack>,
  PageHeaderProps
>(({ title, ...props }, ref) => {
  return (
    <XStack jc="center" ai="center" py="3" {...props} ref={ref}>
      <Text fos="h4" ta="center" fow="semibold">
        {title}
      </Text>
    </XStack>
  );
});
PageHeader.displayName = "PageHeader";
