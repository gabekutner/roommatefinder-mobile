import {StyleSheet} from "react-native";
import {scale} from "../../libs/react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trademarkContainer: {
    flex: 0.2, 
    justifyContent: "center", 
    paddingLeft: 15
  },
  font: {
    fontFamily: "SuezOne-Regular",
  },
  title: {
    paddingHorizontal: 20,
    flex: 0.7,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttons: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    gap: scale(7),
  },
  github: {
    width: scale(55),
    height: scale(55),
    // backgroundColor: theme.colors.primary,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  getStarted: {
    width: scale(250),
    height: scale(55),
    // backgroundColor: theme.colors.tertiary,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  }


});