import { baseApi } from "./baseApi";

const songApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSong: build.query({
            query: () => ({
                url: '/songs',
                method: 'GET'
            }),
            providesTags: ['allSongs']
        })
    }),
})