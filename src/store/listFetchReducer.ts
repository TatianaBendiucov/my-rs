import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchFullResponse } from 'src/types/SearchTypes';

interface SearchParams {
    searchTerm: string;
    pageNumber: number;
    perPage: number;
}

// Define a service using a base URL and a set of endpoints
const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/animal/search' }),
    endpoints: (builder) => ({
        searchItems: builder.query<SearchFullResponse, SearchParams>({
            query: ({ searchTerm, pageNumber, perPage }) => {
                console.log('API Call Parameters:', { searchTerm, pageNumber, perPage });
                return `?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${perPage}`;
            }
        }),
    }),
});

// Export hooks for usage in functional components, including useDispatch and useSelector
export const { useSearchItemsQuery } = itemApi;
export default itemApi;