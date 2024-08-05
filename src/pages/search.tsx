import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Body from "../components/Body";
import PaginationResults from "../components/PaginationResults";
import itemApi, { useSearchItemsQuery } from "../store/listFetchReducer";
import DownloadCsv from "../components/DownloadCsv";
import { wrapper } from "../store/store";

interface SearchPageProps {
  pageNumber: number;
  perPage: number;
}

const SearchPage = ({ pageNumber, perPage }: SearchPageProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSearchItemsQuery({
    searchTerm: "",
    pageNumber: pageNumber,
    perPage: perPage,
  });

  const handleSearch = (param: string) => {
    setSearchTerm(param);
    router.push({
      pathname: "/search",
      query: {
        searchTerm: param,
        page: pageNumber.toString(),
        perPage: perPage.toString(),
      },
    });
  };

  const handlePerPage = (param: number) => {
    router.push({
      pathname: "/search",
      query: {
        searchTerm: searchTerm,
        page: pageNumber.toString(),
        perPage: param.toString(),
      },
    });
  };

  if (error) {
    return "Error";
  }

  return (
    <div className="search-page">
      <div className="search-page__left">
        <Header searchText={searchTerm} onSearch={handleSearch} />
        <Body
          loading={isLoading}
          results={!data ? [] : data.animals}
          pageNumber={pageNumber}
        />
        {isLoading || (!data ? true : !data.animals.length) ? null : (
          <PaginationResults
            pageNumber={!data ? 0 : data?.page.pageNumber}
            totalPages={!data ? 0 : data?.page.totalPages}
            perPage={perPage}
            handlePerPage={handlePerPage}
          />
        )}
        <DownloadCsv />
      </div>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { searchTerm = "", page = 1, perPage = 10 } = query;

      await store.dispatch(
        itemApi.endpoints.searchItems.initiate({
          searchTerm: searchTerm as string,
          pageNumber: Number(page),
          perPage: Number(perPage),
        }),
      );

      await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

      return {
        props: {
          pageNumber: page,
          perPage,
        },
      };
    },
);
