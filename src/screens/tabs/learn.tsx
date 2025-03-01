import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { PageHeader } from "@/components/ui/page-header";
import { XStack, YStack } from "@/components/ui/stacks";
import { Input, InputWithIcon } from "@/components/ui/input";
import { ArrowRight2, Scroll, SearchNormal1 } from "iconsax-react-native";
import { Text } from "@/components/ui/text";
import { Grid } from "@/components/ui/grid";
import { IconButton } from "@/components/ui/icon-button";
import { convertMinutesToTime } from "@/lib/utils";
import * as React from "react";
export default function Home() {
  return (
    <YStack f="1" style={styles.container}>
      <SystemBars style="dark" />
      <PageHeader title="Learn First-Aid" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <InputWithIcon
          icon={SearchNormal1}
          variant="filled"
          placeholder="Search first-aid topics"
        />
        <Topics />
        <Guides />
        <VideoTutorials />
      </ScrollView>
    </YStack>
  );
}
const topics = [
  {
    title: "🩸 Bleeding",
    color: "#FFC4C1",
  },
  {
    title: "🔥 Burns",
    color: "#FFD3B3B2",
  },
  {
    title: "🦴 Fractures",
    color: "#E9E9E9",
  },
  {
    title: "❤️ CPR Basics",
    color: "#E4F8E8",
  },
  {
    title: "😳 Choking",
    color: "#F2F7FF",
  },
];
function Topics() {
  return (
    <YStack gap="4">
      <Text fow="bold" fos="h5">
        Popular Topics
      </Text>
      <XStack
        style={{
          flexWrap: "wrap",
          rowGap: 10,
          columnGap: 10,
        }}
      >
        {topics.map(({ title, color }) => (
          <Pressable
            key={title}
            style={{
              padding: 15,
              backgroundColor: color,
              borderRadius: 14,
            }}
          >
            <Text fow="bold">{title}</Text>
          </Pressable>
        ))}
      </XStack>
    </YStack>
  );
}
const sampleGuides = [
  {
    title: "How to stop bleeding",
    description:
      "Learning to stop bleeding can save a life and can be done in 5 minutes",
    duration: 5,
  },
  {
    title: "How to treat burns",
    description: "Learn how to treat burns in case of an emergency",
    duration: 10,
  },
  {
    title: "How to treat fractures",
    description:
      "Fractures are common injuries, learn how to treat them in 15 minutes",
    duration: 15,
  },
  // {
  //   title: "How to perform CPR",
  //   description: "Learn how to perform CPR in 20 minutes",
  //   duration: 20,
  // },
  // {
  //   title: "How to treat choking",
  //   description: "Learn how to treat choking in 5 minutes",
  //   duration: 5,
  // },
];
function Guides() {
  return (
    <YStack gap="4">
      <XStack jc="between" ai="center">
        <Text fow="bold" fos="h5">
          First Aid Guides
        </Text>
        <IconButton
          size="sm"
          iconVariant="Outline"
          variant="ghost"
          icon={ArrowRight2}
          label="View More"
        />
      </XStack>
      <YStack gap="7">
        {sampleGuides.map((guide, i) => (
          <GuideCard key={i} {...guide} />
        ))}
      </YStack>
    </YStack>
  );
}
interface GuideCardProps {
  title: string;
  description: string;
  duration: number;
}
function GuideCard(props: GuideCardProps) {
  return (
    <Pressable
      style={{
        borderRadius: 14,
        width: "100%",
        gap: 10,
      }}
    >
      <XStack jc="between">
        <Text fow="semibold">{props.title}</Text>

        <XStack bg="background" px="1" py="0.5" br="2">
          <Text fow="medium" color="neutral.200">
            {props.duration} mins read
          </Text>
        </XStack>
      </XStack>
      <Text fow="medium" color="neutral.200">
        {props.description}
      </Text>
    </Pressable>
  );
}

function VideoTutorials() {
  return (
    <YStack gap="4">
      <XStack jc="between" ai="center">
        <Text fow="bold" fos="h5">
          Video Tutorials
        </Text>
        <IconButton
          size="sm"
          iconVariant="Outline"
          variant="ghost"
          icon={ArrowRight2}
          label="View More"
        />
      </XStack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
        }}
      >
        {sampleGuides.map((guide, i) => (
          <VideoTutorialCard key={i} {...guide} creator="Rwanda Red Cross" />
        ))}
      </ScrollView>
    </YStack>
  );
}
function VideoTutorialCard({
  duration,
  title,
  creator,
}: {
  title: string;
  creator: string;
  duration: number;
}) {
  const { width } = useWindowDimensions();

  const time = React.useMemo(() => {
    return convertMinutesToTime(duration);
  }, [duration]);
  return (
    <Pressable
      style={{
        borderRadius: 14,
        width: width * 0.7,
        gap: 10,
      }}
    >
      <YStack gap="2">
        <XStack
          bg="neutral.200"
          br="3"
          style={{
            width: "100%",
            aspectRatio: 2.3,
          }}
        />
        <YStack gap="1">
          <Text fow="semibold">{title}</Text>
          <Text fow="medium" color="neutral.200">
            {time} - {creator}
          </Text>
        </YStack>
      </YStack>
    </Pressable>
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
    gap: theme.space(8),
    paddingBottom: theme.space(5),
  },
}));
