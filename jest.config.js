module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'jest-transform-svelte',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$'],
  moduleFileExtensions: ['js', 'svelte'],
  roots: ['<rootDir>/tests'],
  bail: false,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,svelte}', 'src/utils.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
