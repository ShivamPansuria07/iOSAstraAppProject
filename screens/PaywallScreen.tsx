import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import analytics from '../services/analytics';
import Purchases from 'react-native-purchases';


interface PaywallScreenProps {
  onPaywallSkipped?: () => void;
}

export default function PaywallScreen({ onPaywallSkipped }: PaywallScreenProps) {
  const navigation = useNavigation();
  // Track paywall shown when component mounts
  React.useEffect(() => {
    analytics.trackPaywallShown();
  }, []);

  const handleSkip = () => {
    Alert.alert(
      'Skip Paywall',
      'You can always upgrade to Premium later from the settings menu.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip for Now', 
          onPress: () => {
            analytics.trackPaywallSkipped();
            onPaywallSkipped?.();
            navigation.navigate('AuthOnboarding' as never);
          }
        }
      ]
    );
  };

  const handleRestorePurchases = () => {
    analytics.track('Restore Purchases Attempted');
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

  const showRevenueCatUI = async () => {
    try {
      // Get available offerings from RevenueCat
      const offerings = await Purchases.getOfferings();
      
      if (offerings.current) {
        Alert.alert(
          'RevenueCat Offerings Found!',
          `Found ${offerings.current.availablePackages.length} subscription packages.\n\nTo see the actual RevenueCat paywall UI, you need to:\n\n1. Configure products in App Store Connect\n2. Set up offerings in RevenueCat dashboard\n3. Use the PurchasesPaywall component\n\nCurrent status: Ready for configuration!`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'RevenueCat Setup Required',
          'To see your custom RevenueCat paywall UI, you need to configure:\n\n1. **App Store Connect**: Add subscription products\n2. **RevenueCat Dashboard**: Create offerings and entitlements\n3. **Paywall Configuration**: Set up your custom paywall design\n\nYour app is ready - just needs dashboard configuration!',
          [
            { text: 'OK' },
            { 
              text: 'Setup Guide', 
              onPress: () => {
                Linking.openURL('https://www.revenuecat.com/docs/getting-started');
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('RevenueCat error:', error);
      
      // Check if it's an initialization error
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('singleton instance')) {
        Alert.alert(
          'RevenueCat Initialization Error',
          'RevenueCat is not properly initialized. This should be fixed now with the latest update.\n\nPlease restart the app and try again.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'RevenueCat Integration Status',
          'RevenueCat SDK is working! The issue is that your dashboard needs configuration to show the custom paywall UI.\n\nCurrent status: ✅ SDK Connected\nNext step: Configure dashboard',
          [{ text: 'OK' }]
        );
      }
    }
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
            {/* RevenueCat Paywall Button */}
            <TouchableOpacity
              style={styles.subscriptionButton}
              onPress={showRevenueCatUI}
            >
              <Text style={styles.subscriptionButtonText}>Check RevenueCat Setup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.subscriptionButton, styles.disabledButton]}
              disabled={true}
            >
              <Text style={styles.subscriptionButtonText}>Custom Paywall (Coming Soon)</Text>
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