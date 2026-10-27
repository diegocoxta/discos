import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!process.env.REBUILD_TOKEN || token !== process.env.REBUILD_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag('discogs', "max");
  revalidatePath('/', 'layout');
  redirect(`/?rebuilt=1`);
}
