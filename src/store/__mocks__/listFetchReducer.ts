import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ItemDetailFullResponse, ItemDetailParams } from "src/types/DetailType";
import { SearchFullResponse } from "src/types/SearchTypes";

interface SearchParams {
  searchTerm: string;
  pageNumber: number;
  perPage: number;
}
const mockApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/mock" }),
  endpoints: (builder) => ({
    searchItems: builder.query<SearchFullResponse, SearchParams>({
      query: ({ searchTerm, pageNumber, perPage }) =>
        `search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${perPage}`,
    }),
    itemDetail: builder.query<ItemDetailFullResponse, ItemDetailParams>({
      query: ({ uid }) => `?uid=${uid}`,
    }),
  }),
});
export const { useSearchItemsQuery, useItemDetailQuery } = mockApi;
