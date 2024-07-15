import {StyleSheet} from "react-native";

import {fonts} from "../../constants/fonts";
import {sizes} from "../../constants/sizes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: { flex: 1 },

  title: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 12,
    ...(sizes.borderWidth),
    ...(sizes.borderRadius),
  },

  versionContainer: {
		marginHorizontal:100,
    paddingVertical:10,
    ...(sizes.borderWidth),
    ...(sizes.borderRadius),
  },
  versionText: {
		textAlign:'center',
    ...(fonts.fontBold)
  }
})