import { fireEvent, render } from "@testing-library/react";
import PaginationResults from "../src/components/PaginationResults";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("PaginationResults component", () => {
  it("updates URL query parameter when page changes", () => {
    const handlePerPage = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: "1", perPage: "10" },
      push: jest.fn(),
    });

    const { getByText } = render(
      <PaginationResults
        pageNumber={1}
        totalPages={5}
        perPage={10}
        handlePerPage={handlePerPage}
      />,
    );

    const page2Link = getByText("2");
    expect(page2Link.closest("a")).toHaveAttribute(
      "href",
      "?page=2&perPage=10",
    );

    fireEvent.click(page2Link);

    expect(useRouter().push).not.toHaveBeenCalled();
  });

  it("calls handlePerPage with the correct value when per page changes", () => {
    const handlePerPage = jest.fn();

    const { getByText } = render(
      <PaginationResults
        pageNumber={1}
        totalPages={5}
        perPage={10}
        handlePerPage={handlePerPage}
      />,
    );

    fireEvent.click(getByText("20"));

    expect(handlePerPage).toHaveBeenCalledWith(20);
  });
});
