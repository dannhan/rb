/* development page for test fetching data */

import { CreateProjectForm } from "@/components/create-project-form";
import { db } from "@/firebase/init";

export default async function Page() {
  const snapshot = await db.collection("projects").get();
  const data: { id: string; value: FirebaseFirestore.DocumentData }[] = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {data.map(({ id, value }) => (
        <p key={id}>
          {id} =&gt; {JSON.stringify(value)}
        </p>
      ))}
      <CreateProjectForm />
    </main>
  );
}
