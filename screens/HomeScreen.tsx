import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors, spacing, borderRadius } from '../theme';

const features = [
  { id: 1, key: 'ask', title: 'Ask me anything', emoji: '🎱', gradient: ['#7F00FF', '#E100FF'] },
  { id: 2, key: 'horoscope', title: 'Daily horoscope', emoji: '🔮', gradient: ['#43E97B', '#38F9D7'] },
  { id: 3, key: 'romantic', title: 'Romantic compatibility', emoji: '🌹', gradient: ['#FF5858', '#FBCA1F'] },
  { id: 4, key: 'soulmate', title: 'Your soulmate', emoji: '🧷', gradient: ['#FF512F', '#F09819'] },
  { id: 5, key: 'friend', title: 'Friend compatibility', emoji: '🤝', gradient: ['#36D1C4', '#1EAAF1'] },
  { id: 6, key: 'dream', title: 'Dream interpreter', emoji: '💭', gradient: ['#F7971E', '#FFD200'] },
  { id: 7, key: 'astro', title: 'Astrological events', emoji: '🌟', gradient: ['#43C6AC', '#191654'] },
  { id: 8, key: 'tarot', title: 'Tarot card interpreter', emoji: '🌞', gradient: ['#F7971E', '#FFD200'] },
  { id: 9, key: 'growth', title: 'Personal growth tips', emoji: '📈', gradient: ['#11998E', '#38EF7D'] },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top bar with history and menu icons */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="time-outline" size={32} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={32} color="white" />
          </TouchableOpacity>
        </View>
        {/* Astra title with sparkles */}
        <View style={styles.titleContainer}>
          <Text style={styles.astraTitle}>Astra</Text>
          <Text style={styles.sparkles}>⋆     ⋆  ✦   ⋆</Text>
        </View>
        {/* Feature list */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {features.map((feature, idx) => (
            <LinearGradient
              key={feature.id}
              colors={feature.gradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
            >
              <TouchableOpacity 
                style={styles.featureCard} 
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Chat', { feature: feature.key })}
              >
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>{feature.emoji}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 8,
  },
  iconButton: {
    padding: 4,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  astraTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 2,
  },
  sparkles: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 6,
    marginTop: -8,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
  },
  cardGradient: {
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 18,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  emoji: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
}); 