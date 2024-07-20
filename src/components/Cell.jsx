import React from "react";
import { View } from "react-native";
import { moderateScale, verticalScale } from 'react-native-size-matters';


export default function Cell({ children }) {
	return (
		<View
			style={{
				paddingHorizontal: moderateScale(20),
				flexDirection: 'row',
				alignItems: 'center',
				borderBottomWidth: .3,
				height: verticalScale(90)
			}}
		>
			{children}
		</View>
	)
}