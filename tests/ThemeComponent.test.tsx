import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemedComponent from '../app/components/ThemeComponent';
import { useTheme } from '../app/context/ThemeContext';

jest.mock('../app/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ThemedComponent', () => {
  it('renders the button and calls toggleTheme on click', () => {
    const mockToggleTheme = jest.fn();
    const mockTheme = 'light';

    (useTheme as unknown as jest.Mock).mockReturnValue({
      theme: mockTheme,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemedComponent />);

    const button = screen.getByText('Toggle Theme');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledWith(mockTheme);
  });
});