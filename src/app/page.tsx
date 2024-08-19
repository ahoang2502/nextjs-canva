import { Button } from "@/components/ui/button";
import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>you are logged in</Button>
    </main>
  );
}
