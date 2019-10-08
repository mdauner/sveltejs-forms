module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'jest-transform-svelte',
  },
  moduleFileExtensions: ['js', 'svelte'],
  roots: ['<rootDir>/tests'],
  bail: false,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,svelte}'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
};
