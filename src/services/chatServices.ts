import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./settings";
import { user } from "../types/userTypes";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["groups", "message"],
  baseQuery,
  endpoints: (build) => ({
    getGroups: build.query<any, void>({
      query: () => ({
        url: `/chat/groups`,
        method: "GET",
      }),
      providesTags: () => ["groups"],
    }),
    requestChat: build.mutation<
      any,
      {
        userId: number;
      }
    >({
      query: (body) => ({
        url: `/chat/request`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["groups"],
    }),
    getMessages: build.query<any, number | string | undefined>({
      query: (groupId) => ({
        url: `/chat/${groupId}`,
        method: "GET",
      }),
      providesTags: () => ["message"],
    }),

    acceptRequet: build.mutation<
      any,
      {
        groupId: number;
      }
    >({
      query: (body) => ({
        url: `/chat/accept`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["message", "groups"],
    }),
    sendMessage: build.mutation<
      any,
      {
        groupId: number;
        text: string;
      }
    >({
      query: (body) => ({
        url: `/chat/send`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["message"],
    }),
  }),
});
