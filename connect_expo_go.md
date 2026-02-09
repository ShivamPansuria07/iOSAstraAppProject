# Expo Go Connection Guide

## Your App is Ready! 🎉

**Connection Details:**
- **Host:** 127.0.0.1:8081
- **Connection URL:** `exp://127.0.0.1:8081`
- **App Name:** Vita
- **Bundle URL:** http://127.0.0.1:8081/index.ts.bundle?platform=ios&dev=true

## How to Connect with Expo Go:

### Method 1: Scan QR Code (Recommended)
1. Look at your terminal where `expo start` is running
2. You should see a QR code displayed
3. **For iOS:** Open the Camera app and scan the QR code
4. **For Android:** Open Expo Go app and tap "Scan QR code"

### Method 2: Manual Connection
1. Open Expo Go app on your phone
2. Make sure your phone and computer are on the **same WiFi network**
3. Tap "Enter URL manually"
4. Enter: `exp://127.0.0.1:8081`

### Method 3: Use Tunnel (if same network doesn't work)
If you're having trouble connecting on the same network:
1. Stop the current server (Ctrl+C)
2. Run: `npx expo start --tunnel`
3. This will create a public URL you can use from anywhere

## Troubleshooting:

- **Can't see QR code?** Check your terminal window where Expo is running
- **Connection failed?** Make sure both devices are on the same WiFi
- **Still not working?** Try using tunnel mode: `npx expo start --tunnel`
