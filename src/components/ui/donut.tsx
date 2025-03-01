import * as React from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, G, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  SharedValue,
  Easing,
} from "react-native-reanimated";

// Create an animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function Donut({
  percentage = 75,
  radius = 25,
  strokeWidth = 4,
  duration = 500,
  color = "#06C072",
  delay = 1000,
  max = 100,
  children,
}: {
  percentage?: number | SharedValue<number>;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: string;
  max?: number;
  children?: React.ReactNode;
}) {
  // Create a local shared value if a number is passed, or use the provided shared value
  const animatedValue = useSharedValue(
    typeof percentage === "number" ? 0 : percentage.value
  );
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  // Set up the animation only when a numeric percentage is provided
  React.useEffect(() => {
    if (typeof percentage === "number") {
      animatedValue.value = withDelay(
        delay,
        withTiming(percentage, {
          duration,
          easing: Easing.out(Easing.ease),
        })
      );
    }
  }, [
    typeof percentage === "number" ? percentage : null,
    duration,
    delay,
    animatedValue,
  ]);

  // Define animated props for the circle
  const animatedCircleProps = useAnimatedProps(() => {
    // Use the provided shared value or our local one
    const currentValue =
      typeof percentage === "number" ? animatedValue.value : percentage.value;

    const maxPerc = (100 * currentValue) / max;
    const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        position: "relative",
      }}
    >
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={"#FFFFFF1A"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="url(#a)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedCircleProps}
            strokeLinecap="round"
          />
        </G>
        <Defs>
          <LinearGradient
            id="a"
            x1={17.623}
            x2={-26.831}
            y1={38}
            y2={22.585}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color} />
            <Stop offset={1} stopColor={color} />
          </LinearGradient>
        </Defs>
      </Svg>
      <View
        style={{
          width: radius * 2,
          height: radius * 2,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
}
