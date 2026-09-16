# 🔧 Expo Go Connection Fix - Tunnel Mode

## Problem
You were getting a timeout error: "Unknown error: The request timed out" when trying to connect via `exp://YOUR_LOCAL_IP:8081`

## Solution: Tunnel Mode
Tunnel mode creates a public URL that works from anywhere, bypassing network and firewall issues.

## How to Connect:

1. **Check your terminal** where `expo start --tunnel` is running
2. **Look for the QR code** - it will show a new URL (usually something like `exp://xxx.xxx.xxx.xxx:80`)
3. **Scan the QR code** with Expo Go, or manually enter the URL shown

## Alternative Solutions (if tunnel doesn't work):

### Option 1: Allow Firewall Access
1. Open **System Settings** > **Network** > **Firewall**
2. Click **Options** or **Firewall Options**
3. Make sure **Node.js** and **Terminal** are allowed
4. Restart Expo server

### Option 2: Use LAN Mode
```bash
npx expo start --lan
```
Then use the IP address shown (usually 192.168.x.x)

### Option 3: Check Network Connection
- Ensure your phone and computer are on the **same WiFi network**
- Try disconnecting and reconnecting to WiFi on both devices
- Restart your router if needed

### Option 4: Manual IP Connection
1. Find your computer's local IP:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
2. Use that IP in the connection URL: `exp://YOUR_IP:8081`

## Current Status:
- ✅ Expo server is running in tunnel mode
- ✅ Check your terminal for the tunnel URL and QR code
- ✅ Scan the QR code or enter the URL manually in Expo Go
