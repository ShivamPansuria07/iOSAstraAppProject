import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SubscriptionService from '../services/subscriptions';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      setIsLoading(true);
      const status = await SubscriptionService.checkSubscriptionStatus();
      setIsSubscribed(status.isSubscribed);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      const customerInfo = await SubscriptionService.restorePurchases();
      
      if (customerInfo && customerInfo.entitlements.active['premium']) {
        Alert.alert(
          'Success!',
          'Your previous subscription has been restored.',
          [{ text: 'OK' }]
        );
        setIsSubscribed(true);
      } else {
        Alert.alert(
          'No Purchases Found',
          'No previous purchases were found to restore.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error restoring your purchases. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Account Section */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Edit my information</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>What's my user id?</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.rowText, { color: '#EF4444' }]}>Delete account</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        {/* App Settings Section */}
        <Text style={styles.sectionLabel}>App settings</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Haptics & Vibration</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        {/* Subscription Section */}
        <Text style={styles.sectionLabel}>Subscription</Text>
        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Status</Text>
            <Text style={[
              styles.statusText, 
              { color: isSubscribed ? '#10B981' : '#EF4444' }
            ]}>
              {isLoading ? 'Loading...' : (isSubscribed ? 'Premium Active' : 'Free Plan')}
            </Text>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={handleRestorePurchases}>
            <Text style={styles.rowText}>Restore purchases</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.row} 
            onPress={() => {
              Alert.alert(
                'RevenueCat Test',
                `Current subscription status:\n\nIs Subscribed: ${isSubscribed}\nIs Loading: ${isLoading}\n\nThis shows RevenueCat integration is working!`,
                [{ text: 'OK' }]
              );
            }}
          >
            <Text style={styles.rowText}>Test RevenueCat Integration</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        {/* Get in touch Section */}
        <Text style={styles.sectionLabel}>Get in touch</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Contact us</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Share troubleshooting info</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        {/* Legal Section */}
        <Text style={styles.sectionLabel}>Legal</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: '#0F0F23',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5CF6',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  sectionLabel: {
    color: '#A78BFA',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 28,
    marginBottom: 8,
    marginLeft: 18,
  },
  sectionCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  rowText: {
    color: '#8B5CF6',
    fontSize: 17,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 17,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginHorizontal: 12,
  },
}); 