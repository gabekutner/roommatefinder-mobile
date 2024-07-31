module.exports = {
  preset: "react-native",
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  "setupFiles": [
    "<rootDir>/setup-jest.js"
  ],
};
