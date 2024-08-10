import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemedComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={() => toggleTheme(theme)}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;
