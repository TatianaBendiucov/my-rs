import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Theme, ThemeContextType } from "app/types/ThemeType";

const lightTheme: Theme = {
  "--primary-color": "#1e90ff",
  "--secondary-color": "#ff6347",
  "--background-color": "#f0f0f0",
  "--text-color": "#333",
  "--text-color-popup": "#c4b1b1",
  "--link-color": "#007bff",
  "--link-hover-color": "#0056b3",
  "--button-bg-color": "#007bff",
  "--button-hover-bg-color": "#0056b3",
  "font-family": "Tahoma, Geneva, Verdana, sans-serif;",
  "line-height": "1.6",
  "font-weight": "400",
  "color-scheme": "light",
  color: "var(--text-color)",
  "background-color": "var(--background-color)",
  "font-synthesis": "none",
  "text-rendering": "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "-webkit-text-size-adjust": "100%",
};

const darkTheme: Theme = {
  "--primary-color": "#1e90ff",
  "--secondary-color": "#ff6347",
  "--background-color": "#333333",
  "--text-color": "#f0f0f0",
  "--text-color-popup": "#c4b1b1",
  "--link-color": "#007bff",
  "--link-hover-color": "#0056b3",
  "--button-bg-color": "#007bff",
  "--button-hover-bg-color": "#0056b3",
  "font-family": "Tahoma, Geneva, Verdana, sans-serif;",
  "line-height": "1.6",
  "font-weight": "400",
  "color-scheme": "dark",
  color: "var(--text-color)",
  "background-color": "var(--background-color)",
  "font-synthesis": "none",
  "text-rendering": "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "-webkit-text-size-adjust": "100%",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
