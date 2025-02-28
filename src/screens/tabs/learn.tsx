import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";

export default function Home() {
  return (
    <View style={styles.container}>
      <SystemBars style="dark" />
      <Text>Learn</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    gap: theme.gap(2),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors["error.300"],
  },
}));
