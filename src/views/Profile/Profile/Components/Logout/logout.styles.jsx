import {StyleSheet} from "react-native";
import {colors} from "../../../../../constants/colors";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 12, 
    borderWidth: 2,
    borderColor: colors.tint,
    shadowColor: colors.tint,
    shadowRadius: .6,
    shadowOpacity: .7,
    shadowOffset: {
      height: 1.5,
      width: 2
    }
  }
});