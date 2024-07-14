import { render, screen } from "@testing-library/react";
import Body from "../src/components/Body";
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
    __esModule: true,
    Link: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

describe('SearchPage', () => {
    test('renders no results', async () => {
        render(
            <Body 
                loading={false}
                results={[]}
                pageNumber={1}
            />
        );
        
        expect(screen.getByText('No results')).toBeInTheDocument();
    });
    
    test('renders with results', async () => {
        render(
            <Body 
                loading={false}
                results={[
                    { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
                    { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
                    { uid: '3', name: 'Animal 3', earthAnimal: 'false' },
                ]}
                pageNumber={1}
            />
        );
        
        expect(screen.getByText('Animal 1')).toBeInTheDocument();
        expect(screen.getByText('Animal 2')).toBeInTheDocument();
        expect(screen.getByText('Animal 3')).toBeInTheDocument();
    });
});