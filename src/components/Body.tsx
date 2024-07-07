import { Component } from "react";
import { SearchResultsProps, SearchResultState } from "../types/SearchTypes";

class Body extends Component<SearchResultsProps, SearchResultState> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("Error in event handler");
    }

    const { results } = this.props;

    return (
      <div className="search-results">
        <h2>
          Search for Star Trek Animals
          <button className="btn-error" onClick={this.handleClick}>
            Simulate an error
          </button>
        </h2>
        {results.length ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>{result.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">No results</div>
        )}
      </div>
    );
  }
}

export default Body;
