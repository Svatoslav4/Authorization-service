module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    roots: ["<rootDir>/src/tests"],

    testMatch: [
        "**/*.test.ts"
    ],

    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};