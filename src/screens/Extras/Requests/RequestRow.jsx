import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Cell from "../../../components/Cell";
import Thumbnail from "../../../components/Thumbnail";
import RequestAccept from "./RequestAccept";
import CustomButton from "../../../components/UI/Custom/CustomButton";
import CustomText from "../../../components/UI/Custom/CustomText";

import useGlobal from "../../../core/global";
import utils from "../../../core/utils";
import { colors } from "../../../constants/colors";


export default function RequestRow({ navigation, item }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
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
					size={76}
				/>
			</CustomButton>
			<View style={{ flex:1, paddingHorizontal:16 }} >
				<CustomText style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }}>
					{item.sender.name}
				</CustomText>
				<CustomText style={{ color:colors.tint }}>
					{message} <CustomText style={{ color:colors.tint, fontSize:13 }}>
						{utils.formatTime(item.created)}
					</CustomText>
				</CustomText>
			</View>
			<RequestAccept item={item} colors={colors} />
		</Cell>
	)
}