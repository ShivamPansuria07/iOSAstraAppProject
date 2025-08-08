import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';

/**
 * RevenueCat Paywall Demo Component
 * 
 * This component demonstrates how to use RevenueCat's built-in paywall UI.
 * To use this, you'll need to:
 * 1. Build a development build (not Expo Go)
 * 2. Configure RevenueCat dashboard
 * 3. Add subscription products
 * 
 * Usage:
 * import RevenueCatPaywallDemo from '../components/RevenueCatPaywallDemo';
 * 
 * <RevenueCatPaywallDemo />
 */

interface RevenueCatPaywallDemoProps {
  onPurchaseCompleted?: (customerInfo: any) => void;
  onDismiss?: () => void;
}

export default function RevenueCatPaywallDemo({ 
  onPurchaseCompleted, 
  onDismiss 
}: RevenueCatPaywallDemoProps) {
  const [isLoading, setIsLoading] = useState(false);

  const showRevenueCatPaywall = () => {
    setIsLoading(true);
    
    // This is a placeholder for the actual RevenueCat paywall
    // In a real implementation, you would use:
    // import PurchasesPaywall from 'react-native-purchases-ui';
    
    Alert.alert(
      'RevenueCat Paywall Demo',
      'This would show the actual RevenueCat paywall UI.\n\n' +
      'To see the real paywall:\n' +
      '1. Build development build: eas build --platform ios --profile ios-simulator\n' +
      '2. Configure RevenueCat dashboard\n' +
      '3. Add subscription products\n' +
      '4. Use PurchasesPaywall component',
      [
        { 
          text: 'Cancel', 
          onPress: () => {
            setIsLoading(false);
            onDismiss?.();
          }
        },
        {
          text: 'Simulate Purchase',
          onPress: () => {
            setIsLoading(false);
            // Simulate successful purchase
            const mockCustomerInfo = {
              entitlements: {
                active: {
                  premium: {
                    identifier: 'premium',
                    isActive: true,
                    willRenew: true,
                    periodType: 'normal',
                    latestPurchaseDate: new Date().toISOString(),
                    originalPurchaseDate: new Date().toISOString(),
                    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    store: 'app_store',
                    productIdentifier: 'premium_monthly'
                  }
                }
              }
            };
            onPurchaseCompleted?.(mockCustomerInfo);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RevenueCat Paywall Demo</Text>
      <Text style={styles.description}>
        This demonstrates how to integrate RevenueCat's built-in paywall UI.
      </Text>
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={showRevenueCatPaywall}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Show RevenueCat Paywall'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What you can test now:</Text>
        <Text style={styles.infoText}>• Subscription status checking</Text>
        <Text style={styles.infoText}>• Customer info retrieval</Text>
        <Text style={styles.infoText}>• Restore purchases</Text>
        <Text style={styles.infoText}>• Error handling</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>To see the actual paywall UI:</Text>
        <Text style={styles.infoText}>• Build development build</Text>
        <Text style={styles.infoText}>• Configure RevenueCat dashboard</Text>
        <Text style={styles.infoText}>• Add subscription products</Text>
        <Text style={styles.infoText}>• Test on device/simulator</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
    paddingLeft: 8,
  },
}); 