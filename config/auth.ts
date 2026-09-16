import Constants from 'expo-constants';

const getSupabaseCallbackUrl = (): string => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  return supabaseUrl
    ? `${supabaseUrl}/auth/v1/callback`
    : 'https://YOUR_PROJECT.supabase.co/auth/v1/callback';
};

// OAuth Redirect URL Configuration
export const getOAuthRedirectUrl = (): string => {
  // Always use the Supabase callback URL for Google OAuth
  // Google requires a valid top-level domain, so we can't use custom schemes
  return getSupabaseCallbackUrl();
};

// Get the Site URL for Supabase configuration
export const getSupabaseSiteUrl = (): string => {
  if (__DEV__) {
    // Development: Use Expo Go URL dynamically
    const expoGoUrl = Constants.expoConfig?.hostUri
      ? `exp://${Constants.expoConfig.hostUri}`
      : 'exp://127.0.0.1:8081';
    return expoGoUrl;
  } else {
    // Production: Use your app's custom scheme
    return 'vita://auth/callback';
  }
};

// Get all possible redirect URLs for configuration
export const getAllRedirectUrls = (): string[] => {
  return [
    getSupabaseCallbackUrl(), // Supabase callback (required for Google)
  ];
};

// Get the final redirect URL after Supabase processes the OAuth
export const getFinalRedirectUrl = (): string => {
  if (__DEV__) {
    // Development: Use Expo Go URL
    const expoGoUrl = Constants.expoConfig?.hostUri
      ? `exp://${Constants.expoConfig.hostUri}`
      : 'exp://127.0.0.1:8081';
    return expoGoUrl;
  } else {
    // Production: Use custom scheme
    return 'vita://auth/callback';
  }
};

// Environment detection
export const isDevelopment = __DEV__;
export const isProduction = !__DEV__;

// Configuration instructions
export const getConfigurationInstructions = () => {
  const currentSiteUrl = getSupabaseSiteUrl();

  return {
    supabase: {
      siteUrl: currentSiteUrl,
      redirectUrls: [
        currentSiteUrl,
        'vita://auth/callback', // Always include production URL
      ],
    },
    google: {
      redirectUrls: [getSupabaseCallbackUrl()],
    },
    instructions: [
      '1. For Supabase Site URL, use the current dynamic URL shown above',
      '2. For Supabase Redirect URLs, add both the current URL and vita://auth/callback',
      '3. For Google Cloud Console, only add the Supabase callback URL',
      '4. The app will automatically switch between dev and production URLs',
    ],
  };
};
