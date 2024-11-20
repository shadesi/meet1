module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], 
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
