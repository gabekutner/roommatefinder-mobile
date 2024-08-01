/** 
 * theming declaration
 * @deprecated react-native-paper useTheme
 * @NOTE for avoiding theme related typechecks import theme 
 * and themeType from this file  
 */
import { DefaultTheme } from "react-native-paper";

export const theme = {
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

export type themeType = typeof theme;