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
    '/src/hooks/useSearchQuery.tsx',
    '/src/types/DetailType.ts',
    '/src/types/ErrorBoundaryTypes.ts',
    '/src/types/SearchTypes.ts',
    '/src/types/ThemeType.ts',
    '/app/layout.ts',
  ],
};

export default config;
