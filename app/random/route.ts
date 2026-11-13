import { redirect } from "next/navigation";

import { getCollection } from "@/lib/discogs";
import { createVinylLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const { releases } = await getCollection("0");

  if (releases.length === 0) {
    redirect("/");
  }

  redirect(
    createVinylLink(releases[Math.floor(Math.random() * releases.length)]),
  );
}
