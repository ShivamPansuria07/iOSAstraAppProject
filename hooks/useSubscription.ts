import { useState, useEffect } from 'react';
import SubscriptionService, { SubscriptionStatus } from '../services/subscriptions';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    hasActiveEntitlement: false,
    customerInfo: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = async () => {
    try {
      setIsLoading(true);
      const status = await SubscriptionService.checkSubscriptionStatus();
      setSubscriptionStatus(status);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const refreshStatus = () => {
    checkStatus();
  };

  return {
    ...subscriptionStatus,
    isLoading,
    refreshStatus
  };
}; 