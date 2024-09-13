import { baseApi } from "./baseApi";

const biddingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    getAllBiddings: build.query({
      query: () => ({
        url: `/biddings`,
        method: "GET",
      }),
      providesTags: ["Biddings"],
    }),
    getSingleBiddings: build.query({
      query: (id) => ({
        url: `/biddings/${id}`,
        method: "GET",
      }),
      providesTags: ["Biddings"],
    }),

    // get all bidding based on user
    getBiddingsByUser: build.query({
      query: (id) => ({
        url: `/biddings`,
        method: "GET",
      }),
      providesTags: ["Biddings"],
    }),
    // get all pet
    createBiddings: build.mutation({
      query: (payload: any) => {
        return {
          url: `/biddings`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Biddings"],
    }),
  }),
});

export const { useCreateBiddingsMutation, useGetAllBiddingsQuery,useGetSingleBiddingsQuery,useGetBiddingsByUserQuery } =
  biddingsApi;
