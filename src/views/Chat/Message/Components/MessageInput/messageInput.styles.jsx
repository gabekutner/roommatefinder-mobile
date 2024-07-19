import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10, 
    flexDirection: 'row',
    gap: 10
  },
  button: {
    position: 'absolute',
    right: 12.5,
    bottom: 12.5,
    height: 50, 
    width: 50, 
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  }
});