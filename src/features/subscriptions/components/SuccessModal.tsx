"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSuccessModal } from "@/features/subscriptions/store/useSuccessModal";

export const SuccessModal = () => {
  const { isOpen, onClose } = useSuccessModal();

  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.png" alt="logo" width={36} height={36} />

          <DialogTitle className="text-center">
            Subscription successful!
          </DialogTitle>
          <DialogDescription>
            You have successfully subscribed to our service
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button className="w-full" onClick={handleClose} variant="primary">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
