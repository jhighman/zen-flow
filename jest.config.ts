import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  // Configure ts-jest for TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },  
  // The rest of your Jest configuration...
  clearMocks: true,
  coverageProvider: "v8",
};

export default config;
