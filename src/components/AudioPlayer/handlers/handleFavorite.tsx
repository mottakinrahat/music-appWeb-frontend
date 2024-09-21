import React from "react";
import { toast } from "sonner";
import PlaceHolder from "@/assets/etc/png/song.jpg";

import Image from "next/image"; // Assuming you're using Next.js for Image

// Update the handleFavorite function to accept the mutation function
const handleFavorite = async (
  isFavourite: any, // Function from the hook
  isFavouriteUser: any, // Function
  songId: string,
  userId: string,
  data: any,
  artwork: string | undefined,
  songName: string
) => {
  try {
    const res = await isFavourite({
      songId,
      userId,
      data,
    }).unwrap();

    if (res?.success) {
      toast.success(
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={artwork || PlaceHolder.src} // Use artwork or placeholder
            alt={songName}
            width={50}
            height={50}
            priority
            style={{
              borderRadius: "8px",
              marginRight: "8px",
              objectFit: "cover",
              aspectRatio: 1 / 1,
              width: "50px",
              height: "50px",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>
              {isFavouriteUser
                ? "Removed from favourites"
                : "Added to favourites."}
            </div>
          </div>
        </div>
      );
    }
  } catch (err) {
    // Show error toast notification
    toast.error("Failed to add to favourite list");
  }
};

// get favorites
const getUserFavorites = async (getFavourites: any, userId: string) => {
  try {
    const favorites = await getFavourites({ userId }).unwrap();
    return favorites?.data || [];
  } catch (err) {
    console.error("Failed to fetch favorites:", err);
    return [];
  }
};

export { handleFavorite, getUserFavorites };
