import { getAuth } from "@/lib/auth";

export default async function Page() {
  const session = await getAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  )
}
