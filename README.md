# ✨ Vita

## 📌 Description

Vita is an iOS lifestyle app built with Expo, React Native, and TypeScript.  
It is an AI life-advisor with themed chat rooms for guidance, relationships, dreams, tarot, and personal growth.

This project demonstrates a full mobile flow: splash and onboarding, authentication, a subscription paywall, and a home dashboard. Architecture is split into **Screens → Services → Config**, with Supabase for auth. The paywall is integrated with RevenueCat for subscriptions and in-app purchases.

## ✨ Features

✅ Onboarding and splash with custom fonts  
✅ Email / password sign up and sign in  
✅ Google OAuth via Supabase (Apple Sign In supported)  
✅ Deep linking for OAuth callbacks (`vita://`)  
✅ Home dashboard with 9 AI feature rooms  
✅ Chat with per-feature prompts, typing UI, and conversation history  
✅ Profile with name, email, and zodiac  
✅ Paywall integrated with RevenueCat (offerings, entitlements, restore purchases)  
✅ Restore purchases and premium entitlement check  
✅ Dark cosmic UI (purple / gold theme)

## 🚀 Tech Stack

- TypeScript
- Expo SDK 53
- React Native
- React Navigation
- Supabase Auth
- OpenAI (GPT-3.5)
- RevenueCat
- Expo Linear Gradient / custom fonts
- EAS Build

## 🛠 Setup

```bash
npm install
cp .env.example .env
npx expo start
```

Then run on iOS Simulator:

```bash
npm run ios
```

RevenueCat / in-app purchases need a native or EAS development build, not Expo Go.

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in:

- `EXPO_PUBLIC_OPENAI_API_KEY`
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`

Do not commit `.env` or API keys. OAuth client secrets belong in the Supabase dashboard, not in this repo.

## 📱 Screenshots

Add images to `docs/screenshots/` and they will show here:

```
docs/screenshots/home.png
docs/screenshots/chat.png
docs/screenshots/paywall.png
docs/screenshots/auth.png
```
