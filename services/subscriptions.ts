import Purchases, { CustomerInfo } from 'react-native-purchases';

export interface SubscriptionStatus {
  isSubscribed: boolean;
  hasActiveEntitlement: boolean;
  customerInfo: CustomerInfo | null;
}

class SubscriptionService {
  /**
   * Check if user has an active premium subscription
   */
  static async checkSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      
      const isSubscribed = customerInfo.entitlements.active['premium'] !== undefined;
      
      return {
        isSubscribed,
        hasActiveEntitlement: isSubscribed,
        customerInfo
      };
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return {
        isSubscribed: false,
        hasActiveEntitlement: false,
        customerInfo: null
      };
    }
  }

  /**
   * Get current customer info
   */
  static async getCustomerInfo(): Promise<CustomerInfo | null> {
    try {
      return await Purchases.getCustomerInfo();
    } catch (error) {
      console.error('Error getting customer info:', error);
      return null;
    }
  }

  /**
   * Restore purchases
   */
  static async restorePurchases(): Promise<CustomerInfo | null> {
    try {
      return await Purchases.restorePurchases();
    } catch (error) {
      console.error('Error restoring purchases:', error);
      return null;
    }
  }

  /**
   * Check if user can access premium features
   */
  static async canAccessPremium(): Promise<boolean> {
    const status = await this.checkSubscriptionStatus();
    return status.isSubscribed;
  }
}

export default SubscriptionService; 