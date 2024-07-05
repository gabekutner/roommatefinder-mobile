import React, { useEffect, useState } from "react";
import { 
	FlatList,
	SafeAreaView, 
	TouchableOpacity, 
	View
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale, verticalScale } from "react-native-size-matters";

import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from '../../components/UI/Custom/CustomText';
import CustomTextInput from "../../components/UI/Custom/CustomInput";
import Empty from "../../components/Empty";
import Thumbnail from "../../components/Thumbnail";
import Cell from "../../components/Cell";

import useGlobal from "../../core/global";
import { colors } from '../../constants/colors';


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
		<CustomButton
			onClick={data.onPress}
			disabled={data.disabled}
			style={{ 
				borderWidth:2,
				alignItems:'center',
				justifyContent:'center',
				borderColor:colors.tint,
				backgroundColor: data.disabled ? '#708E99' : colors.accent,
				paddingHorizontal:moderateScale(16),
				shadowColor: '#222',
				shadowOffset: { width: 7, height: 5 },
				shadowOpacity: 1,
				shadowRadius: 1,  
			}}
		>
			<CustomText 
				style={{ 
					fontWeight:'600', 
					fontSize:verticalScale(12),
					color:colors.white,
				}}
			>
				{data.text}
			</CustomText>
		</CustomButton>
	)
}


function SearchRow({ navigation, item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
	
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
			<CustomButton style={{ borderWidth:0 }} onClick={() => navigation.navigate('profile-detail', { item:profile })}>
				<Thumbnail
					url={item.thumbnail}
					size={verticalScale(60)}
					borderColor={colors.secondary}
				/>
			</CustomButton>
			<View style={{ flex:1, paddingHorizontal:16 }}>
				<CustomText style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }} >
					{item.name}
				</CustomText>	
			</View>
			<SearchButton user={item} colors={colors} />
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
						placeholderTextColor={colors.tertiary}
						colors={colors}
						value={query}
						onChangeText={setQuery}
						icon="magnifying-glass"
						iconColor={colors.tertiary}
						iconSize={20}
						iconStyle={{ marginHorizontal:moderateScale(8) }}
						containerStyle={{
							paddingLeft:moderateScale(8),
							borderRadius:12,
							height:verticalScale(45),
							marginBottom:verticalScale(14),
							backgroundColor:colors.secondary,
							borderWidth:2,
							borderColor:colors.tint,
							paddingRight:moderateScale(45),
							marginTop:verticalScale(15)
						}}
						inputStyle={{
							color:colors.tint,
							fontSize:verticalScale(14)
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
						<SearchRow navigation={navigation} item={item} colors={colors} />
					)}
					keyExtractor={item => item.id}
				/>
			}
		</SafeAreaView>
	)
}