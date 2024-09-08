"use client";

import { CreditCard, Crown, Loader, LogOutIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

export const UserButton = () => {
  const session = useSession();

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  if (session.status === "loading")
    return <Loader className="size-4 animate-spin text-muted-foreground" />;

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data?.user?.name!;
  const imageUrl = session.data?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="text-yellow-500 fill-yellow-500 size-3" />
            </div>
          </div>
        )}

        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem onClick={() => {}} disabled={false} className="h-10">
          <CreditCard className="size-4 mr-2" /> Billing
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="h-10">
          <LogOutIcon className="size-4 mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
