import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,

    flexDirection: "row",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mt: {marginTop: 20},
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
