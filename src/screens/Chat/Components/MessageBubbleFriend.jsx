import React from "react";
import {
  View,
  StyleSheet
} from 'react-native';

import { moderateScale, verticalScale } from "react-native-size-matters";

import MessageTypingAnimation from "./MessageTypingAnimation";
import Thumbnail from "../../../components/Thumbnail";
import CustomText from "../../../components/UI/Custom/CustomText";
import { colors } from "../../../constants/colors";


export default function MessageBubbleFriend({ text='', friend, typing=false, colors }) {
	return (
		<View style={styles.container}>
			<Thumbnail
				url={friend.thumbnail}
				size={42}
			/>
			<View style={styles.bubble}>
				{typing ? (
					<View style={{ flexDirection:'row' }}>
						<MessageTypingAnimation offset={0} />
						<MessageTypingAnimation offset={1} />
						<MessageTypingAnimation offset={2} />
					</View>
				) : (
					<CustomText style={styles.text}>
						{text}
					</CustomText>
				)}
			</View>
			<View style={{ flex:1 }} />
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
    backgroundColor:colors.accent,
    borderRadius:21,
    maxWidth:'75%',
    paddingHorizontal:moderateScale(16),
    paddingVertical:verticalScale(10),
    justifyContent:'center',
    marginLeft:moderateScale(8),
    minHeight:verticalScale(35),
  },
  text: {
    color:colors.white,
    fontSize:verticalScale(16),
    lineHeight:18,
    fontSize:verticalScale(13)
  }
})