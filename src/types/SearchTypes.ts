export interface SearchProps {
  params: object;
}

export interface SearchResult {
  name: string;
}

export interface SearchState {
  searchText: string;
  results: SearchResult[];
}

export interface SearchResultsProps {
  results: SearchResult[];
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
