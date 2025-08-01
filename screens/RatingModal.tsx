import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const reviews = [
  {
    id: 1,
    name: "Adam A.",
    rating: 5,
    text: "This app is incredible! The AI insights have helped me make better decisions in my personal and professional life. Highly recommend!"
  },
  {
    id: 2,
    name: "Sarah M.",
    rating: 5,
    text: "Amazing technology! The personalized guidance has transformed how I approach challenges. This is exactly what I needed."
  },
  {
    id: 3,
    name: "Michael R.",
    rating: 5,
    text: "The best life coaching app I've ever used. The insights are spot-on and the interface is beautiful."
  },
  {
    id: 4,
    name: "Emma L.",
    rating: 5,
    text: "Incredible app! It's like having a personal life coach in my pocket. The advice is always relevant and helpful."
  }
];

export default function RatingModal() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [userRating, setUserRating] = useState(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleClose = () => {
    // Try to go back, if that fails, navigate to MainTabs
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const renderStars = (rating: number, interactive = false, size = 24) => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => interactive && handleRating(i + 1)}
        style={styles.starContainer}
      >
        <Ionicons
          name={i < rating ? "star" : "star-outline"}
          size={size}
          color="#F59E0B"
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User Reviews</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>Rate Your Experience</Text>
            <View style={styles.starsRow}>
              {renderStars(userRating, true, 32)}
            </View>
            {userRating > 0 && (
              <Text style={styles.ratingText}>Thank you for your {userRating}-star rating!</Text>
            )}
          </View>

          {/* App Recognition */}
          <View style={styles.appRecognition}>
            <View style={styles.laurelContainer}>
              <Ionicons name="trophy" size={40} color="#8B5CF6" />
              <Text style={styles.appTitle}>#1 Vita Life App</Text>
            </View>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <Text style={styles.lovedByText}>Loved by 1000+ people</Text>
            <View style={styles.avatarsRow}>
              {Array.from({ length: 5 }, (_, i) => (
                <View key={i} style={[styles.userAvatar, i === 4 && styles.zAvatar]}>
                  <Text style={[styles.avatarText, i === 4 && styles.zAvatarText]}>
                    {i === 4 ? 'Z' : String.fromCharCode(65 + i)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <Text style={styles.reviewsTitle}>What Our Users Say</Text>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <View style={styles.reviewStars}>
                    {renderStars(review.rating, false, 16)}
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  ratingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starContainer: {
    marginHorizontal: 4,
  },
  ratingText: {
    color: '#8B5CF6',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  appRecognition: {
    alignItems: 'center',
    marginVertical: 30,
  },
  laurelContainer: {
    alignItems: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  socialProof: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lovedByText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  zAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#8B5CF6',
  },
  zAvatarText: {
    fontSize: 18,
  },
  reviewsSection: {
    marginVertical: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
}); 