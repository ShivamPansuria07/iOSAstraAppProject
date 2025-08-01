import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const features = [
  { id: 1, key: 'ask', title: 'Life Guidance', emoji: '✨', gradient: ['#8B5CF6', '#7C3AED'] },
  { id: 2, key: 'horoscope', title: 'Daily Insights', emoji: '🔮', gradient: ['#EC4899', '#BE185D'] },
  { id: 3, key: 'romantic', title: 'Love & Relationships', emoji: '💕', gradient: ['#F59E0B', '#D97706'] },
  { id: 4, key: 'soulmate', title: 'Soul Connections', emoji: '💫', gradient: ['#06B6D4', '#0891B2'] },
  { id: 5, key: 'friend', title: 'Friendship Harmony', emoji: '🤝', gradient: ['#10B981', '#059669'] },
  { id: 6, key: 'dream', title: 'Dream Analysis', emoji: '🌙', gradient: ['#6366F1', '#4F46E5'] },
  { id: 7, key: 'astro', title: 'Cosmic Events', emoji: '⭐', gradient: ['#F97316', '#EA580C'] },
  { id: 8, key: 'tarot', title: 'Tarot Wisdom', emoji: '🎴', gradient: ['#8B5CF6', '#7C3AED'] },
  { id: 9, key: 'growth', title: 'Personal Evolution', emoji: '🚀', gradient: ['#84CC16', '#65A30D'] },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 60, 160],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('History')}>
            <Ionicons name="time-outline" size={28} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RatingModal')}>
            <Ionicons name="star" size={28} color="#8B5CF6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="ellipsis-horizontal" size={28} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <Animated.View style={[styles.logoBlock, { opacity: logoOpacity }]} pointerEvents="none">
          <Text style={[styles.cosmicElement, styles.cosmic3]}>⭐</Text>
          <Text style={styles.logoText}>Vita</Text>
          <Text style={styles.tagline}>Your Life's Compass</Text>
          <Text style={[styles.cosmicElement, styles.cosmic1]}>✨</Text>
          <Text style={[styles.cosmicElement, styles.cosmic2]}>💫</Text>
        </Animated.View>

        {/* Features Grid */}
        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Chat', { feature: feature.key })}
              >
                <LinearGradient
                  colors={feature.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardEmoji}>{feature.emoji}</Text>
                  <Text style={styles.cardTitle}>{feature.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    zIndex: 2,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  logoBlock: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
    height: 80,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: width * 0.16,
    fontFamily: 'PlayfairDisplay-Italic-VariableFont',
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(139, 92, 246, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
    zIndex: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#F59E0B',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 1,
  },
  cosmicElement: {
    position: 'absolute',
    fontSize: 20,
    opacity: 0.9,
  },
  cosmic1: { left: '15%', top: 8, color: '#F59E0B', fontSize: 22 },
  cosmic2: { right: '15%', top: 8, color: '#EC4899', fontSize: 22 },
  cosmic3: { left: '65%', top: -15, fontSize: 28, color: '#F97316', zIndex: -1 },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 200,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: (width - 44) / 2,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 32,
  },
  cardTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: 8,
  },
}); 