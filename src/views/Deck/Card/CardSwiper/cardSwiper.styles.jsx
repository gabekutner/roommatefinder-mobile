import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10
  },
  wrapper: {
    flex:.85,
    borderRadius:12,
    overflow:'hidden',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});