import React from "react";
import {View} from 'react-native';

import CustomText from "../../../../../../components/UI/Custom/CustomText";

import {styles} from "../messageBubble.styles";


function MessageBubbleMe(props) {
	return (
		<View style={styles.container}>
			<View style={{flex: 1}} />
			<View 
				style={[
					styles.bubble,
					{
						backgroundColor: props.theme.colors.secondary,
						marginRight: 8
					}
				]}
			>
				<CustomText 
					fontSize="large" 
					style={{
						fontFamily: 'SuezOne-Regular', 
						color: props.theme.colors.tertiary
					}}
				>
					Me
				</CustomText>
				<CustomText 
					fontSize="medium" 
					style={[
						styles.text,
						{color: props.theme.colors.primary}
					]}
				>
					{props.message.text}
				</CustomText>
			</View>
		</View>
	);
};

export {MessageBubbleMe};