import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../app/components/ErrorBoundary";

const ProblematicComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error("Test error");
    }
    return <div>No error</div>;
};

describe("ErrorBoundary", () => {
    const fallbackUI = "Something went wrong!";
    
    // Suppress console errors during tests because of the throw error in ProblematicComponent
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
        (console.warn as jest.Mock).mockRestore();
    });
    it("should render fallback UI when an error is caught", () => {
        render(
            <ErrorBoundary fallback={fallbackUI}>
                <ProblematicComponent shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText(fallbackUI)).toBeInTheDocument();
    });

    it("should render children if no error is caught", () => {
        render(
            <ErrorBoundary fallback={fallbackUI}>
                <ProblematicComponent shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.getByText("No error")).toBeInTheDocument();
    });
});