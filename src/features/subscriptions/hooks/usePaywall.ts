import { useSubscription } from "@/features/subscriptions/store/useSubscriptionModal";

export const usePaywall = () => {
  const subscriptionModal = useSubscription();

  const shouldBlock = true;

  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
