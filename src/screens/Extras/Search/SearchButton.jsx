import React from "react";
import { StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from "react-native-size-matters";

import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";


export default function SearchButton({ user }) {
  const requestConnect = useGlobal(state => state.requestConnect)
	// add tick if user is already connected
	if (user.status === 'connected') {
		return (
			<FontAwesomeIcon
				icon='circle-check'
				size={verticalScale(30)}
				color={colors.tint}
				style={{ marginRight:10 }}
			/>
		)
	}
	const data = {}
	switch (user.status) {
		case 'no-connection':
			data.text = 'Add'
			data.disabled = false
			data.onPress = () => requestConnect(user.id)
			break
		case 'pending-them':
			data.text = 'Pending'
			data.disabled = true
			data.onPress = () => {}
			break
		case 'pending-me':
			data.text = 'Accept'
			data.disabled = false
			data.onPress = () => {}
			break
		default: break
	}

	return (
		<CustomButton
			onClick={data.onPress}
			disabled={data.disabled}
			style={{ ...styles.button, backgroundColor: data.disabled ? '#708E99' : colors.accent }}
		>
			<CustomText style={styles.text}>
				{data.text}
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