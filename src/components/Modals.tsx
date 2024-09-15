"use client";

import { useEffect, useState } from "react";

import { FailModal } from "@/features/subscriptions/components/FailModal";
import { SubscriptionModal } from "@/features/subscriptions/components/SubscriptionModal";

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
    </>
  );
};
