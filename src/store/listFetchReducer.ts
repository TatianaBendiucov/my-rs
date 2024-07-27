import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemDetailFullResponse, ItemDetailParams } from 'src/types/DetailType';
import { SearchFullResponse } from 'src/types/SearchTypes';

interface SearchParams {
    searchTerm: string;
    pageNumber: number;
    perPage: number;
}

// Define a service using a base URL and a set of endpoints
const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/animal' }),
    endpoints: (builder) => ({
        searchItems: builder.query<SearchFullResponse, SearchParams>({
            query: ({ searchTerm, pageNumber, perPage }) => {
                console.log('API Call Parameters:', { searchTerm, pageNumber, perPage });
                return `search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${perPage}`;
            }
        }),
        itemDetail: builder.query<ItemDetailFullResponse, ItemDetailParams>({
            query: ({ uid }) => {
              return `?uid=${uid}`;
            },
          }),
    }),
});

// Export hooks for usage in functional components, including useDispatch and useSelector
export const { useSearchItemsQuery, useItemDetailQuery } = itemApi;
export default itemApi;