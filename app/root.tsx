import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { ReduxProvider } from "./store/reduxProvider";
import { Outlet, Scripts } from "@remix-run/react";

const App = () => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <ThemeProvider>
          <ReduxProvider>
            <ErrorBoundary
              fallback={<p>ErrorBoundary: Something went wrong.</p>}
            >
              <Outlet />
            </ErrorBoundary>
          </ReduxProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
};

export default App;
