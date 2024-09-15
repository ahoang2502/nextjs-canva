"use client";

import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useFailModal } from "@/features/subscriptions/store/useFailModal";

export const SubscriptionAlert = () => {
  const { onOpen: onOpenFail } = useFailModal();

  const params = useSearchParams();

  const canceled = params.get("canceled");

  useEffect(() => {
    if (canceled) onOpenFail();
  }, [canceled, onOpenFail]);

  return null;
};
