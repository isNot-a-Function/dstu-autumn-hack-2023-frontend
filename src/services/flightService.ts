import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./settings";
import {
  getSpecializationsData,
  getOrdersData,
  getOrderData,
  createResponseProps,
  archiveOrder,
} from "../types/casesTypes";
import { flightsData, flightsDataItem } from "../types/flightTypes";

export const flightApi = createApi({
  reducerPath: "casesApi",
  baseQuery,
  tagTypes: ["orders", "order", "train"],
  endpoints: (build) => ({
    getFlights: build.query<
      flightsData,
      { place1: string; place2: string; date: string }
    >({
      query: ({ place1, place2, date }) => ({
        url: `flight/?arrivalPoint=${place1}&departurePoint=${place2}&date=${date}`,
        method: "GET",
      }),
    }),
    getFlight: build.query<{ flights: flightsDataItem }, number | string>({
      query: (id) => ({
        url: `flight/${id}`,
        method: "GET",
      }),
      providesTags: () => ["train"],
    }),
    buyTicket: build.mutation<
      any,
      {
        flightPlaceId: number;
        withAnimals: boolean;
        withChildren: boolean;
      }
    >({
      query: (body) => ({
        url: `/ticket/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["train"],
    }),
    getMyTicket: build.query<any, void>({
      query: () => ({
        url: `/ticket/my`,
        method: "GET",
      }),
    }),
    updateParametrs: build.mutation<any, any>({
      query: (body) => ({
        url: `/profile/`,
        method: "POST",
        body: body,
      }),
    }),
    addRaiting: build.mutation<
      any,
      {
        rating: number;
        toWhomId: number;
      }
    >({
      query: (body) => ({
        url: `/rating/`,
        method: "POST",
        body: body,
      }),
    }),

    /////

    getSpecializations: build.query<getSpecializationsData, void>({
      query: () => ({
        url: `/specialization/`,
        method: "GET",
      }),
    }),
    getOrders: build.query<
      { orders: getOrdersData[]; count: number },
      { page: number; seacrh: string | null; filter: string | null }
    >({
      query: ({ page, seacrh, filter }) => {
        return {
          url: `/order/?page=${page}${seacrh ? "&search=" + seacrh : ""}${
            filter ? "&filter=" + filter : ""
          }`,
          method: "GET",
        };
      },
      providesTags: () => ["orders"],
    }),
    getOrder: build.query<getOrderData, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: () => ["order"],
    }),
    сreateResponse: build.mutation<getOrderData, createResponseProps>({
      query: (body) => ({
        url: `/executor/response`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    archiveOrder: build.mutation<any, archiveOrder>({
      query: (body) => ({
        url: `/order/archive`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    activeOrder: build.mutation<any, archiveOrder>({
      query: (body) => ({
        url: `/order/active`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    createOrder: build.mutation<any, any>({
      query: (body) => ({
        url: `/order/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: build.mutation<any, any>({
      query: (body) => ({
        url: `/order/update`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["orders", "order"],
    }),
    checkFile: build.mutation<{ files: string[] }, any>({
      query: (body) => ({
        url: `/file/upload`,
        method: "POST",
        body: body,
      }),

      invalidatesTags: () => ["orders", "order"],
    }),
    getMyOrders: build.query<
      { count: number; orders: getOrdersData[] },
      { filter: string; page: number }
    >({
      query: ({ filter, page }) => ({
        url: `/order/my?filter=${filter}&page=${page}`,
        method: "GET",
      }),
      providesTags: () => ["orders"],
    }),
    pickExecutor: build.mutation<
      any,
      {
        orderId: string;
        responseId: string;
      }
    >({
      query: (body) => ({
        url: `customer/pick`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    unpickExecutor: build.mutation<
      any,
      {
        orderId: string;
        responseId: string;
      }
    >({
      query: (body) => ({
        url: `/customer/unpick`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    declineOrder: build.mutation<
      any,
      {
        orderId: string;
      }
    >({
      query: (body) => ({
        url: `/executor/decline`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    doneExecutor: build.mutation<
      any,
      {
        orderId: string;
        comment: string;
        rating: number;
      }
    >({
      query: (body) => ({
        url: `/executor/done`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
    customerApprove: build.mutation<
      any,
      {
        orderId: string;
        comment: string;
        rating: number;
        cost: number | null;
      }
    >({
      query: (body) => ({
        url: `/customer/approve`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => ["orders", "order"],
    }),
  }),
});
