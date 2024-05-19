import { LogoutForm } from "@/components/logout-form";
import { db } from "@/firebase/config";

export default async function Page() {
  const snapshot = await db.collection("projects").get();
  const data: { id: string; value: FirebaseFirestore.DocumentData }[] = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {data.map(({ id, value }) => (
        <p key={id}>
          {id} =&gt; {JSON.stringify(value)}
        </p>
      ))}
      <LogoutForm />
    </main>
  );
}
