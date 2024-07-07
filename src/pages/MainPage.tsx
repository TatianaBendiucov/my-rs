import { Component } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';

interface SearchProps {
  params: object;
}

interface SearchResult {
  name: string;
}

interface SearchState {
  searchText: string;
  results: SearchResult[];
}

class MainPage extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchText: localStorage.getItem('searchText') || '',
      results: [],
    };
  }

  componentDidMount() {
    this.handleSearch(this.state.searchText);
  }

  handleSearch = (newSearchText: string) => {
    const clearSearchText = newSearchText.trim();
    localStorage.setItem('searchText', clearSearchText);

    fetch(
      `https://stapi.co/api/v1/rest/animal/search?name=${clearSearchText}`,
      {
        method: 'POST',
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        return response.json();
      })
      .then(({ animals }) => {
        this.setState({
          searchText: clearSearchText,
          results: animals,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  render() {
    const { searchText, results } = this.state;

    return (
      <>
        <Header searchText={searchText} onSearch={this.handleSearch} />
        <Body results={results} />
      </>
    );
  }
}

export default MainPage;
