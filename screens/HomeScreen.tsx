import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '../theme';

const { width } = Dimensions.get('window');
//scientia -> knowledge in latin
const features = [
  { id: 1, key: 'ask', title: 'Ask me anything', emoji: '🎱', gradient: ['#7F00FF', '#E100FF'] },
  { id: 2, key: 'horoscope', title: 'Daily horoscope', emoji: '🔮', gradient: ['#43E97B', '#38F9D7'] },
  { id: 3, key: 'romantic', title: 'Romantic compatibility', emoji: '🌹', gradient: ['#FF5858', '#FBCA1F'] },
  { id: 4, key: 'soulmate', title: 'Your soulmate', emoji: '🧷', gradient: ['#FF512F', '#F09819'] },
  { id: 5, key: 'friend', title: 'Friend compatibility', emoji: '🤝', gradient: ['#36D1C4', '#1EAAF1'] },
  { id: 6, key: 'dream', title: 'Dream interpreter', emoji: '💭', gradient: ['#F7971E', '#FFD200'] },
  { id: 7, key: 'astro', title: 'Astrological events', emoji: '🌟', gradient: ['#43C6AC', '#191654'] },
  { id: 8, key: 'tarot', title: 'Tarot card interpreter', emoji: '🌞', gradient: ['#a18cd1', '#fbc2eb'] },
  { id: 9, key: 'growth', title: 'Personal growth tips', emoji: '📈', gradient: ['#43cea2', '#185a9d'] },
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
        {/* Top bar with history and menu icons */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('History')}>
            <Ionicons name="time-outline" size={32} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="ellipsis-horizontal" size={32} color="white" />
          </TouchableOpacity>
        </View>
        {/* Astra logo and sparkles, styled and positioned to match screenshot */}
        <Animated.View style={[styles.logoBlock, { opacity: logoOpacity }]} pointerEvents="none">
          <Text style={styles.logoText}>Astra</Text>
          <Text style={[styles.sparkle, styles.sparkle1]}>⋆</Text>
          <Text style={[styles.sparkle, styles.sparkle2]}>⋆</Text>
          <Text style={[styles.sparkle, styles.sparkle3]}>✦</Text>
          <Text style={[styles.sparkle, styles.sparkle4]}>⋆</Text>
          <Text style={[styles.sparkle, styles.sparkle5]}>⋆</Text>
        </Animated.View>
        {/* Feature list */}
        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 190 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {features.map((feature, idx) => (
            <View key={feature.id} style={styles.featureRowWrap}>
              <TouchableOpacity
                style={styles.featureRow}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Chat', { feature: feature.key })}
              >
                <LinearGradient
                  colors={feature.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.iconLabelCard}
                >
                  <View style={styles.iconSection}>
                    <Text style={styles.emoji}>{feature.emoji}</Text>
                  </View>
                  <View style={styles.labelSection}>
                    <Text style={styles.labelText}>{feature.title}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const CARD_HEIGHT = 68;
const ICON_WIDTH = 68;

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
    zIndex: 2,
  },
  iconButton: {
    padding: 4,
  },
  logoBlock: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
    height: 90,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: width * 0.18,
    fontFamily: 'PlayfairDisplay-Italic-VariableFont', // Use your custom font name here
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  sparkle: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    opacity: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  sparkle1: { left: '10%', top: 10 },
  sparkle2: { right: '10%', top: 10 },
  sparkle3: { left: '48%', top: 0, fontSize: 28 },
  sparkle4: { left: '20%', bottom: 0 },
  sparkle5: { right: '20%', bottom: 0 },
  scrollView: {
    flex: 1,
    paddingHorizontal: 0,
    zIndex: 1,
  },
  featureRowWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  featureRow: {
    width: width - 32,
    alignSelf: 'center',
    height: CARD_HEIGHT,
    borderRadius: CARD_HEIGHT / 2,
    overflow: 'hidden',
  },
  iconLabelCard: {
    flexDirection: 'row',
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: CARD_HEIGHT / 2,
    overflow: 'hidden',
  },
  iconSection: {
    width: ICON_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  labelSection: {
    flex: 1,
    height: CARD_HEIGHT,
    backgroundColor: '#232323',
    justifyContent: 'center',
    paddingLeft: 18,
  },
  labelText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
}); 