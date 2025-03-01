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
import { Link } from "expo-router";
import { guides } from "@/lib/data";
import { WebView } from "react-native-webview";

const firstAidVideos = [
  {
    title: "CPR Basics",
    creator: "Victor Chang Cardiac Research Institute",
    duration: 10,
    url: "https://www.youtube.com/watch?v=Plse2FOkV4Q&t=94s",
  },
  {
    title: "How to Stop Bleeding",
    creator: "UPMC",
    duration: 5,
    url: "https://www.youtube.com/watch?v=8sEijZkfUHI",
  },
];

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
  { title: "🩸 Bleeding", color: "#FFC4C1" },
  { title: "🔥 Burns", color: "#FFD3B3B2" },
  { title: "🦴 Fractures", color: "#E9E9E9" },
  { title: "❤️ CPR Basics", color: "#E4F8E8" },
  { title: "😳 Choking", color: "#F2F7FF" },
];

function Topics() {
  return (
    <YStack gap="4">
      <Text fow="bold" fos="h5">
        Popular Topics
      </Text>
      <XStack style={{ flexWrap: "wrap", rowGap: 10, columnGap: 10 }}>
        {topics.map(({ title, color }) => (
          <Pressable
            key={title}
            style={{ padding: 15, backgroundColor: color, borderRadius: 14 }}
          >
            <Text fow="bold">{title}</Text>
          </Pressable>
        ))}
      </XStack>
    </YStack>
  );
}

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
        {guides.map((guide, i) => (
          <GuideCard key={i} {...guide} />
        ))}
      </YStack>
    </YStack>
  );
}

interface GuideCardProps {
  id: number;
  title: string;
  preamble: string;
  duration: number;
}

function GuideCard(props: GuideCardProps) {
  return (
    <Link
      href={{
        pathname: "/(app)/blog/[id]",
        params: {
          id: props.id,
        },
      }}
      asChild
    >
      <Pressable
        style={{
          borderRadius: 14,
          width: "100%",
          gap: 10,
        }}
      >
        <XStack jc="between" gap="2">
          <Text fow="semibold" style={{ flex: 1 }} numberOfLines={1}>
            {props.title}
          </Text>

          <XStack bg="background" px="1" py="0.5" br="2">
            <Text fow="medium" color="neutral.200">
              {props.duration} mins read
            </Text>
          </XStack>
        </XStack>
        <Text fow="medium" color="neutral.200">
          {props.preamble}
        </Text>
      </Pressable>
    </Link>
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
        contentContainerStyle={{ gap: 12 }}
      >
        {firstAidVideos.map((video, i) => (
          <VideoTutorialCard key={i} {...video} />
        ))}
      </ScrollView>
    </YStack>
  );
}

function VideoTutorialCard({
  title,
  creator,
  duration,
  url,
}: {
  title: string;
  creator: string;
  duration: number;
  url: string;
}) {
  const { width } = useWindowDimensions();

  return (
    <Pressable style={{ borderRadius: 14, width: width * 0.7, gap: 10 }}>
      <YStack gap="2">
        <WebView
          style={{ height: 150, borderRadius: 10 }}
          source={{ uri: url }}
        />
        <YStack gap="1">
          <Text fow="semibold">{title}</Text>
          <Text fow="medium" color="neutral.200">
            {duration} min - {creator}
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
