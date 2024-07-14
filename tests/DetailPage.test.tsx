import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../src/pages/DetailPage';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams('detail=123&page=1')]),
  useParams: jest.fn().mockReturnValue({ detail: '123' }),
}));

describe('DetailPage', () => {
  const mockNavigate = jest.fn();
  const mockFetch = jest.fn();

  beforeEach(() => {
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (require('react-router-dom').useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('detail=123&page=1'),
    ]);
    
    global.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ animal: { uid: '123', name: 'Fluffy', earthAnimal: true } }),
    } as Response);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator initially', async () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Routes>
          <Route path="/details/:detail" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Animal detail:')).toBeInTheDocument());
  });

  it('renders fetching of data', async () => {
    const mockDetail = {
      uid: '123',
      name: 'Lion',
      earthAnimal: true,
      earthInsect: false,
      avian: false,
      canine: false,
      feline: true,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ animal: mockDetail }),
    });

    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Routes>
          <Route path="/details/:detail" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://stapi.co/api/v1/rest/animal?uid=123', {
        method: 'GET',
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Lion')).toBeInTheDocument();
      expect(screen.getByText('123')).toBeInTheDocument();
    });
  });

  test('Ensure that clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Routes>
          <Route path="/details/:detail" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/?page=1`));
  });
  
});