import { baseApi } from "./baseApi";

const audioPlayerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Define mutation with dynamic parameters
    // Getting all songs
    getAllSong: build.mutation({
      query: ({
        page,
        limit,
        data,
      }: {
        page: number;
        limit: number;
        data: any;
      }) => ({
        url: `/songs?page=${page}&limit=${limit}`,
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["allSongs"],
    }),

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
      providesTags: ['Favorite']
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
  useGetFavouriteQuery,
} = audioPlayerApi;
