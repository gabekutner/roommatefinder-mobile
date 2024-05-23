// eslint.config.mjs
export default {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: "error",
    "prefer-const": "error",
  },
};