module.exports = {
  presets: ["module:@react-native/babel-preset"],
  env: {
    production: {
      plugins: [
        "react-native-paper/babel",
        [
          "module-resolver",
          {
            "root": ["./src"],
            "alias": {
              "@libs": "./libs"
            }
          }
        ]
      ]
    }
  }
};