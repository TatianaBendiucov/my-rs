"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Body from "./Body";
import PaginationResults from "./PaginationResults";
import { useSearchItemsQuery } from "../store/listFetchReducer";
import DownloadCsv from "./DownloadCsv";
import { SearchFullResponse } from "../types/SearchTypes";

interface SearchPageClientProps {
  initialData: SearchFullResponse | undefined;
  searchTerm: string;
  pageNumber: number;
  perPage: number;
}

const SearchPageClient = ({
  initialData,
  searchTerm,
  pageNumber,
  perPage,
}: SearchPageClientProps) => {
  const router = useRouter();
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);
  const { data, error, isLoading } = useSearchItemsQuery(
    {
      searchTerm: currentSearchTerm,
      pageNumber: pageNumber,
      perPage: perPage,
    },
    {
      skip: initialData !== undefined,
      selectFromResult: (result) => ({
        ...result,
        data: initialData || result.data,
      }),
    },
  );

  const handleSearch = (param: string) => {
    setCurrentSearchTerm(param);
    router.push(
      `/search?searchTerm=${param}&page=${pageNumber}&perPage=${perPage}`,
    );
  };

  const handlePerPage = (param: number) => {
    router.push(
      `/search?searchTerm=${currentSearchTerm}&page=${pageNumber}&perPage=${param}`,
    );
  };

  if (error) {
    return "Error";
  }

  return (
    <div className="search-page__left">
      <Header searchText={currentSearchTerm} onSearch={handleSearch} />
      <Body
        loading={isLoading}
        results={!data ? [] : data.animals}
        pageNumber={pageNumber}
        perPage={perPage}
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
  );
};

export default SearchPageClient;
