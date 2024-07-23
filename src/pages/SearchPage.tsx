import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Body from "../components/Body";
import PaginationResults from "../components/PaginationResults";
import { useSearchItemsQuery } from "../store/listFetchReducer";
import DownloadCsv from "../components/DownloadCsv";

const SearchPage = () => {
  const [firstLoader, setFirstLoader] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState<number>(
      Number(searchParams.get("page") || 1),
    );

  const { data, error, isLoading } = useSearchItemsQuery({ searchTerm, pageNumber, perPage });

  const handleSearch = (param: string) => {
    setSearchTerm(param);
    setSearchParams({ searchTerm: param, page: pageNumber.toString(), perPage: perPage.toString()});
  };

  const handlePageNumber = (param: number) => {
    setPageNumber(param);
  };

  const handlePerPage = (param: number) => {
    setPerPage(param);
     setSearchParams({ searchTerm: searchTerm, page: param.toString(), perPage: param.toString()});
  };

  const handleSearchParams = (param: URLSearchParams) => {
    setSearchParams(param);
  };

  useEffect(() => {
    if (pageNumber !== 1) {
      const updatedSearchParams = new URLSearchParams();
      updatedSearchParams.set("page", "1");
      handleSearchParams(updatedSearchParams);
      handlePageNumber(1);

      if (firstLoader) {
        setFirstLoader(false);
        handleSearch(searchTerm);
      }
    } else {
      if (firstLoader) {
        setFirstLoader(false);
      }

      handleSearch(searchTerm);
    }
  }, [searchTerm, perPage]);

  useEffect(() => {
    if (!firstLoader) {
      handleSearch(searchTerm);
    }
    console.log(data);
  }, [pageNumber]);

  useEffect(() => {
    if (!firstLoader) {
      handleSearch(searchTerm);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (!firstLoader) {
      handlePageNumber(Number(searchParams.get("page") || 1));
    }
  }, [searchParams]);

  if(error) {
    return 'Loading';
  }
  
  return (
    <div className="search-page">
      <div className="search-page__left">
        <Header searchText={searchTerm} onSearch={handleSearch} />
        <Body loading={isLoading} results={!data ? [] : data.animals} pageNumber={pageNumber} />
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

      <div className="search-page__right">
        <Outlet />
      </div>
    </div>
  );
};

export default SearchPage;
