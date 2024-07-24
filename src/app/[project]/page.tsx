import { notFound } from "next/navigation"

const projects = [
  "banjar",
  "kediri",
  "sipodang",
]

export default function Page({ params }: { params: { project: string } }) {
  if (!projects.includes(params.project)) {
    return notFound();
  }

  return <div>Hello {params.project}!</div>
}
