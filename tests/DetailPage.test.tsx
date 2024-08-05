import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useItemDetailQuery } from "../src/store/listFetchReducer";
import DetailPage from "../src/pages/details";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/store/listFetchReducer", () => ({
  useItemDetailQuery: jest.fn(),
}));

describe("DetailPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: "1", detail: "123" },
      push: mockPush,
    });
  });

  test("renders loading state", () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<DetailPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<DetailPage />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  test("renders data correctly", async () => {
    const mockData = {
      animal: {
        uid: "123",
        name: "Lion",
        earthAnimal: true,
        earthInsect: false,
        avian: false,
        canine: true,
        feline: true,
      },
    };

    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<DetailPage />);

    expect(await screen.findByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Lion")).toBeInTheDocument();
    expect(screen.getByText("Animal detail:")).toBeInTheDocument();
  });

  test("clicking Close button triggers router push", () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(<DetailPage />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith("/search?page=1");
  });
});
