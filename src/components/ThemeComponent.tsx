import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemedComponent: React.FC = () => {
  const { toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;
