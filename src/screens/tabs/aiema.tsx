import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
// @ts-ignore
import Voice from "react-native-voice/voice
import { StyleSheet } from "react-native-unistyles";
// @ts-ignore
import { SystemBars } from "react-native-bars";

const firstAidInstructions = {
  // English JSON content here
};

const firstAidInstructionsKinyarwanda = {
  // Translated Kinyarwanda JSON content here
};

export default function Aiema() {
  const [messages, setMessages] = useState<{ id: number; text: string; isUser: boolean }[]>([]);
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const spokenText = e.value[0];
    setInputText(spokenText);
    handleSend(spokenText);
  };

  const startVoiceRecognition = async () => {
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = (text: string) => {
    if (text.trim()) {
      setMessages([...messages, { id: messages.length, text: text, isUser: true }]);
      const response = getResponse(text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length, text: response, isUser: false },
      ]);
    }
  };

  const getResponse = (text) => {
    const instructions = language === "english" ? firstAidInstructions : firstAidInstructionsKinyarwanda;
    const keywords = Object.keys(instructions.firstAidInstructions);
    const keyword = keywords.find((key) => text.toLowerCase().includes(key));
    if (keyword) {
      return instructions.firstAidInstructions[keyword].description;
    }
    return "I'm sorry, I didn't understand that. Can you please repeat?";
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "kinyarwanda" : "english");
  };

  return (
      <View style={styles.container}>
        <SystemBars style="dark" />
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message) => (
              <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userBubble : styles.aiBubble,
                  ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.voiceButton} onPress={startVoiceRecognition}>
            <Text>🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend(inputText)}>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
            <Text>{language === "english" ? "EN" : "KN"}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCCCC",
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#34C759",
  },
  messageText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    flex: 1,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  voiceButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  languageButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});