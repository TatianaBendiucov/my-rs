import { render, screen } from "@testing-library/react";
import { useLoaderData } from "@remix-run/react";
import SearchPage from "../app/routes/search";
import { createMockStore } from "./mockStore";
import { Provider } from "react-redux";

jest.mock("../app/components/SearchPageClient", () => {
    return function MockSearchPageClient() {
        return <div>Search Page Client Mock</div>;
    };
});

jest.mock("@remix-run/node", () => ({
    json: jest.fn(),
    LoaderFunction: jest.fn(),
}));

jest.mock("@remix-run/react", () => ({
    useLoaderData: jest.fn(),
}));

describe("SearchPage", () => {

    let store: ReturnType<typeof createMockStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        store = createMockStore({
            items: {
              values: [
                { uid: "1", name: "Lion", earthAnimal: true },
                { uid: "2", name: "Penguin", earthAnimal: false },
              ],
            },
          });
    });

    it("should render SearchPageClient with initial data", () => {
        (useLoaderData as jest.Mock).mockReturnValue({
            initialData: { items: [] },
            searchTerm: "test",
            pageNumber: 1,
            perPage: 10,
        });

        render(

            <Provider store={store}>
                <SearchPage />
            </Provider>
        );

        expect(screen.getByText("Search Page Client Mock")).toBeInTheDocument();
    });
});