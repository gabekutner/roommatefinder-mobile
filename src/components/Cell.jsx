import React from "react";
import { 
  View,
 } from "react-native";

export default function Cell({ children, colors }) {
	return (
		<View
			style={{
				paddingHorizontal: 20,
				flexDirection: 'row',
				alignItems: 'center',
				borderBottomWidth: .3,
				borderColor: colors.tertiary,
				height: 106
			}}
		>
			{children}
		</View>
	)
}