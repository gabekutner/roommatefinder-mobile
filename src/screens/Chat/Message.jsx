import React, { 
  useEffect,
  useLayoutEffect, 
  useRef, 
  useState 
} from "react";
import { 
  Animated, 
  Easing, 
  FlatList, 
  InputAccessoryView, 
  Platform, 
  SafeAreaView, 
  TouchableOpacity, 
  View 
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
	verticalScale,
	moderateScale 
} from "react-native-size-matters";


import CustomTextInput from "../../components/UI/Custom/CustomInput";
import CustomText from '../../components/UI/Custom/CustomText';
import Thumbnail from "../../components/Thumbnail";

import useGlobal from "../../core/global";
import { colors } from '../../constants/colors';


function MessageHeader({ 
	navigation, 
	friend, 
	colors 
}) {
	return  (
		<View
			style={{
				flex:1, 
				flexDirection:'row', 
				alignItems:'center',
			}}
		>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ marginRight:25 }}
			>
				<FontAwesomeIcon 
					icon='arrow-left'
					size={22}
					color={colors.tint}
				/>
			</TouchableOpacity>
			<Thumbnail
				url={friend.thumbnail}
				size={30}
			/>
			<CustomText
				style={{
					color:colors.tint,
					marginLeft:10,
					fontSize:18,
					fontWeight:'500',
				}}
			>
				{friend.name}
			</CustomText>			
		</View>
	)
}


function MessageBubbleMe({ text }) {
	return (
		<View
			style={{
				flexDirection:'row',
				padding:4,
				paddingRight:12
			}}
		>
			<View style={{ flex:1 }} />
			<View
				style={{
					backgroundColor:'#303040',
					borderRadius:21,
					maxWidth:'75%',
					paddingHorizontal:moderateScale(16),
					paddingVertical:12,
					justifyContent:'center',
					marginRight:8,
					minHeight:42,
				}}
			>
				<CustomText
					style={{
						color:'white',
						fontSize:16,
						lineHeight:18,
						fontSize:verticalScale(13)
					}}
				>
					{text}
				</CustomText>
			</View>
		</View>
	)
}


function MessageTypingAnimation({ offset }) {
	const y = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const total = 1000
		const bump = 200

		const animation = Animated.loop(
			Animated.sequence([
				Animated.delay(bump * offset),
				Animated.timing(y, {
					toValue:1,
					duration:bump,
					easing:Easing.linear,
					useNativeDriver:true
				}),
				Animated.timing(y, {
					toValue:0,
					duration:bump,
					easing:Easing.linear,
					useNativeDriver:true
				}),
				Animated.delay(total - bump * 2 - bump * offset),
			])
		)
		animation.start()
		return () => {
			animation.stop()
		}
	}, [])

	const translateY = y.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -8]
	})

	return (
		<Animated.View
			style={{
				width:8,
				height:8,
				marginHorizontal:1.5,
				borderRadius:4,
				backgroundColor:'#606060',
				transform:[{ translateY }]
			}}
		/>
	)
}


function MessageBubbleFriend({ text='', friend, typing=false, colors }) {
	return (
		<View
			style={{
				flexDirection:'row',
				padding:4,
				paddingLeft:16
			}}
		>
			<Thumbnail
				url={friend.thumbnail}
				size={42}
			/>
			<View
				style={{
					backgroundColor:'#d0d2db',
					borderRadius:21,
					maxWidth:'75%',
					paddingHorizontal:16,
					paddingVertical:12,
					justifyContent:'center',
					marginLeft:8,
					minHeight:42
				}}
			>
				{typing ? (
					<View style={{ flexDirection:'row' }}>
						<MessageTypingAnimation offset={0} />
						<MessageTypingAnimation offset={1} />
						<MessageTypingAnimation offset={2} />
					</View>
				) : (
					<CustomText
						style={{
							color:'#202020',
							fontSize:verticalScale(14),
							lineHeight:18,
						}}
					>
						{text}
					</CustomText>
				)}
			</View>
			<View style={{ flex:1 }} />
		</View>
	)
}


function MessageBubble({ 
	index, 
	message, 
	friend, 
	colors 
}) {
	const [showTyping, setShowTyping] = useState(false)

	const messagesTyping = useGlobal(state => state.messagesTyping)

	useEffect(() => {
		if (index !== 0) return
		if (messagesTyping === null) {
			setShowTyping(false)
			return
		}
		setShowTyping(true)
		const check = setInterval(() => {
			const now = new Date()
			const ms = now - messagesTyping
			if (ms > 10000) {
				setShowTyping(false)
			}
		}, 1000)
		return () => clearInterval(check)
	}, [messagesTyping])

	if (index === 0) {
		if (showTyping) {
			return <MessageBubbleFriend friend={friend} typing={true} colors={colors} />
		}
		return
	}

	return message.is_me ? (
		<MessageBubbleMe text={message.text} colors={colors} />
	) : (
		<MessageBubbleFriend text={message.text} friend={friend} colors={colors} />
	)
}


function MessageInput({ 
	message, 
	setMessage, 
	onSend, 
	colors 
}) {
	return (
		<View
			style={{
				paddingHorizontal:moderateScale(7),
				paddingBottom:moderateScale(7),
				flexDirection:'row',
				alignItems:'center',
				marginBottom:verticalScale(10)
			}}
		>
			<CustomTextInput
				placeholder="Message..."
				placeholderTextColor={colors.tint}
				value={message}
				onChangeText={setMessage}
				autoComplete={false}
				colors={colors}
				style={{
					flex: 1,
					paddingHorizontal:moderateScale(10),
					borderWidth:1,
					borderRadius:25,
					borderColor:colors.tint,
					backgroundColor:colors.secondary,
					height:verticalScale(40),
					color:colors.tint,
					fontSize:verticalScale(14),
				}}
			/>
			<TouchableOpacity onPress={onSend}>
				<FontAwesomeIcon
					icon='paper-plane'
					size={verticalScale(19)}
					color={colors.tint}
					style={{
						marginHorizontal: moderateScale(15)
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}


export default function Message({ navigation, route }) {
	const [message, setMessage] = useState('')

	const messagesList = useGlobal(state => state.messagesList)
	const messagesNext = useGlobal(state => state.messagesNext)
	const messageList = useGlobal(state => state.messageList)
	const messageSend = useGlobal(state => state.messageSend)
	const messageType = useGlobal(state => state.messageType)

	const connectionId = route.params.id
	const friend = route.params.friend

	// update the header 
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<MessageHeader navigation={navigation} friend={friend} colors={colors} />
			),
			headerStyle: {
				backgroundColor:colors.primary,
			}
		})
	}, [])

	useEffect(() => {
		messageList(connectionId)
	}, [])

	function onSend() {
		const cleaned = message.replace(/\s+/g, ' ').trim()
		if (cleaned.length === 0) return
		messageSend(connectionId, cleaned)
		setMessage('')
	}

	function onType(value) {
		setMessage(value)
		messageType(friend.id)
	}

	return (
		<SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
			<View style={{ flex:1, marginBottom: Platform.OS === 'ios' ? 60 : 0 }} >
				<FlatList
					automaticallyAdjustKeyboardInsets={true}
					contentContainerStyle={{
						paddingTop: verticalScale(20)
					}}
					data={[{id: -1}, ...messagesList]}
					inverted={true}
					keyExtractor={item => item.id}
					onEndReached={() => {
						if (messagesNext) {
							messageList(connectionId, messagesNext)
						}
					}}
					renderItem={({ item, index}) => (
						<MessageBubble
							index={index}
							message={item}
							friend={friend}
							colors={colors}
						/>
					)}
				/>
			</View>
			
			{Platform.OS === 'ios' ? (
				<InputAccessoryView>
					<MessageInput 
						message={message}
						setMessage={onType}
						onSend={onSend}
						colors={colors}
					/>
				</InputAccessoryView>
			) : (
				<MessageInput 
					message={message}
					setMessage={onType}
					onSend={onSend}
					colors={colors}
				/>
			)}
		</SafeAreaView>
	)
}