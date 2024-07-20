import {StyleSheet} from "react-native";

import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    paddingHorizontal: 12,
    ...sizes.borderWidth,
    ...sizes.borderRadius,
  },
  title: {
    paddingTop: 15,
    paddingBottom: 8,
  },
  version: {paddingVertical: 10},

  text: {
    textAlign: "center",
    ...fonts.fontBold,
  },
});
