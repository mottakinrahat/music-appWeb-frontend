import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    getAllUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    // get all pet
    updateUsersProfile: build.mutation({
      query: (payload: { userName: string; photoUrl: string }) => {
        return {
          url: `/users/profile`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Users"],
    }),

    updateUser: build.mutation({
      query: (payload) => {
        const { id, role, userStatus } = payload;

        const body: any = {};
        if (role) body.role = role;
        if (userStatus) body.userStatus = userStatus;

        return {
          url: `/users/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUsersProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
