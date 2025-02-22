export const preset = 'jest-expo';
export const setupFiles = [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js'
];
export const moduleNameMapper = {
    '^@/(.*)$': '<rootDir>/$1'
};
export const collectCoverage = true;
export const collectCoverageFrom = [
    'components/**/*.tsx',
    'hooks/**/*.ts',
    'services/**/*.ts',
    'utils/**/*.ts*',
    'contexts/**/*.tsx',
    'core/**/*.ts*',
    'redux/**/*.ts',
    'storage/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**'
];
export const coverageReporters = ['json', 'lcov', 'text', 'clover'];
