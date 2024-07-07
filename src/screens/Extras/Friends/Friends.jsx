import React, { useState, useCallback } from "react";
import { 
  ActivityIndicator, 
  FlatList, 
  SafeAreaView, 
	RefreshControl
} from "react-native";

import Empty from "../../../components/Empty";
import FriendRow from "./FriendRow";

// import useGlobal from "../../../core/global";
import { colors } from "../../../constants/colors";
import useStore from "../../../zustand/store";


export default function Friends({ navigation }) {

	const friendList = useStore(state => state.friendList)
	const refreshFriendList = useStore(state => state.refreshFriendList)
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
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