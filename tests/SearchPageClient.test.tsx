import React from 'react';
import SearchPageClient from "../app/components/SearchPageClient";
import { useSearchItemsQuery } from "../app/store/listFetchReducer";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "../app/context/ThemeContext";
import { useNavigate } from "@remix-run/react";

jest.mock("@remix-run/react", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../app/store/listFetchReducer", () => ({
  useSearchItemsQuery: jest.fn(),
}));

jest.mock("../app/components/Body", () => jest.fn(() => <div>Body Mock</div>));
jest.mock("../app/components/DownloadCsv", () =>
  jest.fn(() => <div>DownloadCsv Mock</div>),
);

describe("SearchPageClient", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial data", () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: { animals: [], page: { pageNumber: 1, totalPages: 1 } },
      error: null,
      isLoading: false,
    });

    render(
      <ThemeProvider>
        <SearchPageClient
          initialData={{
            animals: [],
            page: {
              pageNumber: 1,
              totalPages: 1,
              numberOfElements: 5,
              totalElements: 5,
              firstPage: true,
              lastPage: true,
              pageSize: 1,
            },
            sort: {},
          }}
          searchTerm="test"
          pageNumber={1}
          perPage={10}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText("Body Mock")).toBeInTheDocument();
    expect(screen.getByText("DownloadCsv Mock")).toBeInTheDocument();
  });

  it("handles search and navigation", () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: { animals: [], page: { pageNumber: 1, totalPages: 1 } },
      error: null,
      isLoading: false,
    });

    render(
      <ThemeProvider>
        <SearchPageClient
          initialData={undefined}
          searchTerm="test"
          pageNumber={1}
          perPage={10}
        />
      </ThemeProvider>,
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "new search term" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?searchTerm=new search term&page=1&perPage=10",
    );
  });

  it("renders error state", () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <ThemeProvider>
        <SearchPageClient
          initialData={undefined}
          searchTerm="test"
          pageNumber={1}
          perPage={10}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <ThemeProvider>
        <SearchPageClient
          initialData={undefined}
          searchTerm="test"
          pageNumber={1}
          perPage={10}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByText("PaginationResults Mock")).not.toBeInTheDocument();
  });
});