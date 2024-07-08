import React from "react";
import { View, StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomTextInput from "../../../components/UI/Custom/CustomInput";
import CustomButton from "../../../components/UI/Custom/CustomButton";

import { colors } from "../../../constants/colors";

export default function MessageInput({ 
	message, 
	setMessage, 
	onSend, 
	colors 
}) {
	return (
		<View style={styles.container}>
			<CustomTextInput
				placeholder="Message..."
				placeholderTextColor={colors.tertiary}
				value={message}
				onChangeText={setMessage}
				autoComplete={false}
				colors={colors}
				containerStyle={styles.inputContainer}
				inputStyle={{ color:colors.tint }}
			/>
			<CustomButton 
        onClick={onSend}
        style={{ borderWidth:0 }}
      >
				<FontAwesomeIcon
					icon='paper-plane'
					size={verticalScale(22)}
					color={colors.tint}
					style={{
						marginHorizontal: moderateScale(15),
						marginBottom:verticalScale(17)
					}}
				/>
			</CustomButton>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:moderateScale(7),
		paddingBottom:moderateScale(7),
    flexDirection:'row',
    alignItems:'center',
  },
  inputContainer: {
    // paddingLeft:moderateScale(8),
    // borderRadius:12,
    // height:verticalScale(45),
    // borderWidth:2,
    flex:1,
		marginBottom:verticalScale(14),
    backgroundColor:colors.secondary,
    borderWidth:2,
    borderColor:colors.tint,
  }
})