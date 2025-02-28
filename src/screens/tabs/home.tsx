import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { Image } from "expo-image";
import { getAvatar } from "@/lib/utils";
import { Text } from "@/components/ui/text";
export default function Home() {
  return (
    <View style={styles.container}>
      <SystemBars style="dark" />
      <Greetings />
    </View>
  );
}
function Greetings() {
  return (
    <View style={styles.greetingContainer}>
      <Image source={getAvatar("John Doe")} style={styles.greetingAvatar} />
      <View style={styles.greetingTextContainer}>
        <Text fos="h6" fow="medium">
          Hi, John Doe
        </Text>
        <Text fos="p" color="neutral.200">
          How are you feeling today?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    paddingHorizontal: theme.space(5),
    backgroundColor: theme.colors["shades.white"],
    flex: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space(5),
    paddingVertical: theme.space(5.5),
  },
  greetingAvatar: {
    height: theme.space(10),
    width: theme.space(10),
    borderRadius: theme.space(5),
  },
  greetingTextContainer: {
    gap: theme.space(1),
    flex: 1,
  },
}));
