"use client";

import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useFailModal } from "@/features/subscriptions/store/useFailModal";
import { useSuccessModal } from "@/features/subscriptions/store/useSuccessModal";

export const SubscriptionAlert = () => {
  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const params = useSearchParams();

  const canceled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (canceled) onOpenFail();

    if (success) onOpenSuccess();
  }, [canceled, onOpenFail, success, onOpenSuccess]);

  return null;
};
