import itemApi from "../store/listFetchReducer";
import { store } from "../store/store";
import SearchPageClient from "../components/SearchPageClient";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") || "";
  const page = Number(url.searchParams.get("page")) || 1;
  const perPage = Number(url.searchParams.get("perPage")) || 10;

  const { data, error } = await store.dispatch(
    itemApi.endpoints.searchItems.initiate({
      searchTerm,
      pageNumber: page,
      perPage,
    }),
  );

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (error) {
    return json({ error: "Error fetching data" }, { status: 500 });
  }

  return json({
    initialData: data,
    searchTerm,
    pageNumber: page,
    perPage,
  });
};

export default function SearchPage() {
  const { initialData, searchTerm, pageNumber, perPage } =
    useLoaderData<typeof loader>();

  return (
    <div className="search-page">
      <SearchPageClient
        initialData={initialData}
        searchTerm={searchTerm}
        pageNumber={pageNumber}
        perPage={perPage}
      />
    </div>
  );
}
