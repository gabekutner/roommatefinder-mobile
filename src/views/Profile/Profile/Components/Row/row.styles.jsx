import {StyleSheet} from "react-native";
import {colors} from "../../../../../constants/colors";

export const styles = StyleSheet.create({
  rowWrapper: {
    borderWidth: 2,  
    borderColor: colors.tint,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
  },

  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 1,
  },
  rowMiddle: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  rowLast: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1
  },

  row: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rowLabel: {
    color: colors.tint,
    fontWeight: '500',
    letterSpacing: 0.24,
  },
  spacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },


});