module.exports = {
    preset: 'jest-expo',
    setupFiles: [
        './node_modules/react-native-gesture-handler/jestSetup.js',
        './jest.setup.js',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.tsx',
        'hooks/**/*.ts',
        'services/**/*.ts',
        'utils/**/*.ts*',
        'contexts/**/*.tsx',
        'core/**/*.ts*',
        'redux/**/*.ts',
        'storage/**/*.ts',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
