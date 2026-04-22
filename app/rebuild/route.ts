import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET() {
  revalidateTag('discogs', "max");
  revalidatePath('/', 'layout');
  redirect(`/?rebuilt=1`);
}
