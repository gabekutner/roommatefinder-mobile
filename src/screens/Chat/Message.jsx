import React, { 
  useEffect,
  useLayoutEffect, 
  useState 
} from "react";
import { 
  FlatList, 
  InputAccessoryView, 
  Platform, 
  SafeAreaView, 
  View 
} from "react-native";

import { verticalScale } from "react-native-size-matters";

import MessageHeader from "./Components/MessageHeader";
import MessageBubble from "./Components/MessageBubble";
import MessageInput from "./Components/MessageInput";
import useGlobal from "../../core/global";
import { colors } from '../../constants/colors';


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
					contentContainerStyle={{ paddingTop: verticalScale(20) }}
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