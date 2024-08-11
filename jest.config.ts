import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },
  collectCoverageFrom: ['src/**'],  
  modulePathIgnorePatterns: [
    '/src/root.tsx',
    '/src/context/ThemeContext.tsx',
    '/src/store/store.ts',
    '/src/hooks/useSearchQuery.tsx',
    '/src/pages/_app.tsx',
    '/src/types/DetailType.ts',
    '/src/types/ErrorBoundaryTypes.ts',
    '/src/types/SearchTypes.ts',
    '/src/types/ThemeType.ts'
  ],
};

export default config;
