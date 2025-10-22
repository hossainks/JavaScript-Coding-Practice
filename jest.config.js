module.exports = {
  testEnvironment: "node",

  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "json-summary", "text-summary", "text", "html"],

  // ignore all Playwright tests
  testPathIgnorePatterns: ["/node_modules/", "/test-e2e/"],

  // Reporters configuration
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./reports",
        outputName: "junit.xml",
      },
    ],
  ],
};
