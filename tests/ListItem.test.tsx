import { render, fireEvent } from "@testing-library/react";
import ListItem from "../app/components/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { addOrRemove } from "../app/store/itemReducer";
import { ListItemProps, SearchResult } from "../app/types/SearchTypes";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@remix-run/react", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("ListItem component", () => {
  const item: SearchResult = {
    uid: "1",
    name: "Test Item",
    earthAnimal: "true",
  };

  const defaultProps: ListItemProps = {
    item,
    index: 0,
    pageNumber: 1,
    perPage: 10
  };

  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the checkbox as checked if the item is in the store", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([item]);

    const { getByRole } = render(<ListItem {...defaultProps} />);

    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("renders the checkbox as unchecked if the item is not in the store", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    const { getByRole } = render(<ListItem {...defaultProps} />);

    const checkbox = getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("dispatches the addOrRemove action when the checkbox is clicked", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    const { getByRole } = render(<ListItem {...defaultProps} />);

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(addOrRemove(item));
  });
});
