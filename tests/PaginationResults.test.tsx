import { render, screen, fireEvent } from "@testing-library/react";
import PaginationResults from "../app/components/PaginationResults";
import getArrayByNumber from "../app/utils/getArrayByNumber";

jest.mock("../app/utils/getArrayByNumber", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@remix-run/react", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("PaginationResults", () => {
  const mockHandlePerPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getArrayByNumber as jest.Mock).mockImplementation((num: number) => Array.from({ length: num }, (_, i) => i));
  });

  it("should render pagination links correctly", () => {
    render(
      <PaginationResults
        pageNumber={2}
        totalPages={5}
        perPage={10}
        handlePerPage={mockHandlePerPage}
      />
    );

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(5);
    expect(pageLinks[1]).toHaveTextContent("2");
    expect(pageLinks[2]).toHaveTextContent("3");
  });

  it("should render per page options correctly", () => {
    const { container } = render(
      <PaginationResults
        pageNumber={2}
        totalPages={5}
        perPage={20}
        handlePerPage={mockHandlePerPage}
      />
    );

    const perPageOptions = container.querySelectorAll(".pag-rez-item");
    expect(perPageOptions).toHaveLength(3);
    expect(perPageOptions[0]).toHaveTextContent("10");
    expect(perPageOptions[1]).toHaveTextContent("20");
    expect(perPageOptions[2]).toHaveTextContent("30");
    expect(perPageOptions[1]).toHaveClass("current");
  });

  it("should call handlePerPage with correct arguments on per page item click", () => {
    render(
      <PaginationResults
        pageNumber={2}
        totalPages={5}
        perPage={10}
        handlePerPage={mockHandlePerPage}
      />
    );

    const perPageItem = screen.getAllByText(20);
    fireEvent.click(perPageItem[0]);

    expect(mockHandlePerPage).toHaveBeenCalledWith(20);
  });

});