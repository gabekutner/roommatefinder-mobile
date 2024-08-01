/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import App from "./src/App";
import { name as appName } from "./app.json";
import { theme } from "assets/theme";


const Main: React.FC = () => {
  /**
   * Main component of the application.
   * Wraps the App component with PaperProvider to apply the custom theme.
   */
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

// Register the main component with AppRegistry
AppRegistry.registerComponent(appName, () => Main);