import { 
  ActivityIndicator, 
  FlatList, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";

import Empty from "../components/Empty";
import Cell from "../components/Cell";
import Thumbnail from "../components/Thumbnail";

import useGlobal from "../core/global";
import utils from "../core/utils";
import { SafeAreaView } from "react-native-safe-area-context";



function RequestAccept({ item }) {

	const requestAccept = useGlobal(state => state.requestAccept)

	return (
		<TouchableOpacity
			style={{
				backgroundColor: '#202020',
				paddingHorizontal: 14,
				height: 36,
				borderRadius: 18,
				alignItems: 'center',
				justifyContent: 'center'
			}}
			onPress={() => {
        requestAccept(item.sender.id)
      }}
		>
			<Text style={{ color: 'white', fontWeight: 'bold' }}>Accept</Text>
		</TouchableOpacity>
	)
}



function RequestRow({ item }) {
	const message = 'Requested to connect with you'

	return (
		<Cell>
			<Thumbnail
				url={item.sender.thumbnail}
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
					{item.sender.name}
				</Text>
				<Text
					style={{
						color: '#606060',
					}}
				>
					{message} <Text style={{ color: '#909090', fontSize: 13 }}>
						{utils.formatTime(item.created)}
					</Text>
				</Text>
			</View>

			<RequestAccept item={item} />
		</Cell>
	)
}




export default function Requests() {
	const requestList = useGlobal(state => state.requestList)

	if (requestList === null) {
		return  (
			<ActivityIndicator style={{ flex: 1 }} />
		)
	}

	if (requestList.length === 0) {
		return (
			<Empty icon='bell' message='No requests' />
		)
	}

	return (
		<SafeAreaView style={{ flex:1, marginTop:25 }}>
			<FlatList
				data={requestList}
				renderItem={({ item }) => (
					<RequestRow item={item} />
				)}
				keyExtractor={item => item.sender.id}
			/>
		</SafeAreaView>
	)
}