import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SystemBars } from "react-native-edge-to-edge";
import { Ionicons } from "@expo/vector-icons";

// Screen type definition
type ScreenType = "landing" | "text" | "voice";

export default function Aiema() {
  // State to track current screen
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("landing");

  // Function to render appropriate screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return <LandingScreen onInputStart={() => setCurrentScreen("text")} />;
      case "text":
        return <TextInputScreen onBack={() => setCurrentScreen("landing")} />;
      case "voice":
        return <VoiceInputScreen onBack={() => setCurrentScreen("landing")} />;
      default:
        return <LandingScreen onInputStart={() => setCurrentScreen("text")} />;
    }
  };

  return (
      <SafeAreaView style={styles.safeArea}>
        <SystemBars style="dark" />
        {renderScreen()}
      </SafeAreaView>
  );
}

// Landing Screen Component
const LandingScreen = ({ onInputStart }: { onInputStart: () => void }) => {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Ask Aiema</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hi, Rebecca</Text>
          <Text style={styles.helpText}>How can I help you today?</Text>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputButton} onPress={onInputStart}>
            <Ionicons name="add" size={20} color="#666" />
            <Text style={styles.inputButtonText}>Need help? Type or say it...</Text>
            <View style={styles.voiceButton}>
              <Ionicons name="mic" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

// Text Input Screen Component
const TextInputScreen = ({ onBack }: { onBack: () => void }) => {
  const [message, setMessage] = useState("");

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text style={styles.screenTitle}>Ask Aiema</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatContainer}>
          <View style={styles.userMessageContainer}>
            <View style={styles.userMessage}>
              <Text style={styles.messageText}>Hi Aiema, what can I do to a burn? It's an emergency</Text>
            </View>
          </View>

          <View style={styles.aiResponseContainer}>
            <Text style={styles.responseText}>Run under cool (not ice-cold) water for 10-20 min.</Text>
            <Text style={styles.responseText}>Cover with a clean, non-stick bandage.</Text>
            <Text style={styles.responseText}>Take ibuprofen or acetaminophen if needed.</Text>
            <Text style={styles.responseText}>Avoid ice, butter, or popping blisters.</Text>
            <Text style={styles.responseText}>If severe, large, or infected, see a doctor.</Text>
            <Text style={styles.responseText}>Stay safe! 🩹</Text>

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
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="add" size={20} color="#666" />
            <Text style={styles.inputButtonText}>Thank you Aiema :)</Text>
            <View style={styles.sendButton}>
              <Ionicons name="paper-plane" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

// Voice Input Screen Component
const VoiceInputScreen = ({ onBack }: { onBack: () => void }) => {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text style={styles.screenTitle}>Ask Aiema</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.voiceContainer}>
          <View style={styles.waveformContainer}>
            <Image
                source={{ uri: 'https://example.com/placeholder/waveform.png' }}
                style={styles.waveform}
                resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="add" size={20} color="#666" />
            <Text style={styles.inputButtonText}>Listening...</Text>
            <View style={styles.recordingButton}>
              <Ionicons name="stop" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
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
    padding: 16,
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
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5B6BF9",
    marginBottom: 8,
  },
  helpText: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    marginTop: "auto",
    marginBottom: 12,
  },
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 24,
    padding: 12,
    paddingHorizontal: 16,
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
    width: 36,
    height: 36,
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
  chatContainer: {
    flex: 1,
    marginVertical: 8,
  },
  userMessageContainer: {
    alignItems: "flex-end",
    marginBottom: 16,
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
    backgroundColor: "#FFFFFF",
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