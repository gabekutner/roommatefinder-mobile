import React, { 
	useState, 
	useEffect 
} from "react";
import { 
  ActivityIndicator, 
  FlatList, 
  View, 
  TouchableOpacity,
	SafeAreaView,
	RefreshControl,
} from "react-native";

import SwipeProfileModal from "../../components/UI/SwipeProfileModal";
import CustomButton from "../../components/UI/Custom/CustomButton";
import CustomText from '../../components/UI/Custom/CustomText';
import Empty from "../../components/Empty";
import Cell from "../../components/Cell";
import Thumbnail from "../../components/Thumbnail";

import useGlobal from "../../core/global";
import utils from "../../core/utils";
import { colors } from "../../constants/colors";
import { moderateScale, verticalScale } from "react-native-size-matters";


function RequestAccept({ item, colors }) {

	const requestAccept = useGlobal(state => state.requestAccept)

	return (
		<CustomButton
			onClick={() => requestAccept(item.sender.id)}
			style={{ 
				borderWidth:2,
				alignItems:'center',
				justifyContent:'center',
				borderColor:colors.tint,
				backgroundColor:colors.accent,
				paddingHorizontal:moderateScale(16),
				borderRadius:0,
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
				Accept
			</CustomText>
		</CustomButton>
	)
}


function RequestRow({ item, colors }) {

	const user = useGlobal(state => state.user)
	const getSwipeProfile = useGlobal(state => state.getSwipeProfile)

	const [show, setShow] = useState(false)
	const [profile, setProfile] = useState()

	useEffect(() => {
		async function fetchData() {
			const profile = await getSwipeProfile(user, item.sender.id)
			const userData = await profile.data
			setProfile(userData)
		}
		fetchData()
	}, [getSwipeProfile, user, item])

	const message = 'Requested to connect with you'

	return (
		<Cell colors={colors}>
			<TouchableOpacity onPress={() => setShow(true)}>
				<Thumbnail
					url={item.sender.thumbnail}
					size={76}
				/>
			</TouchableOpacity>
			
			<View style={{ flex:1, paddingHorizontal:16 }} >
				<CustomText style={{ fontWeight:'600', fontSize:17, color:colors.tint, marginBottom:4 }}>
					{item.sender.name}
				</CustomText>
				<CustomText style={{ color:colors.tint }}>
					{message} <CustomText style={{ color:colors.tint, fontSize:13 }}>
						{utils.formatTime(item.created)}
					</CustomText>
				</CustomText>
			</View>

			<RequestAccept item={item} colors={colors} />

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


export default function Requests() {

	const requestList = useGlobal(state => state.requestList)
	const refreshRequestList = useGlobal(state => state.refreshRequestList)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = React.useCallback(() => {
    setRefreshing(true)
		refreshRequestList()
    setTimeout(() => {
      setRefreshing(false)
    }, 700)
  }, [])

	if (requestList === null) {
		return <ActivityIndicator style={{ flex:1, backgroundColor:colors.primary }} />
	}

	if (requestList.length === 0) {
		return <Empty emoji={'😶‍🌫️'} message='Nothing yet... Keep swiping and check back later!' colors={colors} refresh={onRefresh} />
	}

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
			<FlatList
				data={requestList}
				renderItem={({ item }) => (
					<RequestRow item={item} colors={colors} />
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