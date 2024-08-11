import { render, screen } from "@testing-library/react";
import { ReduxProvider } from "../src/store/reduxProvider";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("ReduxProvider", () => {
  it("should render children with Redux store", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ someState: "test" });

    render(
      <ReduxProvider>
        <div>Test Child Component</div>
      </ReduxProvider>
    );

    expect(screen.getByText("Test Child Component")).toBeInTheDocument();
  });
});