import baseApiHandler from "@/utils/baseApiHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiUrl = baseApiHandler();
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}`,
    prepareHeaders: (headers: any) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", ` ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Users",
    "Auth",
    "Brands",
    "Products",
    "Reviews",
    "Wishlist",
    "Biddings",
    "Vehicles",
    "Favorite",
    "Playlist",
    "allSongs",
  ],
});
