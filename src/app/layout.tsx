import { ReactNode } from "react";
import { ThemeProvider } from "../../app/context/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";
import "../index.css";
import { ReduxProvider } from "src/store/reduxProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <ThemeProvider>
          <ReduxProvider>
            <ErrorBoundary
              fallback={<p>ErrorBoundary: Something went wrong.</p>}
            >
              {children}
            </ErrorBoundary>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
