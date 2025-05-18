import type { WithId } from "@/types";
import type { ZodSchema } from "zod";

export function parseCollection<T>(
  snapshot: FirebaseFirestore.QuerySnapshot,
  schema: ZodSchema<T>,
): WithId<T>[] {
  return snapshot.docs.reduce<WithId<T>[]>((acc, doc) => {
    const parsed = schema.safeParse(doc.data());
    if (parsed.success) acc.push({ id: doc.id, ...parsed.data });
    return acc;
  }, []);
}
