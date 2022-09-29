/* eslint-disable */
export default {
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  coverageDirectory: '../../coverage/apps/api',
  displayName: 'api',
  testEnvironment: 'node',
};
