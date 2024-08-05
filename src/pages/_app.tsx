import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";
import { ThemeProvider } from "../context/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";
import "../index.css";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
          <Component {...props.pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
