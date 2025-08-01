import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { colors } from './theme';
import MainTabNavigator from './navigation/MainTabNavigator';
import SplashScreen from './screens/SplashScreen';
import ChatScreen from './screens/ChatScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import supabase from './services/supabase';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RatingModal from './screens/RatingModal';
import AuthOnboardingScreen from './screens/AuthOnboardingScreen';
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

// Global dev mode flag and setter
(global as any).DEV_MODE = false;
(global as any).SET_DEV_MODE = null;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [devMode, setDevMode] = useState(false);

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
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Handle deep links for OAuth
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log('Deep link received:', url);
      // Supabase will handle the OAuth callback automatically
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

  useEffect(() => {
    // Simple fetch test
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(data => console.log('Fetch test success:', data))
      .catch(err => console.log('Fetch test error:', err));
  }, []);

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
        ) : (
          <>
            <Stack.Screen name="AuthOnboarding" component={AuthOnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
