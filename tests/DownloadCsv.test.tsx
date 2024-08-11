import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { saveAs } from "file-saver";
import DownloadCsv from "../app/components/DownloadCsv";
import { createMockStore } from "./mockStore";

jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

describe("DownloadCsv Component", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [
          { uid: "1", name: "Lion", earthAnimal: true },
          { uid: "2", name: "Penguin", earthAnimal: false },
        ],
      },
    });
  });

  test("renders correctly with selected items", () => {
    render(
      <Provider store={store}>
        <DownloadCsv />
      </Provider>,
    );

    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Unselect all/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Download/i }),
    ).toBeInTheDocument();
  });

  test("unselects all items when the button is clicked", () => {
    const dispatch = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <DownloadCsv />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Unselect all/i }));
    expect(dispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: "item/removeAll",
    });
  });

  test("downloads CSV when the download button is clicked", () => {
    render(
      <Provider store={store}>
        <DownloadCsv />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Download/i }));

    expect(saveAs).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), "2_animals.csv");
  });

  test("does not render if no items are selected", () => {
    store = createMockStore({
      items: {
        values: [],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <DownloadCsv />
      </Provider>,
    );

    expect(container.querySelector("footer")).toBeEmptyDOMElement();
  });
});
