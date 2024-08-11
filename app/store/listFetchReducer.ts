import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchFullResponse } from "../types/SearchTypes";
import { ItemDetailFullResponse, ItemDetailParams } from "../types/DetailType";
interface SearchParams {
  searchTerm: string;
  pageNumber: number;
  perPage: number;
}

// Define a service using a base URL and a set of endpoints
const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://stapi.co/api/v1/rest/animal" }),
  endpoints: (builder) => ({
    searchItems: builder.query<SearchFullResponse, SearchParams>({
      query: ({ searchTerm, pageNumber, perPage }) => {
        return `search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${perPage}`;
      },
    }),
    itemDetail: builder.query<ItemDetailFullResponse, ItemDetailParams>({
      query: ({ uid }) => {
        return `?uid=${uid}`;
      },
    }),
  }),
});

export const { useSearchItemsQuery, useItemDetailQuery } = itemApi;
export default itemApi;
