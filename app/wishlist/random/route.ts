import { redirect } from "next/navigation";

import { getWishlist } from "@/lib/discogs";
import { createVinylLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const { wants } = await getWishlist();

  if (wants.length === 0) {
    redirect("/wishlist");
  }

  redirect(createVinylLink(wants[Math.floor(Math.random() * wants.length)]));
}
