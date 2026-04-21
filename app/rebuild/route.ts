import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from 'next/cache';

export interface Job {
  id: string;
  state: string;
  createdAt: number;
}

export async function GET() {
  const { REBUILD } = process.env;
  /*const response = await fetch(REBUILD ?? "");
  const data = (await response.json()) as { job: Job };

  if (data.job.id) {
    redirect(`/?rebuilt=${data.job.id}`);
  }
  */

  revalidateTag('discogs', "max");
  revalidatePath('/', 'layout');

  redirect(`/?rebuilt=1`);
}
