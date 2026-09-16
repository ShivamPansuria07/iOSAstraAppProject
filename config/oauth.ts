// OAuth Configuration
// Set values in .env (see .env.example). Never commit client secrets.

export const OAUTH_CONFIG = {
  GOOGLE: {
    IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',
    ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '',
    WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
    REDIRECT_URI: 'vita://auth/callback',
  },

  APPLE: {
    CLIENT_ID: 'YOUR_APPLE_CLIENT_ID',
    REDIRECT_URI: 'vita://auth/callback',
  },

  SUPABASE: {
    URL: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
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
   - Copy the Client ID into EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID

   B. Android Client:
   - Create another OAuth 2.0 Client ID
   - Set application type to "Android"
   - Package name: com.shivampansuria.vita
   - SHA-1 certificate fingerprint: (use debug SHA-1 for development)
   - Copy the Client ID into EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID

   C. Web Client (for Expo Go):
   - Create another OAuth 2.0 Client ID
   - Set application type to "Web application"
   - Authorized redirect URIs: https://YOUR_PROJECT.supabase.co/auth/v1/callback
   - Copy the Client ID into EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
   - Put the client secret in the Supabase Auth Google provider settings only — not in this repo

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
   - Add your OAuth client IDs and secrets in the Supabase dashboard
   - Set redirect URL to: https://YOUR_PROJECT.supabase.co/auth/v1/callback
*/
