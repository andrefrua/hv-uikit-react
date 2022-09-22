module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)test.ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/jest-setup.ts"],
};