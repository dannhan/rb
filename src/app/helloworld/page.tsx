import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createDoc, fetchCollection } from "@/lib/firebase/firestore";

import { Button } from "@/components/ui/button";
import { ListData } from "./comp";
import { FieldValue } from "firebase-admin/firestore";

export default async function Page() {
  const data = await fetchCollection({
    collectionName: "tests",
    zodSchema: z.any(),
    errorMessage: "serah dah",
  });
  const arr: string[] = [];
  data.forEach((d) => arr.push(d.id));

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await createDoc({
            collectionName: "tests",
            errorMessage: "serah dah",
            data: {
              data: `this is another data ${data.length}`,
              timestamp: FieldValue.serverTimestamp(),
            },
          });

          revalidatePath("/helloworld");
        }}
      >
        <Button size="sm" variant="outline" type="submit" className="m-4">
          add data
        </Button>
      </form>

      <ListData data={arr} />
    </div>
  );
}
