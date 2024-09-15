"use client";

import {
  CreditCard,
  CrownIcon,
  Home,
  MessageCircleQuestion,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "./SidebarItem";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import { useCheckout } from "@/features/subscriptions/api/useCheckout";
import { useBilling } from "@/features/subscriptions/api/useBilling";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
  const billingMutation = useBilling();
  const mutation = useCheckout();

   const onClick = () => {
     if (shouldBlock) {
       triggerPaywall();
       return;
     }

     billingMutation.mutate();
   };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
              variant="outline"
              size="lg"
            >
              <CrownIcon className="size-4 mr-2 fill-yellow-500 text-yellow-500" />
              Upgrade to Canva Pro
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={onClick}
        />
        <SidebarItem
          href="mailto:hello@gmail.com"
          icon={MessageCircleQuestion}
          label="Get help"
        />
      </ul>
    </div>
  );
};
