import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useItemDetailQuery } from "../src/store/listFetchReducer";
import DetailPageClient from "../src/components/DetailPageClient";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../src/store/listFetchReducer", () => ({
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
  const useSearchParamsMock = useSearchParams as jest.Mock;
  const useItemDetailQueryMock = useItemDetailQuery as jest.Mock;
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    useSearchParamsMock.mockReturnValue(
      new URLSearchParams("page=1&perPage=10"),
    );

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

    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith("/search?page=1&perPage=10");
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
