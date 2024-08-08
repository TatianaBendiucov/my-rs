"use client";
import { useState } from "react";
import { SearchResultsProps } from "../types/SearchTypes";
import ListItem from "./ListItem";

const Body = ({
  loading,
  results,
  pageNumber,
  perPage,
}: SearchResultsProps) => {
  const [hasError, setHasError] = useState(false);

  const handleHasError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error("Error in event handler");
  }

  if (loading) {
    return (
      <div className="search-result" key="loading">
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
            <ListItem
              item={result}
              index={index}
              pageNumber={pageNumber}
              perPage={perPage}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};

export default Body;
