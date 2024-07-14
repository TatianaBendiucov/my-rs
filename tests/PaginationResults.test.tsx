import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaginationResults from '../src/components/PaginationResults';

describe('PaginationResults component', () => {
    it('updates URL query parameter when page changes', () => {
      const handlePerPage = jest.fn(); // Mock handlePerPage function
  
      const { container, getByText } = render(
        <MemoryRouter initialEntries={['/?page=1']} initialIndex={0}>
          <PaginationResults
            pageNumber={1}
            totalPages={5} // Replace with your total pages value
            perPage={10} // Replace with your initial perPage value
            handlePerPage={handlePerPage}
          />
        </MemoryRouter>
      );
  
      // Simulate clicking on a page link
      fireEvent.click(getByText('2')); // Replace '2' with the page number you want to click
  
      // Assert that handlePerPage was not called (since we are testing page change, not perPage change)
      expect(handlePerPage).not.toHaveBeenCalled();
  
      // Assert that the URL query parameter has been updated
      expect(container.innerHTML).toContain('?page=2');
    });
  });