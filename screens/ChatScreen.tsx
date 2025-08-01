import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';
import ChatMessage from '../components/ChatMessage';
import OpenAIService, { ChatMessage as ChatMessageType } from '../services/openai';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

const featureConfigs: Record<string, { title: string; systemMessage: string; prompts: string[] }> = {
  ask: {
    title: 'Life Guidance',
    systemMessage: "Hello! I'm Vita, your AI life advisor. I'm here to provide personalized guidance and insights to help you navigate life's journey. What would you like to explore today?",
    prompts: [
      'What is the best career path for me?',
      'How can I improve my relationships?',
      'What should I focus on this week?',
      'How can I practice better self-care?',
    ],
  },
  horoscope: {
    title: 'Daily Insights',
    systemMessage: "Welcome to your daily cosmic insights! I'm Vita, and I'm here to share personalized astrological guidance and daily wisdom to help you align with the universe's energy.",
    prompts: [
      'What does my horoscope reveal today?',
      'What cosmic energies should I be aware of?',
      'How can I make the most of today\'s alignment?',
    ],
  },
  romantic: {
    title: 'Love & Relationships',
    systemMessage: "Welcome to your love and relationship advisor! I'm Vita, and I'm here to help you understand romantic compatibility, improve your relationships, and find deeper connections.",
    prompts: [
      'Are we compatible as romantic partners?',
      'How can I improve my current relationship?',
      'What should I know about love compatibility?',
    ],
  },
  soulmate: {
    title: 'Soul Connections',
    systemMessage: "Welcome to your soulmate guide! I'm Vita, and I'm here to help you understand soul connections, recognize your soulmate, and navigate the journey to finding your perfect match.",
    prompts: [
      'How will I recognize my soulmate?',
      'What qualities should I look for in a soulmate?',
      'How can I prepare myself for meeting my soulmate?',
    ],
  },
  friend: {
    title: 'Friendship Harmony',
    systemMessage: "Welcome to your friendship advisor! I'm Vita, and I'm here to help you build stronger friendships, understand compatibility, and create meaningful connections with others.",
    prompts: [
      'Are we compatible as friends?',
      'How can I strengthen my friendships?',
      'What makes a great friendship?',
    ],
  },
  dream: {
    title: 'Dream Analysis',
    systemMessage: "Welcome to your dream interpreter! I'm Vita, and I'm here to help you understand the hidden meanings in your dreams and unlock the wisdom they hold for your waking life.",
    prompts: [
      'What does it mean to dream of flying?',
      'I had a dream about water, what does it mean?',
      'Can you interpret my recent dream?',
    ],
  },
  astro: {
    title: 'Cosmic Events',
    systemMessage: "Welcome to your cosmic events guide! I'm Vita, and I'm here to help you understand astrological events, planetary alignments, and how they affect your life and energy.",
    prompts: [
      'What astrological events are happening this month?',
      'How will the full moon affect me?',
      'What should I know about Mercury retrograde?',
    ],
  },
  tarot: {
    title: 'Tarot Wisdom',
    systemMessage: "Welcome to your tarot guide! I'm Vita, and I'm here to help you understand tarot cards, interpret spreads, and gain insights from the ancient wisdom of the tarot.",
    prompts: [
      'What does the Lovers card mean?',
      'Can you interpret a tarot spread for me?',
      'What is the meaning of the Tower card?',
    ],
  },
  growth: {
    title: 'Personal Evolution',
    systemMessage: "Welcome to your personal growth advisor! I'm Vita, and I'm here to help you develop better habits, improve productivity, and evolve into the best version of yourself.",
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
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const lastSentMessageRef = useRef<string>('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const typingAnim = useRef(new Animated.Value(0)).current;
  
  // Typing dots animation values
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

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
      
      // Animate the typing effect for the initial message
      animateTyping(config.systemMessage);
    } else {
      setChatHistory(history);
    }
    
    // Reset last sent message ref when feature changes
    lastSentMessageRef.current = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureKey]);

  const animateTyping = (text: string) => {
    setIsTyping(true);
    setTypingText('');
    let currentIndex = 0;
    
    // Start typing dots animation
    startTypingDotsAnimation();
    
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypingText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingText('');
        stopTypingDotsAnimation();
      }
    }, 30); // Adjust speed as needed
  };

  const startTypingDotsAnimation = () => {
    const createDotAnimation = (dotAnim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createDotAnimation(dot1Anim, 0).start();
    createDotAnimation(dot2Anim, 200).start();
    createDotAnimation(dot3Anim, 400).start();
  };

  const stopTypingDotsAnimation = () => {
    dot1Anim.setValue(0);
    dot2Anim.setValue(0);
    dot3Anim.setValue(0);
  };

  const handleSend = async (text?: string) => {
    const userMessage = (text !== undefined ? text : message).trim();
    if (!userMessage || loading) return;
    
    // Prevent duplicate messages by checking if we just sent the same message
    if (lastSentMessageRef.current === userMessage) {
      return;
    }
    
    lastSentMessageRef.current = userMessage;
    
    setError(null);
    setLoading(true);
    setMessage('');
    
    // Add user message immediately
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user',
      timestamp: new Date(),
    };
    
    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    OpenAIService.addMessage(featureKey, userMsg);
    
    try {
      const response = await OpenAIService.sendMessage(userMessage, featureKey, config.systemMessage);
      
      if (!response.success && response.error) {
        setError(response.error);
      } else if (response.success && response.message) {
        // Add AI message to chat history and animate typing
        const aiMsg: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          role: 'assistant',
          timestamp: new Date(),
        };
        
        const newHistory = [...updatedHistory, aiMsg];
        setChatHistory(newHistory);
        OpenAIService.addMessage(featureKey, aiMsg);
        
        // Animate typing for AI response
        animateTyping(response.message);
      }
    } catch (err) {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
      // Clear the last sent message ref after a delay to allow for legitimate repeated messages
      setTimeout(() => {
        lastSentMessageRef.current = '';
      }, 2000);
    }
  };

  const handlePrompt = (prompt: string) => {
    if (loading) return; // Prevent sending while already loading
    handleSend(prompt);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#0F0F23', '#1a1a2e']}
          style={styles.headerBar}
        >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#8B5CF6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{config.title}</Text>
          <View style={styles.headerSpacer} />
        </LinearGradient>
        
        <View style={styles.divider} />
        
        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: spacing.lg }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {chatHistory.map((msg, idx) => (
            <Animated.View 
              key={`${msg.id}-${msg.timestamp.getTime()}-${idx}`} 
              style={[
                msg.role === 'assistant' ? styles.systemMessage : undefined,
                { opacity: fadeAnim }
              ]}
            >
              {msg.role === 'assistant' ? (
                <View style={styles.vitaMessageContainer}>
                  <View style={styles.vitaAvatar}>
                    <Text style={styles.vitaAvatarText}>✨</Text>
                  </View>
                  <View style={styles.vitaMessageBubble}>
                    <Text style={styles.vitaName}>Vita</Text>
                    <Text style={styles.vitaText}>
                      {isTyping && idx === chatHistory.length - 1 ? typingText : msg.content}
                    </Text>
                    {isTyping && idx === chatHistory.length - 1 && (
                      <Animated.View style={styles.typingIndicator}>
                        <Animated.Text style={[
                          styles.typingDot,
                          {
                            opacity: dot1Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.3, 1],
                            }),
                            transform: [{
                              scale: dot1Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1.2],
                              }),
                            }],
                          }
                        ]}>●</Animated.Text>
                        <Animated.Text style={[
                          styles.typingDot,
                          {
                            opacity: dot2Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.3, 1],
                            }),
                            transform: [{
                              scale: dot2Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1.2],
                              }),
                            }],
                          }
                        ]}>●</Animated.Text>
                        <Animated.Text style={[
                          styles.typingDot,
                          {
                            opacity: dot3Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.3, 1],
                            }),
                            transform: [{
                              scale: dot3Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1.2],
                              }),
                            }],
                          }
                        ]}>●</Animated.Text>
                      </Animated.View>
                    )}
                  </View>
                </View>
              ) : (
                <ChatMessage message={msg} />
              )}
            </Animated.View>
          ))}
          
          {loading && (
            <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color="#8B5CF6" />
                <Text style={styles.loadingText}>Vita is thinking...</Text>
              </View>
            </Animated.View>
          )}
          
          {error && (
            <Animated.Text style={[styles.errorText, { opacity: fadeAnim }]}>
              {error}
            </Animated.Text>
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
              placeholder={`Ask ${config.title}...`}
              placeholderTextColor={colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              editable={!loading}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                { opacity: loading || !message.trim() ? 0.5 : 1 }
              ]} 
              activeOpacity={0.8} 
              onPress={() => handleSend()} 
              disabled={loading || !message.trim()}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  keyboardContainer: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5CF6',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44, // Same width as back button for balance
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 8,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  systemMessage: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  vitaMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vitaAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vitaAvatarText: {
    fontSize: 18,
  },
  vitaMessageBubble: {
    flex: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  vitaName: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
           vitaText: {
           color: 'white',
           fontSize: 16,
           lineHeight: 22,
           fontFamily: 'JetBrainsMono-VariableFont',
         },
  typingIndicator: {
    flexDirection: 'row',
    marginTop: 8,
  },
  typingDot: {
    color: '#8B5CF6',
    fontSize: 16,
    marginRight: 4,
    opacity: 0.7,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  loadingText: {
    color: '#8B5CF6',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginVertical: spacing.sm,
    fontSize: 14,
  },
  promptsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 8,
  },
  promptChip: {
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  promptText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: '#0F0F23',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 