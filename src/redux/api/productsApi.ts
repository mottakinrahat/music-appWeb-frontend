import { baseApi } from "./baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all products
    getAllProducts: build.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/products?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    // get all products
    getProductGroupings: build.query({
      query: () => {
        return {
          url: `/products/count-list`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    // get featured products
    getFeaturedProducts: build.query({
      query: () => ({
        url: `/products/featured`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    // get single products
    getSingleProducts: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    // get all products
    createProducts: build.mutation({
      query: (payload: any) => {
        return {
          url: `/products`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),

    // crate products products
    updateProducts: build.mutation({
      query: ({ formData, id }: { formData: any; id: string }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
    // crate products products
    updateProductStatus: build.mutation({
      query: ({ status, id }: { status: any; id: string }) => {
        // console.log({ id, status,},"from redux" );
        return {
          url: `/products/${id}/status`,
          method: "PUT",
          body: { status: status },
        };
      },
      invalidatesTags: ["Products"],
    }),

    // create Featured products
    createFeaturedProducts: build.mutation({
      query: (id: any) => {
        return {
          url: `/products/create-featured/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Products"],
    }),

    // delete products
    deleteProducts: build.mutation({
      query: (id: any) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["Products"],
    }),

    // filter
    filterProduct: build.query({
      query: (params: any) => {
        return {
          url: `/products?searchTerm=${params}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useUpdateProductStatusMutation,
  useCreateFeaturedProductsMutation,
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useGetAllProductsQuery,
  useGetFeaturedProductsQuery,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
  useFilterProductQuery,
  useGetProductGroupingsQuery,
} = productsApi;
