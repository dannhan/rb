import { getAuth } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export default async function Page() {
  const session = await getAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </main>
  );
}
