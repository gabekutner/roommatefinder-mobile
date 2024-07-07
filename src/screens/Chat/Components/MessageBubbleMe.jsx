import React from "react";
import {  View, StyleSheet } from 'react-native';

import { verticalScale, moderateScale } from "react-native-size-matters";

import CustomText from "../../../components/UI/Custom/CustomText";

import { colors } from "../../../constants/colors";


export default function MessageBubbleMe({ text }) {
	return (
		<View style={styles.container}>
			<View style={{ flex:1 }} />
			<View style={styles.bubble}>
				<CustomText style={styles.text}>
					{text}
				</CustomText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    padding:verticalScale(4),
    paddingRight:moderateScale(12)
  },
  bubble: {
    backgroundColor:colors.tertiary,
    borderRadius:21,
    maxWidth:'75%',
    paddingHorizontal:moderateScale(16),
    paddingVertical:verticalScale(10),
    justifyContent:'center',
    marginRight:moderateScale(8),
    minHeight:verticalScale(35),
  },
  text: {
    color:'white',
    fontSize:verticalScale(16),
    lineHeight:18,
    fontSize:verticalScale(13)
  }
})