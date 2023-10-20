import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import {
  steamLoginData,
  ISignUpUser,
  ISignInUser,
  ISignUpUserData,
} from "../types/authTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    signUp: build.query<ISignUpUserData, ISignUpUser>({
      query: (body: ISignUpUser) => ({
        url: `/auth/signup`,
        method: "POST",
        // credentials: "include",
        body: body,
      }),
    }),
    signIn: build.query<ISignUpUserData, ISignInUser>({
      query: (body: ISignUpUser) => ({
        url: `/auth/signin`,
        method: "POST",
        // credentials: "include",
        body: body,
      }),
    }),
  }),
});
