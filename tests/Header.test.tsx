import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../src/components/Header';

jest.mock('../src/components/ThemeComponent', () => () => <div>ThemedComponent</div>);

describe('Header', () => {
  it('renders with initial search text and allows the user to search', () => {
    const mockOnSearch = jest.fn();
    const initialSearchText = 'initial text';

    render(<Header searchText={initialSearchText} onSearch={mockOnSearch} />);

    expect(screen.getByText('ThemedComponent')).toBeInTheDocument();

    const input = screen.getByDisplayValue(initialSearchText);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'new search text' } });
    expect(input).toHaveValue('new search text');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('new search text');
  });

  it('trims the input value before calling onSearch', () => {
    const mockOnSearch = jest.fn();
    const initialSearchText = '   initial text with spaces   ';

    render(<Header searchText={initialSearchText.trim()} onSearch={mockOnSearch} />);

    const input = screen.getByDisplayValue('initial text with spaces');
    fireEvent.change(input, { target: { value: '  new text  ' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('new text');
  });
});