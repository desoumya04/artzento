"use server"

import { updateTag } from "next/cache"

export async function revalidateArtworks() {
  updateTag("get-artworks")
}
