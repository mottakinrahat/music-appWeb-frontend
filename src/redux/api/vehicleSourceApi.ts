import { baseApi } from "./baseApi";

const vehicleSource = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    sendEmail: build.mutation({
      query: (payload: any) => {
        return {
          url: `/vehicle-sourcing`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useSendEmailMutation } = vehicleSource;
