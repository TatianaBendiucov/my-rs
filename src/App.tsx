import ErrorBoundary from "./components/ErrorBoundary";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
      <MainPage params={{}} />
    </ErrorBoundary>
  );
}

export default App;
