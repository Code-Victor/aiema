import { StyleSheet } from "react-native-unistyles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { XStack } from "./ui/stacks";
import { Back } from "iconsax-react-native";
import { useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Text } from "./ui/text";

// const END_POSITION = 200;
const SLIDER_WIDTH = 116;
export function SlideToCancel() {
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const { width } = useWindowDimensions();
  const END_POSITION = width - 2 * 10 - 2 * 20 - SLIDER_WIDTH;
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / (3 / 2)) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
        runOnJS(router.back)();
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <XStack
        p="2.5"
        ai="center"
        bg="neutral.100"
        style={{
          borderRadius: 9999,
          position: "relative",
        }}
      >
        <Text fow="medium" style={styles.cancelPrompt}>
          Slide to cancel
        </Text>
        <Animated.View style={[styles.cancelThumb, animatedStyle]}>
          <Back size={30} color="#FF3B30" />
        </Animated.View>
      </XStack>
    </GestureDetector>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  cancelThumb: {
    height: 56,
    width: SLIDER_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelPrompt: {
    position: "absolute",
    fontSize: 16,
    color: theme.colors["neutral.500"],
    left: "50%",
  },
}));
