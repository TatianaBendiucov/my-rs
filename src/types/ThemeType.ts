export interface Theme {
    '--primary-color': string;
    '--secondary-color': string;
    '--background-color': string;
    '--text-color': string;
    '--text-color-popup': string;
    '--link-color': string;
    '--link-hover-color': string;
    '--button-bg-color': string;
    '--button-hover-bg-color': string;
    'font-family': string;
    'line-height': string;
    'font-weight': string;
    'color-scheme': string;
    'color': string;
    'background-color': string;
    'font-synthesis': string;
    'text-rendering': string;
    '-webkit-font-smoothing': string;
    '-moz-osx-font-smoothing': string;
    '-webkit-text-size-adjust': string;
  }
  
  export interface ThemeContextType {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
  }