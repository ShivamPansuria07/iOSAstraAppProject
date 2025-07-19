import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './theme';
import MainTabNavigator from './navigation/MainTabNavigator';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.background} />
      <MainTabNavigator />
    </NavigationContainer>
  );
}
