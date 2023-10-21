import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery,
  endpoints: (build) => ({
    getUser: build.query<{ user: user }, void>({
      query: () => ({
        url: `/user/me`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
    changeFactor: build.mutation<
      any,
      {
        age?: number;
        allergyToAnimals?: boolean;
        carriageType?: string;
        dislikeForChildren?: boolean;
        familyStatus?: string;
        hobbies?: string[];
        language?: string[];
        placePosition?: string;
        psychotype?: string;
        sex?: string;
        snore?: boolean;
      }
    >({
      query: (body) => ({
        url: `/profile/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),

    getProfileId: build.query<{ user: user }, number | string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
    ////////

    changePhoto: build.mutation<any, any>({
      query: (body) => ({
        url: `/user/logo`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
    changeRole: build.mutation<any, void>({
      query: () => ({
        url: `/user/change`,
        method: "POST",
      }),
      invalidatesTags: () => ["user"],
    }),

    addBalance: build.mutation<
      any,
      {
        balance: number;
      }
    >({
      query: (body) => ({
        url: `/user/balance`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),

    decreaseBalance: build.mutation<
      any,
      {
        sum: number;
      }
    >({
      query: (body) => ({
        url: `/balance/decrease`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
    getHistoryBalance: build.query<any, { page: number }>({
      query: ({ page }) => ({
        url: `/user/balance?page=${page}`,
        method: "GET",
      }),
      providesTags: () => ["user"],
    }),
    updateUser: build.mutation<
      any,
      { email?: string; firstname?: string; lastname?: string; phone?: string }
    >({
      query: (body) => ({
        url: `user/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: () => ["user"],
    }),
  }),
});
