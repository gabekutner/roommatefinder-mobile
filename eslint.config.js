// import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    // languageOptions: { 
    //   globals: globals.browser,
    // },
    settings: {
      react: {
        version: 'detect' // React version. 'detect' automatically picks the version from your package.json
        // Alternatively, you can set it manually like this:
        // version: '16.13.1'
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  
];