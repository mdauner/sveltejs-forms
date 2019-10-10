module.exports = {
  transform: {
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.svelte$': 'jest-transform-svelte',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lodash-es|svelte-writable-derived)).+\\.m?js$',
  ],
  moduleFileExtensions: ['js', 'svelte', 'mjs'],
  roots: ['<rootDir>/tests'],
  bail: false,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,svelte}', 'src/utils.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
