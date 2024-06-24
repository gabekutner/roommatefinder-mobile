import React, { useEffect, useState } from "react";
import { 
	FlatList,
	SafeAreaView, 
	TextInput, 
	TouchableOpacity, 
	View
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
	moderateScale, 
	verticalScale 
} from "react-native-size-matters";

import SwipeProfileModal from "../../components/UI/SwipeProfileModal";
import CustomText from '../../components/UI/Custom/CustomText';
import Empty from "../../components/Empty";
import Thumbnail from "../../components/Thumbnail";
import Cell from "../../components/Cell";

import useGlobal from "../../core/global";
import { colors } from '../../constants/colors';
import CustomTextInput from "../../components/UI/Custom/CustomInput";


function SearchButton({ user, colors }) {
	// add tick if user is already connected
	if (user.status === 'connected') {
		return (
			<FontAwesomeIcon
				icon='circle-check'
				size={30}
				color={colors.tint}
				style={{ marginRight:10 }}
			/>
		)
	}

	const requestConnect = useGlobal(state => state.requestConnect)
	
	const data = {}

	switch (user.status) {
		case 'no-connection':
			data.text = 'Add'
			data.disabled = false
			data.onPress = () => requestConnect(user.id)
			break
		case 'pending-them':
			data.text = 'Pending'
			data.disabled = true
			data.onPress = () => {}
			break
		case 'pending-me':
			data.text = 'Accept'
			data.disabled = false
			data.onPress = () => {}
			break
		default: break
	}

	return (
		<TouchableOpacity
			style={{
				backgroundColor: data.disabled ? '#708E99' : colors.accent,
				paddingHorizontal:14,
				height:36,
				alignItems:'center',
				justifyContent:'center',
				borderRadius:18
			}}
			disabled={data.disabled}
			onPress={data.onPress}
		>
			<CustomText
				style={{
					color:colors.white,
					fontWeight:'600',
				}}
			>
				{data.text}
			</CustomText>
		</TouchableOpacity>
	)
}


function SearchRow({ item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
	
	const [show, setShow] = useState(false)
	const [profile, setProfile] = useState()

	useEffect(() => {
		async function fetchData() {
			const profile = await getSwipeProfile(user, item.id)
			const userData = await profile.data
			setProfile(userData)
		}
		fetchData()
	}, [getSwipeProfile, user, item])

	return (
		<Cell colors={colors}>
			<TouchableOpacity onPress={() => setShow(true)}>
				<Thumbnail
					url={item.thumbnail}
					size={verticalScale(60)}
					borderColor={colors.secondary}
				/>
			</TouchableOpacity>
			<View style={{ flex:1, paddingHorizontal:16 }}>
				<CustomText style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }} >
					{item.name}
				</CustomText>	
			</View>
			<SearchButton user={item} colors={colors} />
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


export default function Search({ navigation }) {
	const [query, setQuery] = useState('')

	const searchList = useGlobal(state => state.searchList)
	const searchUsers = useGlobal(state => state.searchUsers)

	useEffect(() => {
		searchUsers(query)
	}, [query]) 

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
			<View 
				style={{
					flexDirection:'row',
					gap:moderateScale(20),
					alignItems:'center',
				}}
			>
				<TouchableOpacity 
					onPress={() => navigation.goBack()}
					style={{ paddingLeft:moderateScale(16) }}
				>
					<FontAwesomeIcon 
						icon='arrow-left'
						size={verticalScale(24)}
						color={colors.tint}
					/>
				</TouchableOpacity>
				<View style={{ width:moderateScale(290) }}>
					<CustomTextInput 
						placeholder={'Search ...'}
						placeholderTextColor={colors.tint}
						colors={colors}
						value={query}
						onChangeText={setQuery}
						containerStyle={{
							height: 52,
							paddingLeft:moderateScale(15),
							color:colors.tint,
							borderWidth:1,
							borderRadius:25,
							borderColor:colors.tint,
							backgroundColor:colors.secondary,
							marginTop:verticalScale(15)
						}}
						inputStyle={{
							color:colors.tint,
							fontSize:verticalScale(14)
						}}
					/>
					<FontAwesomeIcon
						icon='magnifying-glass'
						size={20}
						color={colors.tint}
						style={{
							position:'absolute',
							left:moderateScale(18),
							marginTop:verticalScale(15),
							top:15
						}}
					/>
				</View>
			</View>

			{searchList === null 
				? 
					<Empty
						icon='magnifying-glass'
						message='Search for friends'
						centered={false}
						colors={colors}
					/>
				: searchList.length === 0 ? 
					<Empty
						emoji='🤷‍♂️'
						message={"Hmmm... couldn't find anything for '" + query + "'"}
						centered={false}
						colors={colors}
					/>
			 : 
				<FlatList
					data={searchList}
					renderItem={({ item }) => (
						<SearchRow item={item} colors={colors} />
					)}
					keyExtractor={item => item.id}
				/>
			}
		</SafeAreaView>
	)
}