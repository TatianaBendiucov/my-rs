import { render, screen } from "@testing-library/react";
import Body from "../src/components/Body";
import { SearchResult } from "../src/types/SearchTypes";

jest.mock("../src/components/ListItem", () => ({
    __esModule: true,
    default: ({ item }: { item: SearchResult }) => <div>{item.name}</div>,
}));

describe("Body", () => {
    const mockResults: SearchResult[] = [
        { uid: "1", name: "Animal 1", earthAnimal: 'true' },
        { uid: "2", name: "Animal 2", earthAnimal: 'false' },
    ];

    it("should render loading state", () => {
        render(
            <Body
                loading={true}
                results={[]}
                pageNumber={1}
            />
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render results correctly", () => {
        render(
            <Body
                loading={false}
                results={mockResults}
                pageNumber={1}
            />
        );

        expect(screen.getByText("Animal 1")).toBeInTheDocument();
        expect(screen.getByText("Animal 2")).toBeInTheDocument();
    });

    it("should render no results message when results array is empty", () => {
        render(
            <Body
                loading={false}
                results={[]}
                pageNumber={1}
            />
        );

        expect(screen.getByText("No results")).toBeInTheDocument();
    });
});