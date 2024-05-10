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




function FriendRow({ navigation, item }) {
	return (
		<TouchableOpacity onPress={() => {
			navigation.navigate('messages', item)
		}}>
			<Cell>
				<Thumbnail
					url={item.friend.thumbnail}
					size={76}
				/>
				<View
					style={{
						flex: 1,
						paddingHorizontal: 16
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#202020',
							marginBottom: 4
						}}
					>
						{item.friend.name}
					</Text>
					<Text
						style={{
							color: '#606060',
						}}
					>
						{item.preview} <Text style={{ color: '#909090', fontSize: 13 }}>
							{utils.formatTime(item.updated)}
						</Text>
					</Text>
				</View>
			</Cell>
		</TouchableOpacity>
	)
}


export default function Friends({ navigation }) {
	const friendList = useGlobal(state => state.friendList)
  // const friendList = []

	// Show loading indicator
	if (friendList === null) {
		return  (
			<ActivityIndicator style={{ flex:1, justifyContent:'center', alignItems:'center' }} />
		)
	}

	// Show empty if no requests
	if (friendList.length === 0) {
		return (
      <SafeAreaView style={{ flex:1 }}>
			  <Empty icon='inbox' message='No messages yet' />
      </SafeAreaView>
      
		)
	}

	// Show request list
	return (
		<SafeAreaView style={{ flex:1 }}>
			<FlatList
				data={friendList}
				renderItem={({ item }) => (
					<FriendRow navigation={navigation} item={item} />
				)}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}