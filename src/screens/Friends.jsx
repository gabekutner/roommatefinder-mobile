import { 
  ActivityIndicator, 
  FlatList, 
  SafeAreaView, 
  Text,
  TouchableOpacity, 
  View 
} from "react-native";

import Cell from "../components/Cell";
import Empty from "../components/Empty";
import Thumbnail from "../components/Thumbnail";

import utils from "../core/utils";
import useGlobal from "../core/global";
import { colors as c } from "../assets/config";


function FriendRow({ navigation, item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)

	return (
		<Cell colors={colors}>
			<TouchableOpacity
				onPress={async() => {
					const profile = await getSwipeProfile(user, item.friend.id)
					const userData = await profile.data
					navigation.navigate('swipe-profile', { profile: userData })
				}}
			>
				<Thumbnail
					url={item.friend.thumbnail}
					size={76}
					borderColor={colors.secondary}
				/>
			</TouchableOpacity>
			
			<TouchableOpacity onPress={() => navigation.navigate('messages', item)}>
				<View style={{ flex:1, paddingHorizontal: 16, justifyContent:'center' }}>
					<Text style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }} >
						{item.friend.name}
					</Text>
					<Text style={{ color:colors.tertiary, fontFamily:'NotoSans_Condensed-Regular' }}>
						{item.preview} <Text style={{ color:colors.tertiary, fontSize:13, fontFamily:'NotoSans_Condensed-Regular' }}>
							{utils.formatTime(item.updated)}
						</Text>
					</Text>
				</View>
			</TouchableOpacity>
		</Cell>
	)
}


export default function Friends({ navigation }) {

	const friendList = useGlobal(state => state.friendList)
	const theme = useGlobal(state => state.theme)
  const activeColors = c[theme]

	if (friendList === null) {
		return  (
			<ActivityIndicator style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:activeColors.primary }} />
		)
	}

	if (friendList.length === 0) {
		return (
      <SafeAreaView style={{ flex:1, backgroundColor:activeColors.primary }}>
			  <Empty icon='inbox' message='No messages yet' colors={activeColors} />
      </SafeAreaView>
		)
	}

	// Show request list
	return (
		<SafeAreaView style={{ flex:1, backgroundColor:activeColors.primary }}>
			<FlatList
				data={friendList}
				renderItem={({ item }) => (
					<FriendRow navigation={navigation} item={item} colors={activeColors} />
				)}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}