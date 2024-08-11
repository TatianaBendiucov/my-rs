import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../app/components/Header";

jest.mock("../app/components/ThemeComponent", () => () => <div>Mocked ThemedComponent</div>);

describe("Header", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ThemedComponent correctly", () => {
    render(
      <Header
        searchText="test"
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByText("Mocked ThemedComponent")).toBeInTheDocument();
  });

  it("should render the input and button correctly", () => {
    render(
      <Header
        searchText="test"
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("should update the input value when typing", () => {
    render(
      <Header
        searchText="test"
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "new search term" } });

    expect(input).toHaveValue("new search term");
  });

  it("should call onSearch with the input value when Search button is clicked", () => {
    render(
      <Header
        searchText="test"
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "new search term" } });
    fireEvent.click(screen.getByText("Search"));

    expect(mockOnSearch).toHaveBeenCalledWith("new search term");
  });

  it("should not call onSearch if input is empty when Search button is clicked", () => {
    render(
      <Header
        searchText="test"
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByText("Search"));

    expect(mockOnSearch).toHaveBeenCalledWith("");
  });
});