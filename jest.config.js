module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest.setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Adiciona babel-jest para transformar JS e ESM
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-redux))',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^react-native-localize$': '<rootDir>/__mocks__/react-native-localize.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@api/(.*)$': '<rootDir>/src/services/API/$1',
    '^@i18n/(.*)$': '<rootDir>/src/services/i18n/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
  },
};
