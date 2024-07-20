import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "react-native": fixupPluginRules(reactNative),
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    languageOptions: {
        globals: {
            ...reactNative.environments["react-native"]["react-native"],
        },
    },

    rules: {
        "jsx-quotes": ["error", "prefer-double"],
    },
}];