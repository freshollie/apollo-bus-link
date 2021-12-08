module.exports = {
  preset: "ts-jest",
  resetMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: ["**/src/**/*.{ts,tsx}"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.worker.[t|j]sx?$": "workerloader-jest-transformer"
  }
};
