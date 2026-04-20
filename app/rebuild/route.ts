import { redirect } from "next/navigation";

export interface Job {
  id: string;
  state: string;
  createdAt: number;
}

export async function GET() {
  const { REBUILD } = process.env;
  const response = await fetch(REBUILD ?? "");
  const data = (await response.json()) as { job: Job };

  if (data.job.id) {
    redirect(`/?rebuilt=${data.job.id}`);
  }

  return Response.json({ error: "Something went wrong" });
}
