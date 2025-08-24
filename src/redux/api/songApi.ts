import { baseApi } from "./baseApi";

const audioPlayerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Define mutation with dynamic parameters
    // Getting all songs
    allSong: build.query({
      query: ({ page, limit }: { page: number; limit: number }) => ({
        url: `/songs?page=${page}&limit=${limit}`, // No body in GET request
        method: "GET",
      }),
      providesTags: ["allSongs"],
    }),
    singleSong: build.query({
      query: (songId: string | number) => ({
        url: `/songs/${songId}`, // No body in GET request
        method: "GET",
      }),
      providesTags: ["allSongs", 'singleSong'],
    }),

    isFavouriteUser: build.mutation({
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
      invalidatesTags: ["Favorite", "allSongs"],
    }),
    getFavourite: build.query({
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
      providesTags: ["Favorite"],
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
  useAllSongQuery,
  useSingleSongQuery,
  useIsFavouriteUserMutation,
  useAddToPlayListMutation,
  useCreatePlayListMutation,
  useGetFavouriteQuery,
} = audioPlayerApi;
