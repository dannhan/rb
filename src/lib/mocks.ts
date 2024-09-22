import { promises as fs } from "fs";
import path from "path";

import { z } from "zod";

import { projectSchema, teamSchema } from "@/config/schema";

// Simulate a database read for projects.
export async function getProjects() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/projects.json"),
  );

  const projects = JSON.parse(data.toString());

  return z.array(projectSchema).parse(projects);
}

// Simulate a database read for team.
export async function getTeam() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/team.json"),
  );

  const team = JSON.parse(data.toString());

  return z.array(teamSchema).parse(team);
}
