import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../services/auth';
import supabase from '../services/supabase';

const { width, height } = Dimensions.get('window');

export default function AuthOnboardingScreen() {
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthOnboarding: Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('AuthOnboarding: User signed in - app will automatically switch to authenticated stack');
        // Don't navigate manually - let the app's session state handle it
      }
    });

    return () => subscription.unsubscribe();
  }, [navigation]);

  const handleGoogleSignIn = async () => {
    setSocialLoading(true);
    try {
      console.log('AuthOnboarding: Starting Google sign-in...');
      const result = await AuthService.signInWithGoogle();
      console.log('AuthOnboarding: Google sign-in result:', result);
      
      if (result.success) {
        console.log('AuthOnboarding: OAuth URL opened, waiting for redirect...');
        
        Alert.alert(
          'Sign In Started', 
          'Please complete the Google sign-in in your browser, then tap "Check Status" to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Check Status',
              onPress: async () => {
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  if (sessionData.session) {
                    console.log('Session found after OAuth - app will automatically switch');
                    // Don't navigate manually - let the app's session state handle it
                  } else {
                    Alert.alert(
                      'Not Signed In',
                      'Please complete the Google sign-in in your browser first, then try again.',
                      [{ text: 'OK' }]
                    );
                  }
                } catch (error) {
                  console.log('Error checking session:', error);
                  Alert.alert('Error', 'Failed to check sign-in status');
                }
              }
            }
          ]
        );
      } else {
        console.log('AuthOnboarding: Sign-in failed:', result.error);
        Alert.alert('Error', result.error || 'Google sign-in failed');
      }
    } catch (error) {
      console.log('AuthOnboarding: Sign-in exception:', error);
      Alert.alert('Error', 'Google sign-in failed');
    } finally {
      setSocialLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setSocialLoading(true);
    try {
      const result = await AuthService.signInWithApple();
      if (result.success) {
        // Don't navigate manually - let the app's session state handle it
        console.log('Apple sign-in successful - app will automatically switch');
      } else {
        Alert.alert('Error', result.error || 'Apple sign-in failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Apple sign-in failed');
    } finally {
      setSocialLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = isSignUp 
        ? await AuthService.signUpWithEmail(email, password)
        : await AuthService.signInWithEmail(email, password);

      if (result.success) {
        if (isSignUp) {
          Alert.alert('Success', 'Account created! Please check your email to verify your account.');
        } else {
          // Don't navigate manually - let the app's session state handle it
          console.log('Email sign-in successful - app will automatically switch');
        }
      } else {
        Alert.alert('Error', result.error || 'Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
              <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.background}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Vita</Text>
          <Text style={styles.tagline}>Your Life's Compass</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Social Sign In Buttons */}
          <View style={styles.socialSection}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
              disabled={socialLoading}
            >
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text style={styles.socialButtonText}>
                {socialLoading ? 'Signing in...' : 'Continue with Google'}
              </Text>
              {socialLoading && <ActivityIndicator size="small" color="#4285F4" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleSignIn}
              disabled={socialLoading}
            >
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text style={styles.socialButtonText}>
                {socialLoading ? 'Signing in...' : 'Continue with Apple'}
              </Text>
              {socialLoading && <ActivityIndicator size="small" color="#000" />}
            </TouchableOpacity>
          </View>

          {/* Dev Sign In Button */}
          <View style={styles.devSection}>
            <TouchableOpacity
              style={styles.devButton}
              onPress={async () => {
                try {
                  // Set dev mode using the global setter to trigger React re-render
                  (global as any).SET_DEV_MODE(true);
                  
                  console.log('Dev mode activated - bypassing authentication');
                  Alert.alert('Dev Mode', 'Dev mode activated! Welcome to development mode!');
                  
                } catch (error) {
                  console.log('Dev sign-in error:', error);
                  // Even if there's an error, set dev mode to bypass auth
                  (global as any).SET_DEV_MODE(true);
                  Alert.alert('Dev Mode', 'Dev mode activated! Welcome to development mode!');
                }
              }}
            >
              <Ionicons name="code-slash" size={20} color="#000000" />
              <Text style={styles.devButtonText}>dev mode</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email/Password Form */}
          <View style={styles.formSection}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity
              style={styles.authButton}
              onPress={handleEmailAuth}
              disabled={loading}
            >
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.gradientButton}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Toggle Sign Up/Sign In */}
          <View style={styles.toggleSection}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.toggleButton}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Manual Check Button */}
          <View style={styles.manualCheckSection}>
            <TouchableOpacity
              style={styles.manualCheckButton}
              onPress={async () => {
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  console.log('Manual check: Session data:', sessionData);
                  
                  if (sessionData.session) {
                    console.log('Manual check: Session found');
                    console.log('User email:', sessionData.session.user.email);
                    Alert.alert(
                      'Signed In!', 
                      `Welcome ${sessionData.session.user.email}! The app will automatically switch to the main screen.`,
                      [{ text: 'OK' }]
                    );
                  } else {
                    Alert.alert('Not Signed In', 'No active session found. Please complete the Google sign-in process.');
                  }
                } catch (error) {
                  console.log('Manual check error:', error);
                  Alert.alert('Error', 'Failed to check session: ' + error.message);
                }
              }}
            >
              <Text style={styles.manualCheckText}>Check Sign-In Status</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  socialSection: {
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  socialButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    textAlign: 'center',
  },
  devSection: {
    marginBottom: 16,
  },
  devButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#059669',
  },
  devButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },
  dividerText: {
    color: '#94A3B8',
    fontSize: 14,
    marginHorizontal: 16,
  },
  formSection: {
    marginBottom: 28,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    color: '#F8FAFC',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#374151',
  },
  authButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 6,
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  authButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  toggleButton: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  manualCheckSection: {
    marginTop: 16,
    alignItems: 'center',
  },
  manualCheckButton: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  manualCheckText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
}); 