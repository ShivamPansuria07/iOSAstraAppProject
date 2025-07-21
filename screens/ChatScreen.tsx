import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';
import ChatMessage from '../components/ChatMessage';
import OpenAIService, { ChatMessage as ChatMessageType } from '../services/openai';

const promptSuggestions = [
  'Tell me about my love life',
  'Career advice for me',
  'Daily horoscope',
  'Life coaching session',
];

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>(OpenAIService.getConversationHistory());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async (text?: string) => {
    const userMessage = (text !== undefined ? text : message).trim();
    if (!userMessage || loading) return;
    setError(null);
    setLoading(true);
    setMessage('');
    try {
      const response = await OpenAIService.sendMessage(userMessage);
      setChatHistory(OpenAIService.getConversationHistory());
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
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat with Astra</Text>
        </View>

        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.welcomeMessage}>
            <Text style={styles.welcomeText}>Hello! I'm Astra, your AI life advisor. How can I help you today?</Text>
          </View>
          {chatHistory.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
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

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Quick Prompts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {promptSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                activeOpacity={0.8}
                onPress={() => handlePrompt(suggestion)}
                disabled={loading}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  welcomeMessage: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  suggestionsContainer: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  inputContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    opacity: 1,
  },
}); 