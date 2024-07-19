import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    padding: 4,
    paddingRight: 12
  },
  bubble: {
    // backgroundColor:colors.accent,
    borderRadius: 21,
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    marginLeft: 8,
    minHeight: 35
  },
  text: {
    // color:colors.white,
    lineHeight: 18,
    fontSize: 14
  }
});