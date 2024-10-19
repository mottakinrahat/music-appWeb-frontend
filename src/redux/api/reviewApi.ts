import { baseApi } from "./baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all reviews
    getByProductsReview: build.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    // Get reviews for a single product
    getBySingleProductsReview: build.query({
      query: (id) => ({
        url: `/reviews/${id}`,  // Adjust the URL based on your API structure
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    // Create a new review
    createReview: build.mutation({
      query: (payload: any) => ({
        url: `/reviews`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetByProductsReviewQuery, useGetBySingleProductsReviewQuery } = reviewsApi;
