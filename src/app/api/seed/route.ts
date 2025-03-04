import { NextResponse } from "next/server";

import { seedProjects } from "@/lib/seed/seedProjects";
import { seedProjectIdentities } from "@/lib/seed/seedProjectIdentities";
import { seedProjectTeams } from "@/lib/seed/seedProjectTeams";
import { seedProjectProgress } from "@/lib/seed/seedProjectProgress";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  try {
    await seedProjects();
    await seedProjectIdentities();
    await seedProjectTeams();
    await seedProjectProgress();
    return NextResponse.json({ message: "Seed succeeded" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Seed failed", error: (error as Error).message },
      { status: 500 },
    );
  }
}
