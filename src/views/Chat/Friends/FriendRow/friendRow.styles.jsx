import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 15,
    justifyContent: 'center' 
  },
  name: {
    fontWeight: '600', 
    marginBottom: 4,
  },
  wrapper: {
    flexDirection: 'row',
		gap: 5
  }
});