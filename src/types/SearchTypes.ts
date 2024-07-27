export interface SearchProps {
  params: object;
}

export interface SearchResult {
  uid: string;
  name: string;
  earthAnimal: string;
}

export interface SearchState {
  searchText: string;
  results: SearchResult[];
  loading: boolean;
}

export interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  pageNumber: number;
}

export interface ListItemProps {
  item: SearchResult;
  index: number;
  pageNumber: number;
}

export interface SearchResultState {
  hasError: boolean;
}

export interface SearchInputState {
  searchText: string;
}

export interface SearchInputProps {
  searchText: string;
  onSearch: (searchText: string) => void;
}

export interface PageResponse {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface SearchFullResponse {
  page: PageResponse;
  animals: SearchResult[];
  sort: object;
}
