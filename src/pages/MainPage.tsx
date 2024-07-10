import { Component } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import { SearchProps, SearchState } from "../types/SearchTypes";

class MainPage extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchText: localStorage.getItem("searchText") || "",
      results: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.handleSearch(this.state.searchText);
  }

  handleSearch = (newSearchText: string) => {
    const clearSearchText = newSearchText.trim();
    localStorage.setItem("searchText", clearSearchText);

    this.setState({ loading: true });

    fetch(
      `https://stapi.co/api/v1/rest/animal/search?name=${clearSearchText}`,
      {
        method: "POST",
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }

        return response.json();
      })
      .then(({ animals }) => {
        this.setState({
          searchText: clearSearchText,
          results: animals,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        throw new Error(error);
      });
  };

  render() {
    const { searchText, results, loading } = this.state;

    return (
      <>
        <Header searchText={searchText} onSearch={this.handleSearch} />
        <Body loading={loading} results={results} />
      </>
    );
  }
}

export default MainPage;
