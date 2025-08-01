import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Discover Your Path",
    subtitle: "Unlock personalized insights and cosmic guidance for your life journey",
    icon: "✨",
    gradient: ['#8B5CF6', '#7C3AED'],
    testimonial: {
      name: "Sarah M.",
      text: "Vita has completely transformed how I approach life decisions. The cosmic insights are incredibly accurate!",
      rating: 5
    }
  },
  {
    id: 2,
    title: "Cosmic Intelligence",
    subtitle: "AI-powered guidance aligned with celestial energies and your unique path",
    icon: "🔮",
    gradient: ['#F59E0B', '#FBBF24'],
    testimonial: {
      name: "Michael R.",
      text: "The cosmic recommendations are spot-on. I've improved my relationships and life choices significantly.",
      rating: 5
    }
  },
  {
    id: 3,
    title: "Your Life's Compass",
    subtitle: "Navigate life's challenges with cosmic wisdom and inner clarity",
    icon: "💫",
    gradient: ['#EC4899', '#F472B6'],
    testimonial: {
      name: "Emma L.",
      text: "Finally, an app that understands my cosmic journey and provides genuinely transformative guidance!",
      rating: 5
    }
  }
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true
      });
    } else {
      // Navigate to auth onboarding
      navigation.navigate('AuthOnboarding');
    }
  };

  const handleSkip = () => {
    navigation.navigate('AuthOnboarding');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={16}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={onboardingData[currentIndex].gradient}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
          scrollEventThrottle={16}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <View style={styles.content}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                {/* Title and Subtitle */}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>

                {/* Social Proof */}
                <View style={styles.socialProof}>
                  <View style={styles.userAvatars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <View key={i} style={[styles.avatar, { left: i * 15 }]}>
                        <Text style={styles.avatarText}>
                          {String.fromCharCode(65 + i)}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.userCount}>2,500+ users trust Vita</Text>
                </View>

                {/* Testimonial Card */}
                <View style={styles.testimonialCard}>
                  <View style={styles.testimonialHeader}>
                    <View style={styles.testimonialAvatar}>
                      <Text style={styles.testimonialAvatarText}>
                        {item.testimonial.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.testimonialInfo}>
                      <Text style={styles.testimonialName}>{item.testimonial.name}</Text>
                      <View style={styles.starsContainer}>
                        {renderStars(item.testimonial.rating)}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.testimonialText}>"{item.testimonial.text}"</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot
                ]}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.gradientButton}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width,
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  socialProof: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userAvatars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userCount: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  testimonialCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    backdropFilter: 'blur(10px)',
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  testimonialAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  testimonialText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 24,
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
}); 