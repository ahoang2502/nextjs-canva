"use client";

import { useEffect, useState } from "react";

import { FailModal } from "@/features/subscriptions/components/FailModal";
import { SubscriptionModal } from "@/features/subscriptions/components/SubscriptionModal";
import { SuccessModal } from "@/features/subscriptions/components/SuccessModal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
      <FailModal />
      <SuccessModal />
    </>
  );
};
