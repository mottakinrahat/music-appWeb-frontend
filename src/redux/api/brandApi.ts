import { baseApi } from "./baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    getAllBrands: build.query({
      query: () => ({
        url: `/brands`,
        method: "GET",
      }),
      providesTags: ["Brands"],
    }),
    // get all pet
    createBrands: build.mutation({
      query: (payload: any) => {
        return {
          url: `/brands`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const { useGetAllBrandsQuery, useCreateBrandsMutation } = brandsApi;
