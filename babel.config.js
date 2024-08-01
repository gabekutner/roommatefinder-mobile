module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [  
    "react-native-paper/babel",
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./src/components",
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: [
        "react-native-paper/babel"
      ]
    }
  }
};