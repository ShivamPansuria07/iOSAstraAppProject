import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';
import ChatMessage from '../components/ChatMessage';
import OpenAIService, { ChatMessage as ChatMessageType } from '../services/openai';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

const featureConfigs: Record<string, { title: string; systemMessage: string; prompts: string[] }> = {
  ask: {
    title: 'Ask me anything',
    systemMessage: "What's on your mind?",
    prompts: [
      'What is the best career for me?',
      'What self care should I practice today?',
      'How can I improve my relationships?',
      'What should I focus on this week?',
    ],
  },
  horoscope: {
    title: 'Daily horoscope',
    systemMessage: "Here’s your daily horoscope!",
    prompts: [
      'What does my horoscope say today?',
      'What should I be aware of this week?',
      'How will my day go?',
    ],
  },
  romantic: {
    title: 'Romantic compatibility',
    systemMessage: "Let's explore your romantic compatibility!",
    prompts: [
      'Are we a good match?',
      'What is my love compatibility with Leo?',
      'How can I improve my relationship?',
    ],
  },
  soulmate: {
    title: 'Your soulmate',
    systemMessage: "Let's talk about your soulmate!",
    prompts: [
      'Who is my soulmate?',
      'How will I meet my soulmate?',
      'What qualities should I look for?',
    ],
  },
  friend: {
    title: 'Friend compatibility',
    systemMessage: "Let's check your friend compatibility!",
    prompts: [
      'Are we compatible as friends?',
      'How can I strengthen my friendships?',
      'What should I know about my friend?',
    ],
  },
  dream: {
    title: 'Dream interpreter',
    systemMessage: "Tell me about your dream!",
    prompts: [
      'What does it mean to dream of flying?',
      'I had a dream about water, what does it mean?',
      'Can you interpret my dream?',
    ],
  },
  astro: {
    title: 'Astrological events',
    systemMessage: "Here are the latest astrological events!",
    prompts: [
      'What astrological events are happening this month?',
      'How will the full moon affect me?',
      'What should I know about Mercury retrograde?',
    ],
  },
  tarot: {
    title: 'Tarot card interpreter',
    systemMessage: "Let's interpret your tarot cards!",
    prompts: [
      'What does the Lovers card mean?',
      'Can you interpret a tarot spread for me?',
      'What is the meaning of the Tower card?',
    ],
  },
  growth: {
    title: 'Personal growth tips',
    systemMessage: "Let's talk about your personal growth!",
    prompts: [
      'How can I be more productive?',
      'What habits should I develop?',
      'How can I improve myself?',
    ],
  },
};

type ChatScreenRouteProp = RouteProp<{ params: { feature?: string } }, 'params'>;

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const featureKey = route.params?.feature || 'ask';
  const config = featureConfigs[featureKey] || featureConfigs['ask'];
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>(OpenAIService.getConversationHistory(featureKey));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // If no chat history for this feature, start with the system message
    const history = OpenAIService.getConversationHistory(featureKey);
    if (!history.length) {
      const systemMsg: ChatMessageType = {
        id: 'system',
        content: config.systemMessage,
        role: 'assistant',
        timestamp: new Date(),
      };
      OpenAIService.clearConversation(featureKey);
      OpenAIService.addMessage(featureKey, systemMsg);
      setChatHistory([systemMsg]);
    } else {
      setChatHistory(history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureKey]);

  const handleSend = async (text?: string) => {
    const userMessage = (text !== undefined ? text : message).trim();
    if (!userMessage || loading) return;
    setError(null);
    setLoading(true);
    setMessage('');
    try {
      const response = await OpenAIService.sendMessage(userMessage, featureKey, config.systemMessage);
      setChatHistory(OpenAIService.getConversationHistory(featureKey));
      if (!response.success && response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handlePrompt = (prompt: string) => {
    setMessage(prompt);
    handleSend(prompt);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{config.title}</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {chatHistory.map((msg, idx) => (
          <View key={msg.id + idx} style={msg.role === 'assistant' ? styles.systemMessage : undefined}>
            {msg.role === 'assistant' ? (
              <Text style={styles.systemText}><Text style={{ fontWeight: 'bold' }}>Astra:</Text>{'\n'}{msg.content}</Text>
            ) : (
              <ChatMessage message={msg} />
            )}
          </View>
        ))}
        {loading && (
          <View style={{ alignItems: 'center', marginVertical: spacing.md }}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginVertical: spacing.sm }}>{error}</Text>
        )}
      </ScrollView>
      <View style={styles.promptsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {config.prompts.map((suggestion: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.promptChip}
              activeOpacity={0.8}
              onPress={() => handlePrompt(suggestion)}
              disabled={loading}
            >
              <Text style={styles.promptText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={config.title + '...'}
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
            editable={!loading}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={() => handleSend()} disabled={loading || !message.trim()}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: '#000',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // to balance the back button
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginBottom: 8,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  systemMessage: {
    marginVertical: 18,
    marginHorizontal: 18,
    backgroundColor: 'transparent',
  },
  systemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 2,
  },
  promptsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 8,
  },
  promptChip: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  promptText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#181818',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    opacity: 1,
  },
}); 