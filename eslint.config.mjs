import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    )
  ),
  {
    parser: "@typescript-eslint/parser",
    plugins: {
      react: fixupPluginRules(react),
      "react-native": fixupPluginRules(reactNative),
      "@typescript-eslint": fixupPluginRules(typescript),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...reactNative.environments["react-native"]["react-native"],
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "jsx-quotes": ["error", "prefer-double"],
      "react/prop-types": 0, // not a TypeScript project, remove type checking
      "react-native/no-raw-text": 0, // check back later
      "react-native/no-inline-styles": 0, // remove inline styles formatting (for now)
      "@typescript-eslint/explicit-module-boundary-types": 0, // optional rule for TypeScript, adjust based on your needs
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // adjust as needed
      "@typescript-eslint/no-explicit-any": 0, // or change to "warn" based on preference
    },
  },
];