// OAuth Configuration
// Replace these with your actual client IDs from Google Cloud Console and Apple Developer Console

export const OAUTH_CONFIG = {
  // Google OAuth - Platform-specific clients
  GOOGLE: {
    // iOS Client ID (for iOS devices)
    IOS_CLIENT_ID: '71774759936-94oleu9bi2hs3mp2l40k6v6okhbvjola.apps.googleusercontent.com',
    
    // Android Client ID (for Android devices)
    ANDROID_CLIENT_ID: '71774759936-4ibm4nbi5aal42k6q3vnosi94em2v6ep.apps.googleusercontent.com',
    
    // Web Client ID (for Expo Go and web testing)
    WEB_CLIENT_ID: '71774759936-ebh9jqbs6fjrek8jp5o67e5c0vdv35s5.apps.googleusercontent.com',
    
    CLIENT_SECRET: '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',
    REDIRECT_URI: 'vita://auth/callback',
  },
  
  // Apple OAuth
  APPLE: {
    CLIENT_ID: 'YOUR_APPLE_CLIENT_ID',
    CLIENT_SECRET: 'YOUR_APPLE_CLIENT_SECRET',
    REDIRECT_URI: 'vita://auth/callback',
  },
  
  // Supabase Configuration
  SUPABASE: {
    URL: 'https://mulfhgmihtxskyggfvix.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bGZoZ21paHR4c2t5Z2dmdml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzYwNDUsImV4cCI6MjA2NzM1MjA0NX0.AE1qytBQ7Ysuhdj6-c-P07FbJx8PmKITUKwzeIrsXX4',
  },
};

// Instructions for setting up OAuth:
/*
1. Google OAuth Setup (Multiple Clients Needed):
   
   A. iOS Client:
   - Go to Google Cloud Console (https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API and Google Identity API
   - Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Set application type to "iOS"
   - Bundle ID: com.shivampansuria.vita
   - Copy the Client ID and replace YOUR_IOS_GOOGLE_CLIENT_ID
   
   B. Android Client:
   - Create another OAuth 2.0 Client ID
   - Set application type to "Android"
   - Package name: com.shivampansuria.vita
   - SHA-1 certificate fingerprint: (use debug SHA-1 for development)
   - Copy the Client ID and replace YOUR_ANDROID_GOOGLE_CLIENT_ID
   
   C. Web Client (for Expo Go):
   - Create another OAuth 2.0 Client ID
   - Set application type to "Web application"
   - Authorized redirect URIs: https://mulfhgmihtxskyggfvix.supabase.co/auth/v1/callback
   - Copy the Client ID and replace YOUR_WEB_GOOGLE_CLIENT_ID

2. Apple OAuth Setup:
   - Go to Apple Developer Console (https://developer.apple.com/)
   - Create a new App ID
   - Enable Sign In with Apple capability
   - Create a Services ID for web authentication
   - Copy the Client ID and replace YOUR_APPLE_CLIENT_ID

3. Supabase Setup:
   - Go to your Supabase project dashboard
   - Navigate to Authentication > Providers
   - Enable Google and Apple providers
   - Add your OAuth client IDs and secrets
   - Set redirect URL to: https://mulfhgmihtxskyggfvix.supabase.co/auth/v1/callback
*/ 