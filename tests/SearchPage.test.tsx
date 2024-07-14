import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchPage from '../src/pages/SearchPage';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { SearchResult, SearchResultsProps } from 'src/types/SearchTypes';
import ListItem from '../src/components/ListItem';
import DetailPage from '../src/pages/DetailPage';

jest.mock('../src/components/Body', () => ({ loading, results, pageNumber }: SearchResultsProps) => (
    <ul>
        {loading ? 'Loading...' : results.map((result: SearchResult) => (
            <li key={result.uid}>
                <p>Page Number: {pageNumber}</p>
                <div>{result.name}</div>
            </li>
        ))}
    </ul>
));
jest.mock('../src/components/PaginationResults', () => () => <div>PaginationResults</div>);
jest.mock('../src/hooks/useSearchQuery', () => () => ['test', jest.fn()]);
jest.mock('../src/pages/DetailPage', () => () => (<div>Animal details:</div>));

describe('SearchPage', () => {

    const mockFetch = jest.fn();
    const mockFetchResponse = {
        animals: [
            { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
            { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
        ],
        page: { totalPages: 1 },
    };


    beforeEach(() => {
        global.fetch = mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockFetchResponse),
        } as Response);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders card component with relevant data', async () => {

        render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Search')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText('Animal 1')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Animal 2')).toBeInTheDocument());
    });

    it('opens detailed card component when a card is clicked', async () => {
        const item: SearchResult = { uid: '1', name: 'Animal 1', earthAnimal: 'true' };
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <ListItem
                                    {...{
                                        item: item,
                                        index: 1,
                                        pageNumber: 1,
                                    }}
                                />
                                <Outlet />
                            </>
                        }
                    >
                        <Route path="details" element={<DetailPage />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Animal 1')).toBeInTheDocument());
        await waitFor(() => fireEvent.click(screen.getByText('Animal 1')));

        await waitFor(() => expect(screen.getByText('Animal details:')).toBeInTheDocument());
    });
});