import { Link } from "react-router-dom";
import getArrayByNumber from "../utils/getArrayByNumber";

interface PaginationResultsProps {
  pageNumber: number;
  totalPages: number;
  perPage: number;
  handlePerPage: (page: number) => void;
}

const PaginationResults = ({
  pageNumber,
  totalPages,
  perPage,
  handlePerPage,
}: PaginationResultsProps) => {
  return (
    <div className="pagination-result">
      <div className="pagination-result__list">
        <div className="pagination-result__title">Page:</div>
        {getArrayByNumber(totalPages).map((el: number) => {
          return (
            <Link
              key={el}
              className={`pag-rez-item${pageNumber - 1 === el ? " current" : ""}`}
              to={`?page=${el + 1}`}
            >
              {el + 1}
            </Link>
          );
        })}
      </div>

      <div className="pagination-result__list">
        <div className="pagination-result__title">Per Page:</div>
        {getArrayByNumber(3).map((el: number) => {
          const page = (el + 1) * 10;

          return (
            <div
              key={el}
              className={`pag-rez-item${page === perPage ? " current" : ""}`}
              onClick={() => handlePerPage(page)}
            >
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaginationResults;
