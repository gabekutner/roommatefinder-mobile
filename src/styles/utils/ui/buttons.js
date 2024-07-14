import { verticalScale } from "react-native-size-matters"
import { colors } from "../../../constants/colors"
/**
 * Button layout utility styles
 */
export default {
  base: {
    borderWidth:2,
    borderRadius:12,
    paddingVertical:verticalScale(15),
    alignItems:'center',
    justifyContent:'center'
  },
  standard: {
    backgroundColor:colors.accent,
    borderColor:colors.tint
  },
  outline: {
    backgroundColor:colors.white,
    borderColor:colors.accent
  },
}