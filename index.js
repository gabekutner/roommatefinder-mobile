/**
 * @format
 */
import React from "react";
import {AppRegistry} from "react-native";
import {PaperProvider} from "react-native-paper";
import App from "./src/App";
import {name as appName} from "./app.json";

/** edit theme here ... */
const customTheme = {
  // ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    primary: "#132331", // key components
    secondary: "#FFFFFF", // less prominent components
    tertiary: "#BE0000", // contrasting accents
    onTertiary: "#890000",

    // tertiaryDark: "#890000",

    background: "#F2F1E2",

    error: "#",
    surfaceVariant: "#D9DBCE", // medium emphasis on background
    surfaceDisabled: "#", // disabled state

    // custom
    _tint_primary: "#5A6773",
    _tint_secondary: "#B8BBBD",
  },
};

function Main() {
  return (
    <PaperProvider theme={customTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
