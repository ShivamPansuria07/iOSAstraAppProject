# ✅ Expo Go Connection - FIXED

## Server Status: ✅ RUNNING

The Expo server is now running in **LAN mode** which should fix the timeout issue.

## 🔗 How to Connect:

### Step 1: Get Your Connection URL
Check your terminal where Expo is running. You should see:
- A QR code
- Connection URL (usually `exp://192.168.x.x:8081` or similar)

### Step 2: Connect via Expo Go
1. **Open Expo Go** on your iPhone
2. **Scan the QR code** from your terminal, OR
3. **Manually enter** the connection URL shown in your terminal

## 🔧 If You Still Get Timeout:

### Fix 1: Check Firewall (macOS)
```bash
# Allow Node.js through firewall
# System Settings > Network > Firewall > Options
# Add Node.js and Terminal to allowed apps
```

### Fix 2: Verify Same Network
- Make sure iPhone and Mac are on the **same WiFi network**
- Try disconnecting and reconnecting WiFi on both devices

### Fix 3: Try Tunnel Mode (Most Reliable)
```bash
# Stop current server (Ctrl+C)
npx expo start --tunnel
```
This creates a public URL that works from anywhere!

### Fix 4: Restart Everything
```bash
# Stop Expo
pkill -f "expo start"

# Clear cache and restart
npx expo start --clear --lan
```

## 📱 Current Connection Info:
- **Mode:** LAN (Local Network)
- **Status:** Server is running
- **Check terminal for:** QR code and connection URL

## ⚠️ Important Notes:
- The timeout error usually means your phone can't reach your computer
- Tunnel mode (`--tunnel`) is the most reliable solution
- Make sure port 8081 is not blocked by firewall
