import {StyleSheet} from "react-native";
import {colors} from "../../../../constants/colors";

export const styles = StyleSheet.create({
  base: {color: colors.tint},

  text1: {
    fontWeight: "600",
    color: colors.white,
  },

  button: {
    borderWidth: 0,
    marginTop: 4,
  },

  text23: {
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.15,
    color: colors.tint,
  },
});
