import React from "react";
import { StyleSheet } from "react-native";

import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function RequestAccept({ item }) {
	const requestAccept = useStore(state => state.requestAccept)
	return (
		<CustomButton onClick={() => requestAccept(item.sender.id)} style={styles.button}>
			<CustomText style={styles.text}>
				Accept
			</CustomText>
		</CustomButton>
	)
}

const styles = StyleSheet.create({
  button: {
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    borderColor:colors.tint,
    backgroundColor:colors.accent,
    paddingHorizontal:moderateScale(16),
    shadowColor: '#222',
    shadowOffset: { width: 3, height: 1.75 },
    shadowOpacity: 1,
    shadowRadius: 1,  
  },
  text: {
    fontWeight:'600', 
    fontSize:verticalScale(12),
    color:colors.white,
  }
})