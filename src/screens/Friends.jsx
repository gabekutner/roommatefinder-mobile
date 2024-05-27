import React, { useState } from "react";
import { 
  ActivityIndicator, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  View 
} from "react-native";

import SwipeProfileModal from "../components/UI/SwipeProfileModal";
import CustomText from '../components/UI/Custom/CustomText';
import Cell from "../components/Cell";
import Empty from "../components/Empty";
import Thumbnail from "../components/Thumbnail";

import utils from "../core/utils";
import useGlobal from "../core/global";
import { colors as c } from "../assets/config";


function FriendRow({ navigation, item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)

	const [show, setShow] = useState(false)
	const [profile, setProfile] = useState()

	return (
		<Cell colors={colors}>
			<TouchableOpacity
				onPress={async() => {
					const profile = await getSwipeProfile(user, item.friend.id)
					const userData = await profile.data
					// sometimes error here
					setProfile(userData)
					setShow(true)
				}}
			>
				<Thumbnail
					url={item.friend.thumbnail}
					size={76}
					borderColor={colors.secondary}
				/>
			</TouchableOpacity>
			
			<TouchableOpacity onPress={() => navigation.navigate('messages', item)}>
				<View 
					style={{ 
						flex:1, 
						paddingHorizontal:16, 
						justifyContent:'center' 
					}}
				>
					<CustomText 
						style={{ 
							fontWeight:'600', 
							fontSize:17, 
							color:colors.tint, 
							marginBottom:4,
						}} 
					>
						{item.friend.name}
					</CustomText>
					
					<CustomText style={{ color:colors.tertiary }}>
						{item.preview} 
						<CustomText 
							style={{ 
								color:colors.tertiary, 
								fontSize:13,
							}}
						>
							{utils.formatTime(item.updated)}
						</CustomText>
					</CustomText>
					
				</View>
			</TouchableOpacity>
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


export default function Friends({ navigation }) {

	const friendList = useGlobal(state => state.friendList)
	const theme = useGlobal(state => state.theme)
  const colors = c[theme]

	if (friendList === null) {
		return <ActivityIndicator 
			style={{ 
				flex:1, 
				justifyContent:'center', 
				alignItems:'center', 
				backgroundColor:colors.primary 
			}} 
		/>
	}

	if (friendList.length === 0) {
		return (
      <SafeAreaView 
				style={{ 
					flex:1, 
					backgroundColor:colors.primary 
				}}
			>
			  <Empty icon='inbox' message='No messages yet' colors={colors} />
      </SafeAreaView>
		)
	}

	return (
		<SafeAreaView 
			style={{ 
				flex:1, 
				backgroundColor:colors.primary 
			}}
		>
			<FlatList
				data={friendList}
				renderItem={({ item }) => (
					<FriendRow navigation={navigation} item={item} colors={colors} />
				)}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}