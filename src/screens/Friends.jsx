import React, { useState } from "react";
import { 
  ActivityIndicator, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  View,
	RefreshControl
} from "react-native";

import CustomButton from "../components/UI/Custom/CustomButton";
import CustomText from '../components/UI/Custom/CustomText';
import Cell from "../components/Cell";
import Empty from "../components/Empty";
import Thumbnail from "../components/Thumbnail";

import utils from "../core/utils";
import useGlobal from "../core/global";
import { colors } from "../constants/colors";


function FriendRow({ navigation, item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
	
	const [profile, setProfile] = useState()

	useEffect(() => {
    const fetchProfile = async() => {
      const resp = await getSwipeProfile(user, user.id)
      setItem(resp.data)
    }
    fetchProfile()
  }, [])

	return (
		<Cell colors={colors}>
			<CustomButton
				onClick={() => navigation.navigate('profile-detail', { item:profile })}
				style={{ borderWidth:0 }}
			>
				<Thumbnail
					url={item.friend.thumbnail}
					size={76}
					borderColor={colors.tint}
				/>
			</CustomButton>
			
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
					
					<View
						style={{
							flexDirection:'row',
							gap:5
						}}
					>
						<CustomText style={{ color:colors.tint }}>
							{item.preview} 
						</CustomText>
						<CustomText 
							style={{ 
								color:colors.tint, 
								fontSize:13,
							}}
						>
							{utils.formatTime(item.updated)}
						</CustomText>
					</View>
				</View>
			</TouchableOpacity>
		</Cell>
	)
}


export default function Friends({ navigation }) {

	const friendList = useGlobal(state => state.friendList)
	const refreshFriendList = useGlobal(state => state.refreshFriendList)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = React.useCallback(() => {
    setRefreshing(true)
		refreshFriendList()
    setTimeout(() => {
      setRefreshing(false)
    }, 700)
  }, [])

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
		return <Empty emoji={'💬'} message='Nothing yet... Match with roommates and check back later!' colors={colors} refresh={onRefresh}/>
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
				refreshControl={
					<RefreshControl
						colors={colors.tint}
						tintColor={colors.tint}
						refreshing={refreshing}
						onRefresh={onRefresh} 
					/>
				}
			/>
		</SafeAreaView>
	)
}