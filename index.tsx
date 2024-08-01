/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import App from "./src/App";
import { name as appName } from "./app.json";


const customTheme = {
  /**
   * Custom theme configuration for react-native-paper.
   */
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    primary: "#132331", // Key components
    secondary: "#FFFFFF", // Less prominent components
    tertiary: "#BE0000", // Contrasting accents
    onTertiary: "#890000", // Text color on tertiary background

    background: "#F2F1E2", // Background color

    error: "#FF0000", // Error color (default is red if empty)

    surfaceVariant: "#D9DBCE", // Medium emphasis on background
    surfaceDisabled: "#E0E0E0", // Disabled state (default is gray if empty)

    // Custom colors
    _tint_primary: "#5A6773", // Custom tint color for primary
    _tint_secondary: "#B8BBBD", // Custom tint color for secondary
  },
};


const Main: React.FC = () => {
  /**
   * Main component of the application.
   * Wraps the App component with PaperProvider to apply the custom theme.
   */
  return (
    <PaperProvider theme={customTheme}>
      <App />
    </PaperProvider>
  );
};

// Register the main component with AppRegistry
AppRegistry.registerComponent(appName, () => Main);