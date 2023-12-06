import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/client/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/client/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
  testMatch: [
    "<rootDir>/client/__tests__/**/*.(ts|tsx)",
    "<rootDir>/client/src/**/*.test.(ts|tsx)",
    "<rootDir>/client/src/components/**/tests/*.test.(ts|tsx)", // Include tests in any subfolder within components
    "<rootDir>/client/src/pages/**/tests/*.test.(ts|tsx)",
  ],
};

export default config;
