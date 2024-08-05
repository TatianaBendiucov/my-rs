import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSearchItemsQuery } from "../src/store/listFetchReducer";
import SearchPage from "../src/pages/search";
import { Provider } from "react-redux";
import { mockStore } from "./mockStore";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/store/listFetchReducer", () => ({
  useSearchItemsQuery: jest.fn(),
}));

jest.mock("../src/components/Header", () => () => <div>Header Mock</div>);
jest.mock("../src/components/DownloadCsv", () => () => (
  <div>DownloadCsv Mock</div>
));
jest.mock("../src/components/PaginationResults", () => () => (
  <div>PaginationResults Mock</div>
));
jest.mock("../src/components/ListItem", () => (props) => (
  <div> {props.item.name}</div>
));

describe("SearchPage Component", () => {
  it("renders loading state correctly", async () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });

    render(<SearchPage pageNumber={1} perPage={10} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<SearchPage pageNumber={1} perPage={10} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("renders data correctly", async () => {
    const mockData = {
      animals: [
        { uid: "1", name: "Lion", earthAnimal: true },
        { uid: "2", name: "Tiger", earthAnimal: true },
      ],
      page: { pageNumber: 1, totalPages: 1 },
    };

    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <SearchPage pageNumber={1} perPage={10} />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Lion")).toBeInTheDocument();
      expect(screen.getByText("Tiger")).toBeInTheDocument();
    });
  });
});
