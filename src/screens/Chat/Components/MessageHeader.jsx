import React from "react";
import {
  View,
  StyleSheet
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from "react-native-size-matters";

import Thumbnail from "../../../components/Thumbnail";
import CustomText from "../../../components/UI/Custom/CustomText";
import CustomButton from "../../../components/UI/Custom/CustomButton";


export default function MessageHeader({ 
	navigation, 
	friend, 
	colors 
}) {
	return  (
		<View style={styles.container}>
			<CustomButton
				onClick={() => navigation.goBack()}
				style={styles.button}
			>
				<FontAwesomeIcon 
					icon='arrow-left'
					size={verticalScale(19)}
					color={colors.tint}
				/>
			</CustomButton>
			<Thumbnail
				url={friend.thumbnail}
				size={verticalScale(27)}
			/>
			<CustomText style={{ ...styles.name, color:colors.tint }}>
				{friend.name}
			</CustomText>			
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    flexDirection:'row', 
    alignItems:'center'
  },
  button: {
    marginRight:moderateScale(24),
    borderWidth:0,
  },
  name: {
    marginLeft:10,
    fontSize:verticalScale(15),
    fontWeight:'600',
  }
})