import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { verticalScale, moderateScale } from "react-native-size-matters";

import Cell from "../../../components/Cell";
import Thumbnail from "../../../components/Thumbnail";
import RequestAccept from "./RequestAccept";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

// import useGlobal from "../../../core/global";
import useStore from "../../../zustand/store";
import utils from "../../../core/utils";
import { colors } from "../../../constants/colors";


export default function RequestRow({ navigation, item }) {

	const user = useStore(state => state.user)
	const getSwipeProfile = useStore(state => state.getSwipeProfile)
	const [profile, setProfile] = useState()

	useEffect(() => {
		async function fetchData() {
			const profile = await getSwipeProfile(user, item.sender.id)
			const userData = await profile.data
			setProfile(userData)
		}
		fetchData()
	}, [getSwipeProfile, user, item])

	const message = 'Requested to connect with you'

	return (
		<Cell colors={colors}>
			<CustomButton style={{ borderWidth:0 }} onClick={() => navigation.navigate('profile-detail', { item:profile })}>
				<Thumbnail
					url={item.sender.thumbnail}
					size={verticalScale(60)}
					borderColor={colors.tint}
				/>
			</CustomButton>
			<View style={styles.textContainer} >
				<CustomText style={styles.text}>
					{item.sender.name}
				</CustomText>
				<CustomText style={{ color:colors.tint }}>
					{message} <CustomText style={{ color:colors.tertiary, fontSize:verticalScale(11) }}>
						{utils.formatTime(item.created)}
					</CustomText>
				</CustomText>
			</View>
			<RequestAccept item={item} colors={colors} />
		</Cell>
	)
}

const styles = StyleSheet.create({
	textContainer: {
    flex:1, 
    paddingHorizontal:moderateScale(16)
  },
	text: {
		fontWeight:'600', 
    fontSize:verticalScale(14), 
    color:colors.tint, 
    marginBottom:verticalScale(4)
	}
})