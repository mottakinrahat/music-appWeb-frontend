import { baseApi } from "./baseApi";

const vehicleInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    getAllVehicle: build.query({
      query: () => ({
        url: `/vehicleInfo`,
        method: "GET",
      }),
      providesTags: ["Vehicles"],
    }),
    // get all pet
    submitVehicle: build.mutation({
      query: (payload: any) => {
        return {
          url: `/vehicleInfo`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Vehicles"],
    }),

    // delete vehicle information by using the vehicle id
    deleteVehicle: build.mutation({
      query: (id: string) => {
        return {
          url: `/vehicleInfo/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Vehicles"],
    }),
  }),
});

export const {
  useGetAllVehicleQuery,
  useSubmitVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleInfoApi;
