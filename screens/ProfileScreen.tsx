import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, TextInput, Alert, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../services/supabase';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, borderRadius, shadows } from '../theme';

const { width } = Dimensions.get('window');

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const zodiacEmojis: { [key: string]: string } = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Shivam Pansuria');
  const [email, setEmail] = useState('shivam.pansuria@gmail.com');
  const [zodiac, setZodiac] = useState('Aquarius');
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editZodiac, setEditZodiac] = useState(zodiac);
  const navigation = useNavigation();

  const handleSave = () => {
    setName(editName);
    setEmail(editEmail);
    setZodiac(editZodiac);
    setModalVisible(false);
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
        await supabase.auth.signOut();
      } },
    ]);
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
          const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
          if (user) {
            await supabase.auth.signOut();
            Alert.alert('Account deleted (demo)', 'In production, call a backend function to delete the user.');
          } else {
            Alert.alert('Error', 'Could not get user info.');
          }
        } },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.profileTitle}>Profile</Text>
          <Text style={styles.profileSubtitle}>Your Cosmic Journey</Text>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCardGradient}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[colors.accent, colors.accentLight]}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatar}>✨</Text>
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
              <View style={styles.zodiacContainer}>
                <Text style={styles.zodiacEmoji}>{zodiacEmojis[zodiac]}</Text>
                <Text style={styles.zodiac}>{zodiac}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => {
                setEditName(name); 
                setEditEmail(email); 
                setEditZodiac(zodiac); 
                setModalVisible(true);
              }}
            >
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>



        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingOption} onPress={handleSignOut}>
            <Text style={styles.settingText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={handleDeleteAccount}>
            <Text style={[styles.settingText, { color: '#EF4444' }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Vita v1.0.0</Text>
          <Text style={styles.appDescription}>
            Your AI-powered life advisor for personalized guidance and insights.
          </Text>
        </View>

        {/* Edit Profile Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <LinearGradient
                colors={[colors.surface, colors.card]}
                style={styles.modalGradient}
              >
                <Text style={styles.modalTitle}>Edit Profile</Text>
                
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Name"
                  placeholderTextColor={colors.textMuted}
                />
                
                <TextInput
                  style={styles.input}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Email"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                
                <Text style={styles.label}>Zodiac Sign</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.zodiacScroll}
                  contentContainerStyle={styles.zodiacScrollContainer}
                >
                  {zodiacSigns.map(sign => (
                    <TouchableOpacity
                      key={sign}
                      style={[
                        styles.zodiacChip, 
                        editZodiac === sign && styles.zodiacChipSelected
                      ]}
                      onPress={() => setEditZodiac(sign)}
                    >
                      <Text style={styles.zodiacChipEmoji}>{zodiacEmojis[sign]}</Text>
                      <Text style={[
                        styles.zodiacChipText, 
                        editZodiac === sign && styles.zodiacChipTextSelected
                      ]}>
                        {sign}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <LinearGradient
                      colors={['#8B5CF6', '#7C3AED']}
                      style={styles.saveButtonGradient}
                    >
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </LinearGradient>
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
    paddingHorizontal: 18,
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#b0b0b0',
  },
  profileCardGradient: {
    borderRadius: 18,
    marginBottom: 18,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  avatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 2,
  },
  zodiacContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zodiacEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  zodiac: {
    color: 'white',
    fontSize: 15,
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: '#fff2',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 12,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },

  settingsSection: {
    marginTop: 18,
    marginBottom: 18,
  },

  settingOption: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
  },
  appVersion: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  appDescription: {
    color: '#b0b0b0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0F0F23',
    borderRadius: 18,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  modalGradient: {
    borderRadius: 18,
    padding: 24,
    width: '100%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  label: {
    color: '#b0b0b0',
    fontSize: 15,
    marginBottom: 6,
  },
  zodiacScroll: {
    marginBottom: 16,
  },
  zodiacScrollContainer: {
    flexDirection: 'row',
  },
  zodiacChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  zodiacChipSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  zodiacChipEmoji: {
    fontSize: 15,
    marginRight: 4,
  },
  zodiacChipText: {
    color: '#fff',
    fontSize: 15,
  },
  zodiacChipTextSelected: {
    color: 'white',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  saveButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  saveButtonGradient: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cancelButtonText: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 