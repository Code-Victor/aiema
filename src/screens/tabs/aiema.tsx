import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { Ionicons } from "@expo/vector-icons";
import { authRouter, chatRouter } from "@/api/router";
import { Text } from "@/components/ui/text";
import { XStack, YStack } from "@/components/ui/stacks";
import { IconButton } from "@/components/ui/icon-button";
import { Add, ArrowLeft2, Setting, Setting2 } from "iconsax-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Chat } from "@/api/types";
import { Input, InputWithIcon } from "@/components/ui/input";
import { set } from "zod";
// Screen type definition
type ScreenType = "landing" | "text" | "voice";

export default function Aiema() {
  // State to track current screen
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("landing");

  return (
    <SafeAreaView style={styles.safeArea}>
      <SystemBars style="dark" />
      <TextInputScreen onBack={() => setCurrentScreen("landing")} />
    </SafeAreaView>
  );
}

// Text Input Screen Component
const TextInputScreen = ({ onBack }: { onBack: () => void }) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { data: user } = authRouter.getUserDetails.useQuery();
  const name = user?.full_name ?? "***";
  const { id = "" } = useLocalSearchParams<{ id?: string }>();
  const { data: chatHistory = [] } = chatRouter.getChatMessages.useQuery({
    variables: {
      id,
    },
  });
  const flatlistRef = React.useRef<FlatList>(null);
  React.useEffect(() => {});
  const { mutate: sendMessage, isPending: isConductingContinousChat } =
    chatRouter.sendMessage.useMutation({
      onMutate: async ({ message }) => {
        setMessage("");
        await queryClient.cancelQueries(
          chatRouter.getChatMessages.getFetchOptions({ id })
        );

        const previousThreadMessages = queryClient.getQueryData(
          chatRouter.getChatMessages.getKey({ id })
        );
        queryClient.setQueryData(
          chatRouter.getChatMessages.getKey({ id }),
          (old) => {
            if (!old) return old;
            const newMessage = {
              role: "user",
              content: message,
            } satisfies Chat;
            return [
              ...old,
              newMessage,
              {
                role: "assistant",
                content: "AIEma is thinking🧠...",
              } satisfies Chat,
            ];
          }
        );

        return { previousThreadMessages };
      },
      onError: (_err, _newMessage, context) => {
        queryClient.setQueryData(
          chatRouter.getChatMessages.getKey(),
          context?.previousThreadMessages
        );
      },
      // Always refetch after error or success:
      onSuccess: (data) => {
        if (!id) {
          router.setParams({ id: data.sessionId });
        }
        // console.log("data");
        // queryClient.setQueryData(
        //   chatRouter.getChatMessages.getKey({ id }),
        //   (old) => {
        //     if (!old) return old;
        //     return [
        //       ...old,
        //       {
        //         role: "assistant",
        //         content: data.response,
        //       } as Chat,
        //     ];
        //   }
        // );
        return queryClient.invalidateQueries(
          chatRouter.getChatMessages.getFetchOptions({
            id,
          })
        );
      },
    });
  console.log("isPending", isConductingContinousChat);
  return (
    <View style={styles.container}>
      <XStack ai="center" jc="between">
        <XStack ai="center">
          <IconButton
            variant="ghost"
            icon={ArrowLeft2}
            iconVariant="Outline"
            label="go back"
            onPress={router.back}
          />
          <Text fos="h4" fow="semibold">
            Ask Aiema
          </Text>
        </XStack>
        <IconButton icon={Setting} label="settings" />
      </XStack>

      <FlatList
        ref={flatlistRef}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 8,
          paddingTop: 12,
        }}
        ListEmptyComponent={() => (
          <YStack ai="center" jc="center" f="1">
            <Text
              fos="h2"
              fow="semibold"
              style={{
                color: "#A97EFE",
              }}
            >{`Hi, ${name}`}</Text>
            <Text fos="h3" fow="regular">
              How can I help you today?
            </Text>
          </YStack>
        )}
        data={chatHistory}
        renderItem={({ item }) => {
          if (item.role === "user") {
            return (
              <View style={styles.userMessageContainer}>
                <View style={styles.userMessage}>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.aiResponseContainer}>
                <Text style={styles.responseText}>{item.content}</Text>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="copy-outline" size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="thumbs-up-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        }}
      />

      <XStack style={styles.inputContainer} ai="center">
        <Input
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            marginRight: 8,
          }}
          placeholder="Type your message here..."
        />
        <TouchableOpacity
          onPress={() => {
            console.log("sending message", message);
            sendMessage({ message, id: id ? id : undefined });
          }}
          style={styles.sendButton}
        >
          <Ionicons name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: rt.insets.top,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  settingsButton: {
    padding: 8,
  },
  helpText: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    paddingTop: 8,
    // width: "100%",
    // backgroundColor: "#F0F2FE",
  },
  inputButton: {
    flex: 1,
  },
  inputButtonText: {
    flex: 1,
    marginLeft: 8,
    color: "#666",
  },
  voiceButton: {
    backgroundColor: "#5B6BF9",
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#5B6BF9",
    borderRadius: 50,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#FF4C4C",
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  userMessage: {
    backgroundColor: "#F0F2FE",
    borderRadius: 16,
    padding: 12,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  aiResponseContainer: {
    backgroundColor: theme.colors["neutral.100"],
    borderRadius: 16,
    padding: 12,
    maxWidth: "80%",
  },
  responseText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  voiceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  waveformContainer: {
    height: 100,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  waveform: {
    width: "100%",
    height: "100%",
  },
}));
