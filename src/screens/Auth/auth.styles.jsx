import { StyleSheet } from "react-native";

import {colors} from "../../constants/colors";
import {shadow} from "../../styles/styles";
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImageStyle: {opacity: 0.6},

  card: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    ...(sizes.borderRadius),
    ...(sizes.borderWidth),
    marginHorizontal:65,
    backgroundColor:colors.primary,
    ...(shadow.shadow),
  },
  
  title: {
    marginVertical:4,
    ...(fonts.fontBold),
  },

  inputContainer: {
    ...(sizes.borderWidth),
    backgroundColor:colors.secondary,
    borderColor:colors.tint   
  },

  text: {color: colors.tint},

});