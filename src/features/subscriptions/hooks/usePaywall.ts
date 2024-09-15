import { useSubscription } from "@/features/subscriptions/store/useSubscriptionModal";
import { useGetSubscription } from "@/features/subscriptions/api/useGetSubscription";

export const usePaywall = () => {
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();
  const subscriptionModal = useSubscription();

  const shouldBlock = isLoadingSubscription || !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
