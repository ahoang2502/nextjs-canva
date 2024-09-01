import { create } from "zustand";

type SubscriptionModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSubscription = create<SubscriptionModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
