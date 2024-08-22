import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer();

  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(session)}
    </main>
  );
}
