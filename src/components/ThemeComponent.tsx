import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemedComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;