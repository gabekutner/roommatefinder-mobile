import React, { useState, useEffect } from "react";
import { 
  ActivityIndicator, 
  FlatList, 
  View, 
  TouchableOpacity,
	SafeAreaView
} from "react-native";

import SwipeProfileModal from "../components/UI/SwipeProfileModal";
import CustomText from '../components/UI/Custom/CustomText';
import Empty from "../components/Empty";
import Cell from "../components/Cell";
import Thumbnail from "../components/Thumbnail";

import useGlobal from "../core/global";
import utils from "../core/utils";
import { colors as c } from '../assets/config';


function RequestAccept({ item, colors }) {

	const requestAccept = useGlobal(state => state.requestAccept)

	return (
		<TouchableOpacity
			onPress={() => {requestAccept(item.sender.id)}}
			style={{
				backgroundColor:colors.accent,
				paddingHorizontal:14,
				height:36,
				borderRadius:18,
				alignItems:'center',
				justifyContent:'center'
			}}
		>
			<CustomText style={{ color:colors.constWhite, fontWeight:'500' }}>Accept</CustomText>
		</TouchableOpacity>
	)
}


function RequestRow({ item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)

	const [show, setShow] = useState(false)
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
			<TouchableOpacity onPress={() => setShow(true)}>
				<Thumbnail
					url={item.sender.thumbnail}
					size={76}
				/>
			</TouchableOpacity>
			
			<View style={{ flex:1, paddingHorizontal:16 }} >
				<CustomText style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }}>
					{item.sender.name}
				</CustomText>
				<CustomText style={{ color:colors.tertiary }}>
					{message} <CustomText style={{ color:colors.tertiary, fontSize:13 }}>
						{utils.formatTime(item.created)}
					</CustomText>
				</CustomText>
			</View>

			<RequestAccept item={item} colors={colors} />

			{ show
			  ? 
					<SwipeProfileModal 
						item={profile}
						colors={colors}
						isVisible={show}
						setIsVisible={setShow}
					/>
				: null 
			}

		</Cell>
	)
}


export default function Requests() {

	const requestList = useGlobal(state => state.requestList)
	const theme = useGlobal(state => state.theme)
	const colors = c[theme]

	if (requestList === null) {
		return <ActivityIndicator style={{ flex:1, backgroundColor:colors.primary }} />
	}

	if (requestList.length === 0) {
		return <Empty icon='bell' message='No requests' colors={colors} />
	}

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
			<FlatList
				data={requestList}
				renderItem={({ item }) => (
					<RequestRow item={item} colors={colors} />
				)}
				keyExtractor={item => item.sender.id}
			/>
		</SafeAreaView>
	)
}