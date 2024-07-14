import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchResultsProps } from "../types/SearchTypes";

const Body = ({ loading, results, pageNumber }: SearchResultsProps) => {
  const [hasError, setHasError] = useState(false);

  const handleHasError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error("Error in event handler");
  }

  if (loading) {
    return (
      <div className="search-result">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="search-result">
      <h2>
        Search Star Trek Animals
        <button className="btn-error" onClick={handleHasError}>
          Get Error
        </button>
      </h2>
      {results.length ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <Link to={`/details?page=${pageNumber}&detail=${result.uid}`}>
                <strong>{result.name}</strong> -
                <span>Earth Animal: {result.earthAnimal ? "Yes" : "No"}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};

export default Body;
