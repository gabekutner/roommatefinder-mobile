import React, {useState, useEffect} from "react";
import {Platform, InputAccessoryView} from "react-native";

import {useTheme} from "react-native-paper";
import useStore from "../../../zustand/store";

import {Container, MessagesWrapper} from "./message.view";
import {MessageHeader} from "./Components/MessageHeader";
import {MessageInput} from "./Components/MessageInput";


function Message({ navigation, route }) {
  const theme = useTheme();

  const [message, setMessage] = useState('');

	const messagesList = useStore(state => state.messagesList);
	const messagesNext = useStore(state => state.messagesNext);
	const messageList = useStore(state => state.messageList);
	const messageSend = useStore(state => state.messageSend);
	const messageType = useStore(state => state.messageType);

	const connectionId = route.params.id;
	const friend = route.params.friend;

  useEffect(() => {
		messageList(connectionId);
	}, []);

	function onSend() {
		const cleaned = message.replace(/\s+/g, ' ').trim();
		if (cleaned.length === 0) return;
		messageSend(connectionId, cleaned);
		setMessage('');
	};

	function onType(value) {
		setMessage(value);
		messageType(friend.id);
	};

  return (
    <Container theme={theme}>
      <MessageHeader 
        theme={theme} 
        friend={friend} 
        navigation={navigation}
      />
      <MessagesWrapper 
        messagesList={messagesList}
        messagesNext={messagesNext}
        connectionId={connectionId}
        friend={friend}        
      />
      {Platform.OS === 'ios' ? (
				<InputAccessoryView>
					<MessageInput 
						message={message}
						setMessage={onType}
						onSend={onSend}
						theme={theme}
					/>
				</InputAccessoryView>
			) : (
				<MessageInput
					message={message}
					setMessage={onType}
					onSend={onSend}
					theme={theme}
				/>
			)}
    </Container>
  );
};

export {Message};