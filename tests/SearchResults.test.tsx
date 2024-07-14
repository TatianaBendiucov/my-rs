import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from '../src/pages/SearchPage';
import '@testing-library/jest-dom/extend-expect';

describe('SearchPage component', () => {

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

    it('saves entered search text to local storage on Search button click', async () => {
        const { getByText, getByRole } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const searchInput = getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'test search' } });

        const searchButton = getByText('Search');
        fireEvent.click(searchButton);
        await waitFor(() => expect(mockFetch).toHaveBeenCalled());
        await waitFor(() => expect(localStorage.getItem('searchText')).toBe('test search'));
    });

    it('retrieves search text from local storage upon mounting', async () => {
        localStorage.setItem('searchText', 'stored search');

        const { getByDisplayValue } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const searchInput = getByDisplayValue('stored search');

        await waitFor(() => expect(searchInput).toBeInTheDocument());
    });
});