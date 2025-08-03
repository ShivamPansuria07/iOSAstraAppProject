import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

export default function PaywallScreen() {
  const navigation = useNavigation();

  const handleSkip = () => {
    Alert.alert(
      'Skip Paywall',
      'You can always upgrade to Premium later from the settings menu.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip for Now', 
          onPress: () => {
            // TODO: Add analytics tracking here
            // analytics.track("Paywall Skipped");
            navigation.navigate('AuthOnboarding');
          }
        }
      ]
    );
  };

  const handleRestorePurchases = () => {
    Alert.alert(
      'Restore Purchases',
      'This feature will be available soon. For now, please contact support if you need to restore a previous purchase.',
      [{ text: 'OK' }]
    );
  };

  const openPrivacyPolicy = () => {
    // TODO: Replace with actual privacy policy URL
    Linking.openURL('https://your-privacy-policy-url.com');
  };

  const openTermsOfService = () => {
    // TODO: Replace with actual terms of service URL
    Linking.openURL('https://your-terms-of-service-url.com');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Vita</Text>
            <Text style={styles.tagline}>Your Life's Compass</Text>
          </View>

          {/* Premium Benefits */}
          <View style={styles.benefitsSection}>
            <Text style={styles.premiumTitle}>Unlock Vita Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Get the most out of your life journey
            </Text>

            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.benefitText}>Unlimited AI conversations</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.benefitText}>Personalized life insights</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.benefitText}>Advanced goal tracking</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.benefitText}>Priority support</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.benefitText}>Exclusive content & features</Text>
              </View>
            </View>
          </View>

          {/* Subscription Buttons */}
          <View style={styles.subscriptionSection}>
            <TouchableOpacity
              style={[styles.subscriptionButton, styles.disabledButton]}
              disabled={true}
            >
              <Text style={styles.subscriptionButtonText}>Continue (Coming Soon)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.restoreButton}
              onPress={handleRestorePurchases}
            >
              <Text style={styles.restoreButtonText}>Restore Purchases</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Links */}
          <View style={styles.legalSection}>
            <TouchableOpacity onPress={openPrivacyPolicy} style={styles.legalLink}>
              <Text style={styles.legalLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openTermsOfService} style={styles.legalLink}>
              <Text style={styles.legalLinkText}>Terms of Service</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerSection}>
            <Text style={styles.disclaimerText}>
              We do not offer medical advice. All recommendations are suggestions only. Consult your doctor before making medical decisions.
            </Text>
          </View>

          {/* Subscription Info */}
          <View style={styles.subscriptionInfoSection}>
            <Text style={styles.subscriptionInfoText}>
              Subscription info: Payment will be charged to your App Store Account upon confirmation. Manage or cancel subscriptions in Account Settings, where cancellations remain active until the end of the billing period. Subscriptions auto-renew 24 hours before expiry; auto-renewal can be disabled anytime. Unused free trial portions are forfeited upon subscribing.
            </Text>
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
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
  },
  benefitsSection: {
    marginBottom: 40,
  },
  premiumTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#F8FAFC',
    flex: 1,
  },
  subscriptionSection: {
    marginBottom: 32,
    gap: 12,
  },
  subscriptionButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#374151',
    opacity: 0.6,
  },
  subscriptionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  restoreButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  restoreButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  legalSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  legalLink: {
    paddingVertical: 8,
  },
  legalLinkText: {
    color: '#64748B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  disclaimerSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  disclaimerText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  subscriptionInfoSection: {
    paddingHorizontal: 16,
  },
  subscriptionInfoText: {
    color: '#64748B',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
}); 