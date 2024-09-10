import { baseApi } from "./baseApi";

const audioPlayerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Define mutation with dynamic parameters
    isFavourite: build.mutation({
      query: ({
        songId,
        userId,
        data,
      }: {
        songId: string;
        userId: string;
        data: any;
      }) => ({
        url: `/favourite/${songId}/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Favorite"],
    }),
    getFavourite: build.mutation({
      query: ({
        userId,
        data,
      }: {
        songId: string;
        userId: string;
        data: any;
      }) => ({
        url: `/favourite/${userId}`,
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["Favorite"],
    }),

    // Other endpoints...
    addToPlayList: build.mutation({
      query: (data: any) => ({
        url: `/playlist`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),

    createPlayList: build.mutation({
      query: (data: any) => ({
        url: `/playlist/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
});

export const {
  useIsFavouriteMutation,
  useAddToPlayListMutation,
  useCreatePlayListMutation,
  useGetFavouriteMutation,
} = audioPlayerApi;
