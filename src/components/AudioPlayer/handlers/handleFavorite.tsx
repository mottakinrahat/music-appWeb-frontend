import React from "react";
import { toast } from "sonner";

import Image from "next/image"; // Assuming you're using Next.js for Image

// Update the handleFavorite function to accept the mutation function
const handleFavorite = async (
  isFavourite: any, // Function from the hook
  isFavouriteUser: any, // Function
  songId: string,
  userId: string,
  data: any,
  artwork: string | undefined,
  songName: string,
  songAlbum: { albumName: string } | undefined,
  placeHolder: { src: string }
) => {
  try {
    const res = await isFavourite({
      songId,
      userId,
      data,
    }).unwrap();
    console.log("Response form favourite", res);
    if (res?.success) {
      toast.success(
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={artwork || placeHolder.src} // Use artwork or placeholder
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
              {isFavouriteUser ? "Favorites Removed Successfully" : "Favorites Added Successfully"}
            </div>
            {/* <div>{`${songName}, ${songAlbum?.albumName}`}</div> */}
          </div>
        </div>
      );
    }
  } catch (err) {
    // Show error toast notification
    toast.error("Failed to add to favourite list");
    console.error("Failed to set favorite:", err);
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
