import itemApi from "../../store/listFetchReducer";
import { store } from "../../store/store";
import SearchPageClient from "../../components/SearchPageClient";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: {
    searchTerm: string;
    page: string;
    perPage: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  console.log(searchParams);
  const { searchTerm = "", page = 1, perPage = 10 } = searchParams;
  const { data, error } = await store.dispatch(
    itemApi.endpoints.searchItems.initiate({
      searchTerm: searchTerm as string,
      pageNumber: Number(page),
      perPage: Number(perPage),
    }),
  );

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (error) {
    return "Error";
  }

  return (
    <div className="search-page">
      <SearchPageClient
        initialData={data}
        searchTerm={searchTerm}
        pageNumber={Number(page)}
        perPage={Number(perPage)}
      />
    </div>
  );
};

export default SearchPage;
