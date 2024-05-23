// eslint.config.mjs
// npx eslint --no-warn-ignore "_.jsx"
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