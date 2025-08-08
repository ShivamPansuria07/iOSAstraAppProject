# RevenueCat Integration Guide

## Overview
This app has been integrated with RevenueCat for subscription management. The integration includes:

- ✅ RevenueCat SDK v9.1.0 (latest compatible version)
- ✅ Custom paywall with RevenueCat offerings
- ✅ Subscription status checking
- ✅ Purchase and restore functionality
- ✅ Settings screen integration

## Files Modified/Created

### Core Integration
- `App.tsx` - RevenueCat initialization
- `screens/PaywallScreen.tsx` - Custom paywall with RevenueCat offerings
- `screens/SettingsScreen.tsx` - Subscription status and restore purchases
- `services/subscriptions.ts` - Subscription service utilities
- `hooks/useSubscription.ts` - React hook for subscription status

### Configuration
- `package.json` - Added RevenueCat dependencies
- `eas.json` - Updated for iOS simulator builds

## API Keys
- **iOS API Key**: `appl_hUpckXhQcXICpipFnPVmyNTQwXO` (configured)
- **Android API Key**: Not configured yet

## How to Use

### 1. Check Subscription Status
```typescript
import { useSubscription } from '../hooks/useSubscription';

function MyComponent() {
  const { isSubscribed, isLoading } = useSubscription();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <View>
      {isSubscribed ? (
        <Text>Premium features available!</Text>
      ) : (
        <Text>Upgrade to premium</Text>
      )}
    </View>
  );
}
```

### 2. Use Subscription Service Directly
```typescript
import SubscriptionService from '../services/subscriptions';

// Check if user can access premium features
const canAccess = await SubscriptionService.canAccessPremium();

// Get detailed subscription status
const status = await SubscriptionService.checkSubscriptionStatus();
```

### 3. Show Paywall
The paywall is automatically shown when users first open the app. To show it programmatically:

```typescript
// Navigate to paywall screen
navigation.navigate('Paywall');
```

## RevenueCat Dashboard Setup

### Required Configuration:
1. **Project**: Create a project in RevenueCat dashboard
2. **App Store Connect**: Connect your iOS app
3. **Products**: Add subscription products
4. **Entitlements**: Create "premium" entitlement
5. **Offerings**: Create offering with your products
6. **Paywall**: Configure paywall in RevenueCat dashboard

### Bundle ID
- **iOS**: `com.shivampansuria.vita`
- **Android**: `com.shivampansuria.vita` (when ready)

## Testing

### Development Build Required
RevenueCat doesn't work with Expo Go. You must build a development build:

```bash
# iOS Simulator
eas build --platform ios --profile ios-simulator

# Android Device
eas build --platform android --profile development
```

### Sandbox Testing
- Use sandbox Apple ID for testing
- Test purchases in sandbox mode
- Verify subscription status updates

## Next Steps

1. **Configure RevenueCat Dashboard**:
   - Add products to App Store Connect
   - Create entitlements and offerings
   - Configure paywall

2. **Test Purchase Flow**:
   - Build development build
   - Test on device/simulator
   - Verify subscription status

3. **Add Android Support**:
   - Connect Google Play Console
   - Add Android API key
   - Test Android purchases

## Troubleshooting

### Common Issues:
- **"No subscriptions available"**: Check RevenueCat dashboard configuration
- **Purchase fails**: Verify sandbox testing setup
- **Bundle ID mismatch**: Ensure bundle ID matches RevenueCat config

### Debug Mode:
RevenueCat is configured with verbose logging. Check console for detailed logs.

## Support
- [RevenueCat Documentation](https://www.revenuecat.com/docs)
- [Expo RevenueCat Guide](https://www.revenuecat.com/docs/getting-started/installation/expo) 