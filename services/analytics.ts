// Simple analytics service for tracking app events
// TODO: Integrate with Mixpanel or other analytics provider

class AnalyticsService {
  private static instance: AnalyticsService;

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Track paywall events
  trackPaywallShown() {
    console.log('Analytics: Paywall shown');
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Paywall Shown');
  }

  trackPaywallSkipped() {
    console.log('Analytics: Paywall skipped');
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Paywall Skipped');
  }

  trackPaywallPurchaseAttempt() {
    console.log('Analytics: Paywall purchase attempted');
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Paywall Purchase Attempted');
  }

  // Track authentication events
  trackSignIn(method: 'google' | 'apple' | 'email') {
    console.log(`Analytics: Sign in with ${method}`);
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Sign In', { method });
  }

  trackSignUp(method: 'google' | 'apple' | 'email') {
    console.log(`Analytics: Sign up with ${method}`);
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Sign Up', { method });
  }

  // Track app usage events
  trackFeatureUsed(feature: string) {
    console.log(`Analytics: Feature used - ${feature}`);
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Feature Used', { feature });
  }

  trackScreenView(screen: string) {
    console.log(`Analytics: Screen viewed - ${screen}`);
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track('Screen View', { screen });
  }

  // Generic track method
  track(event: string, properties?: Record<string, any>) {
    console.log(`Analytics: ${event}`, properties);
    // TODO: Send to Mixpanel or other analytics provider
    // mixpanel.track(event, properties);
  }
}

export default AnalyticsService.getInstance(); 