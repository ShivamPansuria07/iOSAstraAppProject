import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { colors } from './theme';
import MainTabNavigator from './navigation/MainTabNavigator';
import SplashScreen from './screens/SplashScreen';
import PaywallScreen from './screens/PaywallScreen';
import ChatScreen from './screens/ChatScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import supabase from './services/supabase';
import { AuthService } from './services/auth';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RatingModal from './screens/RatingModal';
import AuthOnboardingScreen from './screens/AuthOnboardingScreen';
import * as Linking from 'expo-linking';
import Purchases from 'react-native-purchases';

const Stack = createNativeStackNavigator();

// Global dev mode flag and setter
(global as any).DEV_MODE = false;
(global as any).SET_DEV_MODE = null;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [devMode, setDevMode] = useState(false);
  const [paywallShown, setPaywallShown] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-VariableFont': require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    'PlayfairDisplay-Italic-VariableFont': require('./assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
    'JetBrainsMono-VariableFont': require('./assets/fonts/JetBrainsMono-VariableFont_wght.ttf'),
    'JetBrainsMono-Italic-VariableFont': require('./assets/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf'),
  });

  // Set up the global setter to update React state
  (global as any).SET_DEV_MODE = setDevMode;

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Initialize RevenueCat
    const initializeRevenueCat = async () => {
      try {
        await Purchases.configure({
          apiKey: 'appl_hUpckXhQcXICpipFnPVmyNTQwXO', // iOS API key
          appUserID: null, // Will be set when user logs in
        });
        console.log('RevenueCat initialized successfully');
      } catch (error) {
        console.error('Error initializing RevenueCat:', error);
      }
    };

    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('Initial session check:', data.session);
      setSession(data.session);
      setIsLoading(false);
    };

    // Initialize both RevenueCat and get session
    initializeRevenueCat();
    getSession();
    
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
    });
    
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Handle deep links for OAuth
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      console.log('Deep link received:', url);
      
      // Check if this is an OAuth callback with tokens
      const hasOAuthTokens = url.includes('access_token=') || url.includes('refresh_token=');
      
      if (hasOAuthTokens) {
        console.log('OAuth callback detected, processing...');
        
        // Manually parse the OAuth tokens from the URL
        try {
          const urlObj = new URL(url);
          const fragment = urlObj.hash.substring(1); // Remove the # symbol
          const params = new URLSearchParams(fragment);
          
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('Setting session from OAuth tokens...');
            
            // Set the session manually
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) {
              console.error('Error setting session from tokens:', error);
            } else {
              console.log('Session set successfully from OAuth tokens');
              setSession(data.session);
              return; // Exit early since we set the session
            }
          }
        } catch (e) {
          console.error('Error parsing OAuth tokens from URL:', e);
        }
      }
      
      // Fallback: Force a session refresh
      const result = await AuthService.refreshSession();
      if (result.success && result.session) {
        setSession(result.session);
      }
    };

    // Listen for incoming links
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  // Session monitoring
  useEffect(() => {
    let isActive = true;
    
    const checkSessionPeriodically = async () => {
      if (!isActive) return;
      
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session && !session) {
          setSession(data.session);
        } else if (!data.session && session) {
          setSession(null);
        }
      } catch (error) {
        console.log('Session check error:', error);
      }
    };

    // Check every 2 seconds for the first 30 seconds after app loads
    const interval = setInterval(checkSessionPeriodically, 2000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 30000);

    return () => {
      isActive = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [session]);

  if (isLoading || !fontsLoaded) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session || devMode ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="RatingModal" component={RatingModal} />
          </>
        ) : paywallShown ? (
          <>
            <Stack.Screen name="AuthOnboarding" component={AuthOnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Paywall" 
              component={(props: any) => (
                <PaywallScreen 
                  {...props} 
                  onPaywallSkipped={() => setPaywallShown(true)}
                />
              )}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="AuthOnboarding" component={AuthOnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
