import { render, screen, fireEvent } from "@testing-library/react";
import { useItemDetailQuery } from "../app/store/listFetchReducer";
import DetailPageClient from "../app/components/DetailPageClient";
import { useNavigate } from "@remix-run/react";

jest.mock("@remix-run/react", () => ({
  useNavigate: jest.fn(),
  useSearchParams: () => [
    new URLSearchParams("page=1&perPage=10"),
    jest.fn(),
  ],
}));

jest.mock("../app/store/listFetchReducer", () => ({
  useItemDetailQuery: jest.fn(),
}));

const initialData = {
  animal: {
    uid: "1",
    name: "Lion",
    earthAnimal: true,
    earthInsect: false,
    avian: false,
    canine: false,
    feline: true,
  },
};

const uid = "1";

describe("DetailPageClient", () => {
  const useItemDetailQueryMock = useItemDetailQuery as jest.Mock;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    useItemDetailQueryMock.mockReturnValue({
      data: initialData,
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<DetailPageClient initialData={initialData} uid={uid} />);

    expect(screen.getByText("Animal detail:")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Lion")).toBeInTheDocument();
    expect(screen.getByText("Earth Animal:")).toBeInTheDocument();
  });

  it("calls router.push when close button is clicked", () => {
    const { getByText } = render(
      <DetailPageClient initialData={initialData} uid={uid} />,
    );
    const closeButton = getByText("Close");

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search?page=1&perPage=10");
  });

  it("displays loading text when loading", () => {
    useItemDetailQueryMock.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<DetailPageClient initialData={undefined} uid={uid} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    useItemDetailQueryMock.mockReturnValueOnce({
      data: null,
      error: new Error("Error fetching data"),
      isLoading: false,
    });

    render(<DetailPageClient initialData={undefined} uid={uid} />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
