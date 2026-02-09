#!/bin/bash

echo "🔧 Fixing Expo Go Connection Issues..."
echo ""

# Check if Expo is running
if ! pgrep -f "expo start" > /dev/null; then
    echo "Starting Expo server..."
    npx expo start --clear &
    sleep 5
fi

echo "📱 Connection Solutions:"
echo ""
echo "Option 1: Use Tunnel Mode (Recommended - works from anywhere)"
echo "  This creates a public URL that bypasses network issues"
echo "  Run: npx expo start --tunnel"
echo ""
echo "Option 2: Check Firewall Settings"
echo "  macOS: System Settings > Network > Firewall"
echo "  Allow Node.js and Terminal through firewall"
echo ""
echo "Option 3: Ensure Same WiFi Network"
echo "  Make sure your phone and computer are on the same WiFi"
echo "  Check your computer's IP: ifconfig | grep 'inet '"
echo ""
echo "Option 4: Try LAN Mode Explicitly"
echo "  Run: npx expo start --lan"
echo ""

# Get local IP
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
echo "Your local IP: $LOCAL_IP"
echo "Connection URL: exp://$LOCAL_IP:8081"
echo ""
