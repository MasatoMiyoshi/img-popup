module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.js"
  ],
  coverageDirectory: "coverage",
  moduleDirectories: [
    "src",
    "node_modules"
  ],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },
  roots: [
    "<rootDir>/test"
  ],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/*test.js"
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!animejs)/"
  ]
};
