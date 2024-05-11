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
import { colors as c } from '../assets/config';


function RequestAccept({ item, colors, theme }) {

	const requestAccept = useGlobal(state => state.requestAccept)

	return (
		<TouchableOpacity
			style={{
				backgroundColor: '#3ABFC0',
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
			<Text style={{ color: colors.primary, fontWeight: 'bold' }}>Accept</Text>
		</TouchableOpacity>
	)
}



function RequestRow({ item, colors }) {
	const message = 'Requested to connect with you'

	return (
		<Cell colors={colors}>
			<Thumbnail
				url={item.sender.thumbnail}
				size={76}
			/>
			<View style={{ flex: 1, paddingHorizontal: 16 }} >
				<Text style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }}>
					{item.sender.name}
				</Text>
				<Text style={{ color: colors.tertiary }}>
					{message} <Text style={{ color: colors.tertiary, fontSize: 13 }}>
						{utils.formatTime(item.created)}
					</Text>
				</Text>
			</View>

			<RequestAccept item={item} colors={colors} />
		</Cell>
	)
}


export default function Requests() {

	const requestList = useGlobal(state => state.requestList)
	const theme = useGlobal(state => state.theme)
	const activeColors = c[theme]

	if (requestList === null) {
		return  (
			<ActivityIndicator style={{ flex:1, backgroundColor:activeColors.primary }} />
		)
	}

	if (requestList.length === 0) {
		return (
			<Empty icon='bell' message='No requests' colors={activeColors} />
		)
	}

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:activeColors.primary }}>
			<FlatList
				data={requestList}
				renderItem={({ item }) => (
					<RequestRow item={item} colors={activeColors} />
				)}
				keyExtractor={item => item.sender.id}
			/>
		</SafeAreaView>
	)
}