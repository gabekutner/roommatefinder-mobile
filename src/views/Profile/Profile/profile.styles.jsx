import {StyleSheet} from "react-native";
import {colors} from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleWrapper: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  name: {
    color: colors.tint,
    fontWeight: "600",
    marginVertical: 15,
  },

  iconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },

  section: {
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginHorizontal: 25,
    marginTop: 15,
  },
});
