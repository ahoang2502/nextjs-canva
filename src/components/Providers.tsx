"use client";

import { QueryProvider } from "@/components/QueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};
