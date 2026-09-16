#!/usr/bin/env node

// Helper script to generate OAuth redirect URLs for configuration
// Run with: node scripts/get-oauth-urls.js

// Simulate the environment detection (this would normally come from the app)
const isDevelopment = process.env.NODE_ENV !== 'production';

const getCurrentExpoUrl = () => {
  // In a real app, this would come from Constants.expoConfig?.hostUri
  // For this script, we'll use a placeholder that you should update
  return 'exp://127.0.0.1:8081'; // UPDATE THIS WITH YOUR ACTUAL EXPO GO URL
};

const getSupabaseSiteUrl = () => {
  if (isDevelopment) {
    return getCurrentExpoUrl();
  } else {
    return 'vita://auth/callback';
  }
};

console.log('=== OAuth Redirect URLs for Configuration ===\n');

const currentSiteUrl = getSupabaseSiteUrl();
const isDev = isDevelopment;

console.log(`🔧 Current Environment: ${isDev ? 'Development' : 'Production'}`);
console.log(`🔧 Current Site URL: ${currentSiteUrl}\n`);

console.log('🔧 For Supabase Configuration:');
console.log(`Site URL: ${currentSiteUrl}`);
console.log('Redirect URLs (add both):');
console.log(`  - ${currentSiteUrl} (current environment)`);
console.log('  - vita://auth/callback (for production)\n');

console.log('🔧 For Google Cloud Console:');
console.log('Add these URLs to "Authorized redirect URIs":');
console.log('  - https://YOUR_PROJECT.supabase.co/auth/v1/callback');

console.log('\n📝 Instructions:');
console.log('1. Copy these URLs to your Supabase and Google Cloud Console configurations');
console.log('2. Google OAuth requires valid top-level domains, so we use Supabase callback URL');
console.log('3. Supabase will handle the OAuth flow and redirect back to your app');
console.log('4. The app will automatically detect development vs production environment');
console.log('5. For development, update the Expo Go URL in this script if your IP/port changes');
console.log('6. For production, the app will use "vita://auth/callback" automatically');
console.log('\n⚠️  IMPORTANT: Update the getCurrentExpoUrl() function in this script with your actual Expo Go URL!'); 