import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  collectCoverageFrom: ['app/**'],
  modulePathIgnorePatterns: [
    '/app/root.tsx',
    '/app/routes/details.tsx',
    '/app/routes/search.tsx',
    '/app/hooks/useSearchQuery.tsx',
    '/app/types/DetailType.ts',
    '/app/types/ErrorBoundaryTypes.ts',
    '/app/types/SearchTypes.ts',
    '/app/types/ThemeType.ts'
  ],
};

export default config;
