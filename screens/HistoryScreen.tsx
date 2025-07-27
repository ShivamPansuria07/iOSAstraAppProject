import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import OpenAIService from '../services/openai';

const featureNames: Record<string, string> = {
  ask: 'Ask me anything',
  horoscope: 'Daily horoscope',
  romantic: 'Romantic compatibility',
  soulmate: 'Your soulmate',
  friend: 'Friend compatibility',
  dream: 'Dream interpreter',
  astro: 'Astrological events',
  tarot: 'Tarot card interpreter',
  growth: 'Personal growth tips',
};

export default function HistoryScreen() {
  const navigation = useNavigation();

  // Get all chat histories from OpenAIService (in-memory for now)
  // In a real app, you might persist this or fetch from backend
  const histories = Object.entries(OpenAIService['conversationHistories'] || {})
    .map(([featureKey, messages]) => ({
      featureKey,
      featureName: featureNames[featureKey] || featureKey,
      lastMessage: messages.length ? messages[messages.length - 1] : null,
      count: messages.length,
    }))
    .filter(h => h.count > 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {histories.length === 0 ? (
          <Text style={styles.emptyText}>No chat history yet.</Text>
        ) : (
          histories.map(({ featureKey, featureName, lastMessage }, idx) => (
            <View key={featureKey} style={styles.historyCard}>
              <Text style={styles.featureName}>{featureName}</Text>
              {lastMessage && (
                <>
                  <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage.content}</Text>
                  <Text style={styles.timestamp}>{lastMessage.timestamp.toLocaleString()}</Text>
                </>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#222',
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
    marginRight: 40,
  },
  historyCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#fff2',
  },
  featureName: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    color: '#b0b0b0',
    fontSize: 15,
    marginBottom: 4,
  },
  timestamp: {
    color: '#888',
    fontSize: 13,
  },
  emptyText: {
    color: '#b0b0b0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 48,
  },
}); 