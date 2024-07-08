import React, { useState, useCallback } from "react";
import { 
  ActivityIndicator, 
  FlatList, 
	SafeAreaView,
	RefreshControl,
} from "react-native";

import RequestRow from "./RequestRow";
import Empty from "../../../components/Empty";

import useStore from "../../../zustand/store";
import { colors } from "../../../constants/colors";


export default function Requests({ navigation }) {

	const requestList = useStore(state => state.requestList)
	const refreshRequestList = useStore(state => state.refreshRequestList)
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
    setRefreshing(true)
		refreshRequestList()
    setTimeout(() => {
      setRefreshing(false)
    }, 700)
  }, [])

	if (requestList === null) {
		return <ActivityIndicator 
			style={{ 
				flex:1, 
				backgroundColor:colors.primary 
			}} 
		/>
	}

	if (requestList.length === 0) {
		return <Empty 
			emoji={'😶‍🌫️'} 
			colors={colors} 
			refresh={onRefresh} 
			message='Nothing yet... Keep swiping and check back later!'
		/>
	}

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
			<FlatList
				data={requestList}
				renderItem={({ item }) => (
					<RequestRow navigation={navigation} item={item} colors={colors} />
				)}
				keyExtractor={item => item.sender.id}
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