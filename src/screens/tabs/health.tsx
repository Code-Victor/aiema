import { Pressable, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { XStack, YStack } from "@/components/ui/stacks";
import { Text } from "@/components/ui/text";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Image } from "expo-image";
import { Avatar } from "@/components/ui/avatar";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as React from "react";
import { ArrowDown, ArrowDown2 } from "iconsax-react-native";

export default function Health() {
  return (
    <YStack f="1" style={styles.container}>
      <SystemBars style="dark" />
      <PageHeader title="Health Profile" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProfileCard />
        <MedicalData />
      </ScrollView>
    </YStack>
  );
}

function ProfileCard() {
  return (
    <YStack gap="4" p="5" ai="start" boc="neutral.100" bow="1" br="3">
      <XStack gap="5" ai="start">
        <Avatar name="John Doe" />
        <YStack gap="2" f={"1"}>
          <Text>
            Name: <Text fow="semibold">John Doe</Text>
          </Text>
          <Text>
            Insurance ID: <Text fow="semibold">4567000</Text>
          </Text>
        </YStack>
        <Badge title="Active" />
      </XStack>
      <XStack jc="between" ai="center" style={{ width: "100%" }}>
        <Image
          source={require("@/assets/images/eden-care.png")}
          style={{
            aspectRatio: 3.556,
            height: 27,
          }}
        />
        <Text fow="medium" color="secondary.400">
          Edit info
        </Text>
      </XStack>
    </YStack>
  );
}
const AnimatedYStack = Animated.createAnimatedComponent(YStack);
function MedicalData() {
  const medicalInfo = {
    Age: 32,
    "Blood Type": "O+",
    Weight: "75 kg",
    Height: "5' 9\"",
    Allergies: "Peanuts",
    Conditions: "Asthma",
  };
  const medications = [
    {
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "Once a day",
      duration: "1 week",
    },
    {
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "Once a day",
      duration: "1 week",
    },
  ];
  const documents = [
    {
      name: "Medical Report",
      date: "12/12/2021",
    },
    {
      name: "Prescription",
      date: "12/12/2021",
    },
  ];
  return (
    <AnimatedYStack
      layout={layoutTransition}
      gap="4"
      p="5"
      boc="neutral.100"
      bow="1"
      br="3"
      style={{
        overflow: "hidden",
      }}
    >
      <AccordionItem title="🏥 Medical Information" defaultExpanded>
        <YStack gap="3">
          {Object.entries(medicalInfo).map(([key, value]) => (
            <XStack jc="between" ai="center" style={{ width: "100%" }}>
              <Text color="neutral.200">{key}</Text>
              <Text fow="semibold">{value}</Text>
            </XStack>
          ))}
        </YStack>
        <XStack
          jc="end"
          style={{
            paddingTop: 20,
          }}
        >
          <Text color="secondary.400" fow="medium">
            Edit info
          </Text>
        </XStack>
      </AccordionItem>
      <AccordionItem title="💊 Medications" defaultExpanded>
        <YStack gap="3.5">
          {medications.map((med) => (
            <XStack jc="between" ai="center" style={{ width: "100%" }}>
              <YStack gap="1">
                <Text fow="semibold">{med.name}</Text>
                <Text
                  color="neutral.200"
                  style={{
                    fontSize: 14,
                  }}
                >{`${med.dosage} ${med.frequency} for ${med.duration}`}</Text>
              </YStack>
              <Badge title="Active" />
            </XStack>
          ))}
        </YStack>
        <XStack
          jc="end"
          style={{
            paddingTop: 20,
          }}
        >
          <Text color="secondary.400" fow="medium">
            Edit Medication
          </Text>
        </XStack>
      </AccordionItem>
      <AccordionItem title="📄 Documents">
        <YStack gap="3">
          {documents.map((doc) => (
            <XStack jc="between" ai="center" style={{ width: "100%" }}>
              <YStack gap="1">
                <Text fow="semibold">{doc.name}</Text>
                <Text
                  color="neutral.200"
                  style={{
                    fontSize: 14,
                  }}
                >
                  {`Added ${doc.date}`}
                </Text>
              </YStack>
              <Badge title="Active" />
            </XStack>
          ))}
        </YStack>
        <XStack
          jc="end"
          style={{
            paddingTop: 20,
          }}
        >
          <Text color="secondary.400" fow="medium">
            Add more
          </Text>
        </XStack>
      </AccordionItem>
    </AnimatedYStack>
  );
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const DURATION = 400;
const layoutTransition = LinearTransition.duration(DURATION).easing(
  Easing.inOut(Easing.ease)
);
const entering = FadeIn.duration(DURATION).easing(Easing.inOut(Easing.ease));
const exiting = FadeOut.duration(DURATION)
  .delay(100)
  .easing(Easing.inOut(Easing.ease));

function AccordionItem({
  title,
  children,
  defaultExpanded = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const iconRotation = useSharedValue(defaultExpanded ? 180 : 0);
  const toggleExpand = React.useCallback(() => {
    setExpanded((expand) => {
      const newExpand = !expand;
      iconRotation.value = withTiming(newExpand ? 180 : 0);
      return newExpand;
    });
  }, []);
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${iconRotation.value}deg`,
        },
      ],
    };
  });
  return (
    <AnimatedPressable
      onPress={toggleExpand}
      layout={layoutTransition}
      style={{ overflow: "hidden", gap: 12 }}
    >
      <XStack jc="between" ai="center" py={"2.5"} style={{ width: "100%" }}>
        <Text fos="h5" fow="medium">
          {title}
        </Text>
        <Animated.View style={animatedIconStyle}>
          <ArrowDown2 size={16} color="#292D32" />
        </Animated.View>
      </XStack>
      {expanded && (
        <Animated.View entering={entering} exiting={exiting}>
          {children}
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors["shades.white"],
    gap: theme.space(2),
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: theme.space(5),
    gap: theme.space(6),
    paddingBottom: theme.space(5),
  },
}));
