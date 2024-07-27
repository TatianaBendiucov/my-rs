import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../src/pages/DetailPage';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockStore } from '../tests/mockStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams('detail=123&page=1')]),
  useParams: jest.fn().mockReturnValue({ detail: '123' }),
}));

jest.mock('../src/store/listFetchReducer', () => ({
  ...jest.requireActual('../src/store/__mocks__/listFetchReducer'),
  useSearchItemsQuery: jest.fn(),
  useItemDetailQuery: jest.fn(),
}));

const { useItemDetailQuery } = require('../src/store/listFetchReducer');

describe('DetailPage', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (require('react-router-dom').useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('detail=123&page=1'),
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator initially', async () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
      fulfilledTimeStamp: Date.now(),
      originalArgs: '123',
      currentData: { animal: { uid: '123', name: 'Fluffy', earthAnimal: true } },
    });

    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/details/:detail" element={<DetailPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Animal detail:')).toBeInTheDocument());
  });

  test('renders fetched data correctly', async () => {
    const mockDetail = {
      uid: '123',
      name: 'Lion',
      earthAnimal: true,
      earthInsect: false,
      avian: false,
      canine: false,
      feline: true,
    };

    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: { animal: mockDetail },
      error: null,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/details/:detail" element={<DetailPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Lion')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('123')).toBeInTheDocument());
  });

  test('Ensure that clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/details/:detail" element={<DetailPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/?page=1`));
  });
  
});