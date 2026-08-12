module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    rootDir: ".",
    
    testMatch: [
        "<rootDir>/src/**/*.test.ts"
    ],

    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    baseUrl: ".",
                    rootDir: ".",
                    paths: {
                        "@/*": ["./src/*"]
                    }
                }
            }
        ]
    }
};