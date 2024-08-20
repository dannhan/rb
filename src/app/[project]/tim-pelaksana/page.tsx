import { Metadata } from "next"

import { getTasks } from "@/lib/mocks"

import { columns } from "@/components/task-table/columns"
import { DataTable } from "@/components/task-table/data-table"

// TODO
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
}
export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  )
}
