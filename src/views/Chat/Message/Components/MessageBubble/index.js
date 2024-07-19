import React, {useState, useEffect} from "react";

import {MessageBubbleMe} from "./MessageBubbleMe";
import {MessageBubbleFriend} from "./MessageBubbleFriend";

import useStore from "../../../../../zustand/store";


function MessageBubble(props) {
  const messagesTyping = useStore(state => state.messagesTyping);
	const [showTyping, setShowTyping] = useState(false);

	useEffect(() => {
		if (props.index !== 0) return;
		if (messagesTyping === null) {
			setShowTyping(false);
			return;
		};
		setShowTyping(true);
		const check = setInterval(() => {
			const now = new Date();
			const ms = now - messagesTyping;
			if (ms > 10000) {
				setShowTyping(false);
			};
		}, 1000);
		return () => clearInterval(check);
	}, [messagesTyping]);

	if (props.index === 0) {
		if (showTyping) {
			return (
        <MessageBubbleFriend 
          friend={props.friend} 
          typing={true} 
        />
      );
		};
		return;
	};

	return props.message.is_me ? (
		<MessageBubbleMe 
			message={props.message} 
			theme={props.theme}
		/>
	) : (
		<MessageBubbleFriend 
      message={props.message} 
      friend={props.friend} 
			theme={props.theme}
    />
  );
};

export {MessageBubble};