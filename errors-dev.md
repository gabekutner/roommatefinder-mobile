## How to deal with development errors related to the development.

> Not issues with the code but with watchman, react native, node, npm issues.

---

`error: unknown command 'run-ios'`

**Solutions**:

1. npm install -g npm@latest
2. npm install --save react-native@latest

---

`warning: Watchman `watch-project` returned a warning: Recrawled this watch 3 times`

**Solutions**:

1. watchman watch-del '/Users/gabekutner/Documents/GitHub/roommatefinder/roommatefinder-mobile/roommatefinder-mobile'
2. watchman watch-project '/Users/gabekutner/Documents/GitHub/roommatefinder/roommatefinder-mobile/roommatefinder-mobile'

---

`metro not starting properly`

**Solutions**:

1. https://stackoverflow.com/questions/74858915/react-native-metro-bundler-crashing
