import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import supabase from './supabase';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

export class AuthService {
  // Google Sign In
  static async signInWithGoogle() {
    try {
      console.log('Starting Google sign-in...');
      
      // Use Supabase's OAuth flow directly
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://mulfhgmihtxskyggfvix.supabase.co/auth/v1/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      console.log('OAuth response:', { data, error });

      if (error) {
        console.error('Supabase OAuth error:', error);
        throw error;
      }

      // Check if we have a URL to redirect to
      if (data?.url) {
        console.log('Redirecting to:', data.url);
        
        // Open the OAuth URL in browser
        await Linking.openURL(data.url);
        console.log('Opened OAuth URL in browser');
        
        // For Expo Go, we'll need to manually check for session after OAuth
        // The user will need to return to the app manually
        return { success: true, data: { url: data.url, needsManualReturn: true } };
      } else {
        console.log('No redirect URL received');
        return { success: false, error: 'No redirect URL received' };
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    }
  }

  // Apple Sign In
  static async signInWithApple() {
    try {
      // Use Supabase's OAuth flow directly
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'vita://auth/callback',
        },
      });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Apple sign-in error:', error);
      return { success: false, error: error.message };
    }
  }

  // Email/Password Sign Up
  static async signUpWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Email sign-up error:', error);
      return { success: false, error: error.message };
    }
  }

  // Email/Password Sign In
  static async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Email sign-in error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign Out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return { success: true, user };
    } catch (error) {
      console.error('Get user error:', error);
      return { success: false, error: error.message };
    }
  }
} 